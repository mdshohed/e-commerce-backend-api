import { Order } from "./order.model";
import { TOrder } from "./order.interface";


const createOrderIntoDB = async (OrderData: TOrder) => {
  const result = await Order.create(OrderData); 
  return result;
};

const getAllOrdersOrSearchByEmailFromDB = async (email: string , hasQuery: boolean) => {
  if(hasQuery){
    const result = await Order.find( {email: email} );
    return result; 
  }
  else {
    const result = await Order.find();
    return result;
  }
};

const getSingleOrdersFromDB = async (id: string) => {
  const result = await Order.findById( id );
  // const result = await Order.aggregate([
  //   { $match: {id:id}}
  // ])
  return result;
};

const deleteOrdersFromDB = async (id: string) => {
  const result = await Order.updateOne({ _id: id }, {isDeleted: true});
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersOrSearchByEmailFromDB,
  getSingleOrdersFromDB,
  deleteOrdersFromDB
};
