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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createProductIntoDB = (ProductData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(ProductData); // built in instance method
    return result;
});
const getAllProductsOrSearchProductFromDB = (searchTerm, hasQuery) => __awaiter(void 0, void 0, void 0, function* () {
    if (hasQuery) {
        const result = yield product_model_1.Product.find({
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { description: { $regex: searchTerm } },
                { category: { $regex: searchTerm } },
            ],
        });
        return result;
    }
    else {
        const result = yield product_model_1.Product.find();
        return result;
    }
});
const getSingleProductsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
// update function
const updateProductInDB = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, updateData, { new: true });
    return result;
});
// delete function
const deleteProductsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await Product.updateOne({ _id: id }, {isDeleted: true});
    const result = yield product_model_1.Product.deleteOne({ _id: id });
    return result;
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsOrSearchProductFromDB,
    getSingleProductsFromDB,
    updateProductInDB,
    deleteProductsFromDB,
};
