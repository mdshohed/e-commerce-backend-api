import { Request, Response } from "express";

import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Zod
    const  OrderData = req.body;

    // data validation using zod
    const zodParseData = OrderValidationSchema.parse(OrderData);
    const result = await OrderServices.createOrderIntoDB(zodParseData);

    //send response
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      data: err,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrdersFromDB();
    //send response
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: err,
    });
  }
};
const getSingleOrders = async (req: Request, res: Response) => {
  try {
    const { OrderId } = req.params;
    const result = await OrderServices.getSingleOrdersFromDB(OrderId);
    //send response
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: err,
    });
  }
};



export const OrderControllers = {
  createOrder,
  getAllOrders,
  getSingleOrders,
};
