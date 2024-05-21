import { Request, Response } from "express";

import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Zod
    const  productData = req.body;

    // data validation using zod
    const zodParseData = productValidationSchema.parse(productData);
    const result = await ProductServices.createProductIntoDB(zodParseData);

    //send response
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      data: err,
    });
  }
};
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    //send response
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: err,
    });
  }
};
const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log(productId)
    const result = await ProductServices.getSingleProductsFromDB(productId);
    //send response
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: err,
    });
  }
};

const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductsFromDB(productId);
    //send response
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      data: err,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  deleteProducts,
};
