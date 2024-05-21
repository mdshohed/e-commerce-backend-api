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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
const createOrderIntoDB = (OrderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(OrderData);
    return result;
});
const getAllOrdersOrSearchByEmailFromDB = (email, hasQuery) => __awaiter(void 0, void 0, void 0, function* () {
    if (hasQuery) {
        const result = yield order_model_1.Order.find({ email: email });
        return result;
    }
    else {
        const result = yield order_model_1.Order.find();
        return result;
    }
});
const getSingleOrdersFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findById(id);
    return result;
});
const deleteOrdersFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.updateOne({ _id: id }, { isDeleted: true });
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersOrSearchByEmailFromDB,
    getSingleOrdersFromDB,
    deleteOrdersFromDB,
};
