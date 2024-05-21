"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const mongoose_1 = __importDefault(require("mongoose"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // creating a schema validation using Zod
        const productData = req.body;
        // data validation using zod
        const zodParseData = product_validation_1.productValidationSchema.parse(productData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(zodParseData);
        //send response
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            data: err,
        });
    }
});
const getAllProductsOrSearchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasQuery = Object.keys(req.query).length > 0;
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProductsOrSearchProductFromDB(searchTerm, hasQuery);
        if (hasQuery) {
            if (searchTerm) {
                res.status(200).json({
                    success: false,
                    message: `Products matching search term '${searchTerm}' fetched successfully!`,
                    data: result,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "Invalid query parameter",
                    data: [],
                });
            }
        }
        else {
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
        //send response
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: err,
        });
    }
});
const getSingleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductsFromDB(productId);
        //send response
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: err,
        });
    }
});
const UpdateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        // data validation using zod
        const zodParseData = product_validation_1.partialProductValidationSchema.parse(productData);
        const result = yield product_service_1.ProductServices.updateProductInDB(productId, zodParseData);
        //send response
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: err,
        });
    }
});
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            res.status(500).json({
                success: false,
                message: "Invalid ID format",
            });
        }
        const result = yield product_service_1.ProductServices.deleteProductsFromDB(productId);
        if (result.deletedCount) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: null,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "ProductId Not Found!",
                data: null,
            });
        }
        //send response
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: err,
        });
    }
});
exports.productControllers = {
    createProduct,
    getAllProductsOrSearchProducts,
    getSingleProducts,
    UpdateProducts,
    deleteProducts,
};
