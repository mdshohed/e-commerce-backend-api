import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from './product.interface';

const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: {type: String,  required: true},
})

const InventorySchema = new Schema<TInventory>({
  quantity: {type: Number, required: true},
  inStock: {type: Boolean, required: true}
})


const productSchema = new Schema<TProduct>({
  name: {
    type: String, 
    required: [true, 'Name is required'],
  },
  description: {
    type: String, 
    required: [true, 'Description is required'],
  },
  price: {
    type: Number, 
    required: [true, 'Price is required'],
  },
  category: {
    type: String, 
    required: [true, 'Category is required'],
  },
  tags: {
    type: [String], 
    required: [true, 'Tags is required'],
  },
  variants: {
    type: [VariantSchema], 
    required: [true, 'Variants is required'],
  },
  inventory: {
    type: InventorySchema, 
    required: [true, 'Inventory is required'],
  },
  // isDeleted: {
  //   type: Boolean,
  //   default: false
  // }
});
// ,{
//   toJSON:{
//     virtuals: true,
//   }
// }


export const Product = model<TProduct>('Product', productSchema);
