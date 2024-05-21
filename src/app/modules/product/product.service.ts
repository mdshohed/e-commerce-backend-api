import { Product } from "./product.model";
import { TProduct } from "./product.interface";


const createProductIntoDB = async (ProductData: TProduct) => {
  const result = await Product.create(ProductData); // built in instance method
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductsFromDB = async (id: string) => {
  // const result = await Product.findOne({ _id: id });
  const result = await Product.aggregate([
    { $match: {id:id}}
  ])
  return result;
};

const deleteProductsFromDB = async (id: string) => {
  const result = await Product.updateOne({ id }, {isDeleted: true});
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  deleteProductsFromDB
};
