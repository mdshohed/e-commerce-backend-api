import { z } from 'zod';

// Variant schema
const VariantValidationSchema = z.object({
  type: z.string().nonempty({ message: "Type is required" }),
  value: z.string().nonempty({ message: "Value is required" }),
});

// Inventory schema
const InventoryValidationSchema = z.object({
  quantity: z.number().int().nonnegative({ message: "Quantity must be a non-negative integer" }),
  inStock: z.boolean({ required_error: "InStock is required" }),
});

// Product schema
const productValidationSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  price: z.number().nonnegative({ message: "Price must be a non-negative number" }),
  category: z.string().nonempty({ message: "Category is required" }),
  tags: z.array(z.string()).nonempty({ message: "Tags are required" }),
  variants: z.array(VariantValidationSchema).nonempty({ message: "Variants are required" }),
  inventory: InventoryValidationSchema,
  isDeleted: z.boolean()
});

export default productValidationSchema;