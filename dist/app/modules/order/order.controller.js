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
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
const product_service_1 = require("../product/product.service");
const product_validation_1 = require("../product/product.validation");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // creating a schema validation using Zod
        const OrderData = req.body;
        const { productId, quantity } = OrderData;
        // data validation using zod
        const zodOrderParseData = order_validation_1.default.parse(OrderData);
        const findProduct = yield product_service_1.ProductServices.getSingleProductsFromDB(productId);
        if (findProduct) {
            const prevQuantity = findProduct.inventory.quantity;
            if (prevQuantity >= quantity && prevQuantity > 0) {
                const data = {
                    inventory: {
                        quantity: prevQuantity - quantity,
                        inStock: prevQuantity - quantity > 0 ? true : false,
                    },
                };
                const zodProductParseData = product_validation_1.partialProductValidationSchema.parse(data);
                yield product_service_1.ProductServices.updateProductInDB(productId, zodProductParseData);
                const result = yield order_service_1.OrderServices.createOrderIntoDB(zodOrderParseData);
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
                    message: "Insufficient quantity available in inventory",
                });
            }
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            data: err,
        });
    }
});
const getAllOrdersOrSearchByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasQuery = Object.keys(req.query).length > 0;
        const email = req.query.email;
        const result = yield order_service_1.OrderServices.getAllOrdersOrSearchByEmailFromDB(email, hasQuery);
        //send response
        if (hasQuery) {
            if (result === null || result === void 0 ? void 0 : result.length) {
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: result,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Orders not found",
                });
            }
        }
        else {
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: err,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrdersOrSearchByEmail,
};
