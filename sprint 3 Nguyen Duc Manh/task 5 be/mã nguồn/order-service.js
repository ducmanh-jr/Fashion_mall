/**
 * Task 5 BE: Order Management & State Transition Service (HTTMDTTHA-40)
 * Handles customer order history, seller order status transitions with audit logs, and admin revenue analytics.
 * Developer: Nguyen Duc Manh
 */

const { DatabaseSync } = require('node:sqlite');
const MigrationRunner = require('../../task 1/mã nguồn/migrations');
const SeederService = require('../../task 2 be/mã nguồn/seeder');

class OrderService {
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
   * US-20: Customer views order history and items
   */
  getCustomerOrders(user_id) {
    const orders = this.db.prepare(`
      SELECT o.*, p.payment_method, p.status as payment_record_status
      FROM Orders o
      LEFT JOIN Payments p ON o.id = p.order_id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    `).all(user_id);

    return orders.map(order => {
      const items = this.db.prepare(`
        SELECT oi.*, pr.name as product_name, pr.slug
        FROM Order_Items oi
        JOIN Products pr ON oi.product_id = pr.id
        WHERE oi.order_id = ?
      `).all(order.id);

      return {
        ...order,
        items
      };
    });
  }

  /**
   * US-21 & US-22: Seller transitions order status
   * Valid status flow: PENDING -> CONFIRMED -> SHIPPING -> COMPLETED or CANCELLED
   */
  updateOrderStatus({ order_id, new_status, changed_by, note = '' }) {
    const validStatuses = ['PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(new_status)) {
      throw new Error(`Invalid status: ${new_status}`);
    }

    const order = this.db.prepare('SELECT * FROM Orders WHERE id = ?').get(order_id);
    if (!order) {
      throw new Error(`Order with ID ${order_id} not found`);
    }

    const previousStatus = order.status;

    // Validate state transition rule
    if (previousStatus === 'COMPLETED' || previousStatus === 'CANCELLED') {
      throw new Error(`Cannot change status of a ${previousStatus} order`);
    }

    // Update order status
    this.db.prepare(`
      UPDATE Orders
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(new_status, order_id);

    // If completed, ensure payment status is updated to PAID if COD
    if (new_status === 'COMPLETED') {
      this.db.prepare("UPDATE Orders SET payment_status = 'PAID' WHERE id = ?").run(order_id);
      this.db.prepare("UPDATE Payments SET status = 'SUCCESS', paid_at = CURRENT_TIMESTAMP WHERE order_id = ?").run(order_id);
    }

    // Log history record
    const history = this.db.prepare(`
      INSERT INTO Order_Status_Histories (order_id, previous_status, new_status, changed_by, note)
      VALUES (?, ?, ?, ?, ?)
      RETURNING *;
    `).get(order_id, previousStatus, new_status, changed_by, note);

    const updatedOrder = this.db.prepare('SELECT * FROM Orders WHERE id = ?').get(order_id);

    return {
      order: updatedOrder,
      history
    };
  }

  /**
   * US-23: Admin order summary and daily revenue analytics
   */
  getAdminDashboard() {
    const totalOrders = this.db.prepare('SELECT COUNT(*) as count FROM Orders').get().count;
    const completedOrders = this.db.prepare("SELECT COUNT(*) as count FROM Orders WHERE status = 'COMPLETED'").get().count;
    const totalRevenue = this.db.prepare("SELECT SUM(total_amount) as sum FROM Orders WHERE status = 'COMPLETED'").get().sum || 0;

    const revenueByDay = this.db.prepare(`
      SELECT DATE(created_at) as date, COUNT(*) as order_count, SUM(total_amount) as daily_revenue
      FROM Orders
      WHERE status = 'COMPLETED'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `).all();

    const allOrders = this.db.prepare(`
      SELECT o.id, o.order_code, o.user_id, o.total_amount, o.status, o.payment_status, o.created_at
      FROM Orders o
      ORDER BY o.created_at DESC
    `).all();

    return {
      summary: {
        total_orders: totalOrders,
        completed_orders: completedOrders,
        total_revenue: totalRevenue
      },
      revenue_by_day: revenueByDay,
      all_orders: allOrders
    };
  }
}

module.exports = OrderService;
