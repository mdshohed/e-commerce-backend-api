"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialProductValidationSchema = exports.productValidationSchema = void 0;
const zod_1 = require("zod");
// Variant schema
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty({ message: "Type is required" }),
    value: zod_1.z.string().nonempty({ message: "Value is required" }),
});
// Inventory schema
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative({ message: "Quantity must be a non-negative integer" }),
    inStock: zod_1.z.boolean({ required_error: "InStock is required" }),
});
// Product schema
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: "Name is required" }),
    description: zod_1.z.string().nonempty({ message: "Description is required" }),
    price: zod_1.z
        .number()
        .nonnegative({ message: "Price must be a non-negative number" }),
    category: zod_1.z.string().nonempty({ message: "Category is required" }),
    tags: zod_1.z.array(zod_1.z.string()).nonempty({ message: "Tags are required" }),
    variants: zod_1.z
        .array(VariantValidationSchema)
        .nonempty({ message: "Variants are required" }),
    inventory: InventoryValidationSchema,
    // isDeleted: z.boolean()
});
exports.productValidationSchema = productValidationSchema;
const partialProductValidationSchema = productValidationSchema.partial();
exports.partialProductValidationSchema = partialProductValidationSchema;
