import express, { Request, Response } from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

// route will call controller function
router.post("/", productControllers.createProduct);
router.get("/", productControllers.getAllProductsOrSearchProducts);
router.get("/:productId", productControllers.getSingleProducts);
router.put("/:productId", productControllers.UpdateProducts);
router.delete("/:productId", productControllers.deleteProducts);

export const ProductRoutes = router;
