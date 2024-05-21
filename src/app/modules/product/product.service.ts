import { Product } from "./product.model";
import { TProduct } from "./product.interface";

const createProductIntoDB = async (ProductData: TProduct) => {
  const result = await Product.create(ProductData); // built in instance method
  return result;
};

const getAllProductsOrSearchProductFromDB = async (
  searchTerm: string,
  hasQuery: boolean,
) => {
  if (hasQuery) {
    const result = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm } },
        { category: { $regex: searchTerm } },
      ],
    });
    return result;
  } else {
    const result = await Product.find();
    return result;
  }
};

const getSingleProductsFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

// update function
const updateProductInDB = async (id: string, updateData: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, updateData, { new: true });
  return result;
};

// delete function
const deleteProductsFromDB = async (id: string) => {
  // const result = await Product.updateOne({ _id: id }, {isDeleted: true});
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsOrSearchProductFromDB,
  getSingleProductsFromDB,
  updateProductInDB,
  deleteProductsFromDB,
};
