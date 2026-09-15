import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate); // Require login for cart

router.get("/", CartController.getCart);
router.post("/items", CartController.addToCart);
router.put("/items/:id", CartController.updateItem);
router.delete("/items/:id", CartController.removeItem);
router.delete("/", CartController.clearCart);

export default router;
