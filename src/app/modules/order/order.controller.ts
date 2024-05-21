import { Request, Response } from "express";

import { OrderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";
import { ProductServices } from "../product/product.service";
import { partialProductValidationSchema } from "../product/product.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Zod
    const  OrderData = req.body;
    const {email, productId, quantity} = OrderData;
 
    // data validation using zod
    const zodOrderParseData = OrderValidationSchema.parse(OrderData);

    const findProduct = await ProductServices.getSingleProductsFromDB(productId);
    if(findProduct){

      const prevQuantity = findProduct.inventory.quantity;
      if( prevQuantity >= quantity && findProduct.inventory.inStock ) {
        const data = {
          inventory: {
            quantity: prevQuantity - quantity,
            inStock: ((prevQuantity-quantity)>0 ? true : false) 
          }
        }
        const zodProductParseData = partialProductValidationSchema.parse(data);
        await ProductServices.updateProductInDB( productId, zodProductParseData);
        const result = await OrderServices.createOrderIntoDB(zodOrderParseData);
        
        //send response
        res.status(200).json({
          success: true,
          message: "Order created successfully!",
          data: result,
        });
      }

      else {
        res.status(402).json({
          success: false,
          message: "Insufficient quantity available in inventory"
        })
      } 
    }
    
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
