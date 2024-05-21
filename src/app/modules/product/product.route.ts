import express, { Request, Response } from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

// route will call controller function
router.post("/", productControllers.createProduct);
router.get("/", productControllers.getAllProducts);
router.get("/:productId", productControllers.getSingleProducts);
router.put("/:productId");
router.delete("/:productId", productControllers.deleteProducts);

export const ProductRoutes = router;
