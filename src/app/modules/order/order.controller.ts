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

const getAllOrdersOrSearchByEmail = async (req: Request, res: Response) => {
  try {
    const hasQuery = Object.keys(req.query).length > 0;
    const email = req.query.email as string ;
    
    const result = await OrderServices.getAllOrdersOrSearchByEmailFromDB(email, hasQuery);
    //send response
    if(hasQuery){
      if(result?.length){
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: result,
        });
      }
      else{
        res.status(404).json({
          success: false,
          message: "Orders not found",
        });
      }
    }
    else{
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
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
  getAllOrdersOrSearchByEmail,
};
