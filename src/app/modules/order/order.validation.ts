import { z } from 'zod';


// Order schema
const orderValidationSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }),
  productId: z.string().nonempty({ message: "ProductId is required" }),
  price: z.number().nonnegative({ message: "Price must be a non-negative number" }),
  quantity: z.number().nonnegative({ message: "Quantity is required" }),
});

export default orderValidationSchema;