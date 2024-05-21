"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Route will call controller function
router.post("/", product_controller_1.productControllers.createProduct);
router.get("/", product_controller_1.productControllers.getAllProductsOrSearchProducts);
router.get("/:productId", product_controller_1.productControllers.getSingleProducts);
router.put("/:productId", product_controller_1.productControllers.UpdateProducts);
router.delete("/:productId", product_controller_1.productControllers.deleteProducts);
exports.ProductRoutes = router;
