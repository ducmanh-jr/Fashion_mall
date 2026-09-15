import { Router } from "express";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";
import cartRoutes from "./cart.routes.js";
import orderRoutes from "./order.routes.js";
import sellerRoutes from "./seller.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "DM Fashion Mall Core API (TypeScript)",
    timestamp: new Date().toISOString()
  });
});

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/seller", sellerRoutes);

export default router;
