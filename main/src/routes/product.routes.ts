import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const router = Router();

router.get("/", ProductController.getProducts);
router.get("/categories", ProductController.getCategories);
router.get("/brands", ProductController.getBrands);
router.get("/:id", ProductController.getProductById);

export default router;
