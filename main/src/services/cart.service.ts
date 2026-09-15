import { queryOne, queryAll, execute } from "../database/connection.js";
import { ICart, ICartItem, AddToCartDTO, UpdateCartItemDTO } from "../types/cart.types.js";

export class CartService {
  private static getOrCreateCartId(userId: number): number {
    let cart = queryOne<{ id: number }>("SELECT id FROM Carts WHERE user_id = ?", userId);
    if (!cart) {
      cart = queryOne<{ id: number }>("INSERT INTO Carts (user_id, status) VALUES (?, 'ACTIVE') RETURNING id;", userId)!;
    }
    return cart.id;
  }

  static getCart(userId: number): ICart {
    const cartId = this.getOrCreateCartId(userId);

    const items = queryAll<ICartItem>(`
      SELECT 
        ci.id, ci.cart_id, ci.variant_id, ci.quantity, ci.price_at_addition,
        pv.product_id, pv.size, pv.color, pv.price, pv.stock_quantity, pv.image_url as thumbnail,
        p.name as product_name
      FROM Cart_Items ci
      JOIN Product_Variants pv ON ci.variant_id = pv.id
      JOIN Products p ON pv.product_id = p.id
      WHERE ci.cart_id = ?
      ORDER BY ci.id DESC
    `, cartId);

    let subtotal = 0;
    for (const item of items) {
      subtotal += (item.price || item.price_at_addition || 0) * item.quantity;
    }

    const discount = 0;
    const shipping_fee = subtotal > 5000000 || subtotal === 0 ? 0 : 35000;
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal - discount + shipping_fee + tax;

    return {
      id: cartId,
      user_id: userId,
      items,
      subtotal,
      discount,
      shipping_fee,
      tax,
      total
    };
  }

  static addToCart(userId: number, dto: AddToCartDTO): ICart {
    const cartId = this.getOrCreateCartId(userId);

    const variant = queryOne<{ id: number; price: number; stock_quantity: number }>(`
      SELECT id, price, stock_quantity 
      FROM Product_Variants 
      WHERE id = ?
    `, dto.variant_id);

    if (!variant) {
      throw new Error("Biến thể sản phẩm không tồn tại.");
    }

    if (variant.stock_quantity < dto.quantity) {
      throw new Error(`Số lượng tồn kho không đủ (Hiện còn: ${variant.stock_quantity}).`);
    }

    const existingItem = queryOne<{ id: number; quantity: number }>(`
      SELECT id, quantity 
      FROM Cart_Items 
      WHERE cart_id = ? AND variant_id = ?
    `, cartId, dto.variant_id);

    if (existingItem) {
      const newQty = existingItem.quantity + dto.quantity;
      if (newQty > variant.stock_quantity) {
        throw new Error(`Không thể thêm. Tổng số lượng trong giỏ (${newQty}) vượt quá tồn kho.`);
      }
      execute(`
        UPDATE Cart_Items 
        SET quantity = ?, price_at_addition = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `, newQty, variant.price, existingItem.id);
    } else {
      execute(`
        INSERT INTO Cart_Items (cart_id, variant_id, quantity, price_at_addition)
        VALUES (?, ?, ?, ?)
      `, cartId, dto.variant_id, dto.quantity, variant.price);
    }

    return this.getCart(userId);
  }

  static updateQuantity(userId: number, itemId: number, dto: UpdateCartItemDTO): ICart {
    const cartId = this.getOrCreateCartId(userId);

    const item = queryOne<{ id: number; variant_id: number; stock_quantity: number }>(`
      SELECT ci.id, ci.variant_id, pv.stock_quantity 
      FROM Cart_Items ci
      JOIN Product_Variants pv ON ci.variant_id = pv.id
      WHERE ci.id = ? AND ci.cart_id = ?
    `, itemId, cartId);

    if (!item) {
      throw new Error("Không tìm thấy sản phẩm trong giỏ hàng.");
    }

    if (dto.quantity <= 0) {
      execute("DELETE FROM Cart_Items WHERE id = ?", itemId);
    } else {
      if (dto.quantity > item.stock_quantity) {
        throw new Error(`Số lượng yêu cầu (${dto.quantity}) vượt quá tồn kho (${item.stock_quantity}).`);
      }
      execute("UPDATE Cart_Items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", dto.quantity, itemId);
    }

    return this.getCart(userId);
  }

  static removeItem(userId: number, itemId: number): ICart {
    const cartId = this.getOrCreateCartId(userId);
    execute("DELETE FROM Cart_Items WHERE id = ? AND cart_id = ?", itemId, cartId);
    return this.getCart(userId);
  }

  static clearCart(userId: number): void {
    const cartId = this.getOrCreateCartId(userId);
    execute("DELETE FROM Cart_Items WHERE cart_id = ?", cartId);
  }
}
