import { Request, Response } from "express";

import { ProductServices } from "./product.service";
import {
  productValidationSchema,
  partialProductValidationSchema,
} from "./product.validation";
import mongoose from "mongoose";

const createProduct = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Zod
    const productData = req.body;

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
      message: err.message || "Something went wrong",
      data: err,
    });
  }
};

const getAllProductsOrSearchProducts = async (req: Request, res: Response) => {
  try {
    const hasQuery = Object.keys(req.query).length > 0;
    const searchTerm = req.query.searchTerm as string;

    const result = await ProductServices.getAllProductsOrSearchProductFromDB(
      searchTerm,
      hasQuery,
    );
    if (hasQuery) {
      if (searchTerm) {
        res.status(200).json({
          success: false,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid query parameter",
          data: [],
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    }
    //send response
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: err,
    });
  }
};
const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
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
      message: "Something went wrong",
      data: err,
    });
  }
};

const UpdateProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    // data validation using zod
    const zodParseData = partialProductValidationSchema.parse(productData);
    const result = await ProductServices.updateProductInDB(
      productId,
      zodParseData,
    );
    //send response
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
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

const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(500).json({
        success: false,
        message: "Invalid ID format",
      });
    }
    const result = await ProductServices.deleteProductsFromDB(productId);
    if (result.deletedCount) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "ProductId Not Found!",
        data: null,
      });
    }
    //send response
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: err,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProductsOrSearchProducts,
  getSingleProducts,
  UpdateProducts,
  deleteProducts,
};
