/**
 * Task 4 BE: Cart, Checkout & Payment Service (HTTMDTTHA-39)
 * Handles customer shopping cart CRUD operations, order checkout, COD placement, and online gateway payment processing.
 * Developer: Nguyen Duc Manh
 */

const { DatabaseSync } = require('node:sqlite');
const MigrationRunner = require('../../task 1/mã nguồn/migrations');
const SeederService = require('../../task 2 be/mã nguồn/seeder');

class CartCheckoutService {
  constructor(db = null) {
    if (!db) {
      this.runner = new MigrationRunner(':memory:');
      this.runner.up();
      this.db = this.runner.db;
      new SeederService(this.db).runSeed();
    } else {
      this.db = db;
    }
  }

  /**
   * Get or create active cart for user
   */
  getOrCreateCart(user_id) {
    let cart = this.db.prepare("SELECT * FROM Carts WHERE user_id = ? AND status = 'ACTIVE'").get(user_id);
    if (!cart) {
      const existingCart = this.db.prepare('SELECT * FROM Carts WHERE user_id = ?').get(user_id);
      if (existingCart) {
        this.db.prepare("UPDATE Carts SET status = 'ACTIVE', updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(existingCart.id);
        cart = this.db.prepare('SELECT * FROM Carts WHERE id = ?').get(existingCart.id);
      } else {
        cart = this.db.prepare("INSERT INTO Carts (user_id, status) VALUES (?, 'ACTIVE') RETURNING *").get(user_id);
      }
    }
    return cart;
  }

  /**
   * US-15: Add product to cart & calculate total item count
   */
  addToCart(user_id, product_id, quantity = 1) {
    if (quantity <= 0) throw new Error('Quantity must be greater than 0');

    const product = this.db.prepare("SELECT * FROM Products WHERE id = ? AND status = 'ACTIVE'").get(product_id);
    if (!product) throw new Error('Product not found or inactive');

    const cart = this.getOrCreateCart(user_id);

    const existingItem = this.db.prepare('SELECT * FROM Cart_Items WHERE cart_id = ? AND product_id = ?').get(cart.id, product_id);

    if (existingItem) {
      const newQty = existingItem.quantity + quantity;
      this.db.prepare('UPDATE Cart_Items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(newQty, existingItem.id);
    } else {
      this.db.prepare('INSERT INTO Cart_Items (cart_id, product_id, quantity, price_at_addition) VALUES (?, ?, ?, ?)').run(cart.id, product_id, quantity, product.base_price);
    }

    return this.getCartDetails(user_id);
  }

  /**
   * US-16: Update item quantity or remove item from cart
   */
  updateCartItem(user_id, product_id, quantity) {
    const cart = this.getOrCreateCart(user_id);
    if (quantity <= 0) {
      this.db.prepare('DELETE FROM Cart_Items WHERE cart_id = ? AND product_id = ?').run(cart.id, product_id);
    } else {
      this.db.prepare('UPDATE Cart_Items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE cart_id = ? AND product_id = ?').run(quantity, cart.id, product_id);
    }
    return this.getCartDetails(user_id);
  }

  /**
   * Get detailed cart contents with items and total calculation
   */
  getCartDetails(user_id) {
    const cart = this.getOrCreateCart(user_id);

    const items = this.db.prepare(`
      SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, ci.price_at_addition,
             p.name as product_name, p.slug,
             (SELECT image_url FROM Product_Images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as product_image
      FROM Cart_Items ci
      JOIN Products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `).all(cart.id);

    let totalQuantity = 0;
    let grandTotal = 0;

    items.forEach(item => {
      totalQuantity += item.quantity;
      grandTotal += item.quantity * item.price_at_addition;
    });

    return {
      cart_id: cart.id,
      user_id,
      total_quantity: totalQuantity,
      grand_total: grandTotal,
      items
    };
  }

  /**
   * US-17, US-18, US-19: Checkout order with COD or Online Payment
   */
  checkoutOrder({ user_id, shipping_address, note = '', payment_method = 'COD' }) {
    if (!shipping_address || shipping_address.trim() === '') {
      throw new Error('Shipping address is required');
    }

    const cartDetails = this.getCartDetails(user_id);
    if (cartDetails.items.length === 0) {
      throw new Error('Cannot checkout an empty cart');
    }

    const orderCode = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const initialPaymentStatus = payment_method === 'ONLINE' ? 'PAID' : 'UNPAID';

    // Create Order Record
    let order = this.db.prepare(`
      INSERT INTO Orders (order_code, user_id, total_amount, shipping_address, note, status, payment_status)
      VALUES (?, ?, ?, ?, ?, 'PENDING', ?)
      RETURNING *;
    `).get(orderCode, user_id, cartDetails.grand_total, shipping_address, note, initialPaymentStatus);

    // Insert Order Items
    cartDetails.items.forEach(item => {
      const subtotal = item.quantity * item.price_at_addition;
      this.db.prepare(`
        INSERT INTO Order_Items (order_id, product_id, price, quantity, subtotal)
        VALUES (?, ?, ?, ?, ?);
      `).run(order.id, item.product_id, item.price_at_addition, item.quantity, subtotal);
    });

    // Record Status History
    this.db.prepare(`
      INSERT INTO Order_Status_Histories (order_id, previous_status, new_status, changed_by, note)
      VALUES (?, NULL, 'PENDING', ?, 'Đơn hàng được tạo thành công');
    `).run(order.id, user_id);

    // Create Payment Record (COD vs ONLINE)
    let paymentStatus = 'PENDING';
    let transactionId = null;

    if (payment_method === 'ONLINE') {
      transactionId = `TXN-SYS-${Date.now()}`;
      paymentStatus = 'SUCCESS';
    }

    const payment = this.db.prepare(`
      INSERT INTO Payments (order_id, payment_method, transaction_id, amount, status, paid_at)
      VALUES (?, ?, ?, ?, ?, ?)
      RETURNING *;
    `).get(order.id, payment_method, transactionId, cartDetails.grand_total, paymentStatus, paymentStatus === 'SUCCESS' ? new Date().toISOString() : null);

    // Clear cart items & mark cart CHECKED_OUT
    this.db.prepare('DELETE FROM Cart_Items WHERE cart_id = ?').run(cartDetails.cart_id);
    this.db.prepare("UPDATE Carts SET status = 'CHECKED_OUT' WHERE id = ?").run(cartDetails.cart_id);

    return {
      order,
      payment,
      items: cartDetails.items
    };
  }
}

module.exports = CartCheckoutService;
