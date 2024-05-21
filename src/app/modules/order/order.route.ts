import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

// route will call controller function
router.post("/", OrderControllers.createOrder);
router.get("/", OrderControllers.getAllOrdersOrSearchByEmail);

export const OrderRoutes = router;
