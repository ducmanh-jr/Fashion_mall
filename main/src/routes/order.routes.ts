import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate); // Require login for orders

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getMyOrders);
router.get("/:id", OrderController.getOrderById);
router.post("/:id/cancel", OrderController.cancelOrder);

export default router;
