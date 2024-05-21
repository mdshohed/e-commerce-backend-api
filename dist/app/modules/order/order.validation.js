"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Order schema
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().nonempty({ message: "Email is required" }),
    productId: zod_1.z.string().nonempty({ message: "ProductId is required" }),
    price: zod_1.z
        .number()
        .nonnegative({ message: "Price must be a non-negative number" }),
    quantity: zod_1.z.number().min(1).nonnegative({ message: "Quantity is required" }),
});
exports.default = orderValidationSchema;
