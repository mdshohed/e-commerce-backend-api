import express from "express";

const router = express.Router();

// route will call controller function
router.post("/", );
router.get("/");
router.get("/:productId");
router.put("/:productId");
router.delete("/:productId");

export const ProductRoutes = router;
