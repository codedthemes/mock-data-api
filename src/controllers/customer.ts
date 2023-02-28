import { messages } from "../utils";

export const getCustomerList = async (req: any, res: any) => {
  try {
    const customers = require("../data/customer");
    return res.status(200).json({
      customers,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getOrderList = async (req: any, res: any) => {
  try {
    const orders = require("../data/order");
    return res.status(200).json({
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getProductList = async (req: any, res: any) => {
  try {
    const products = require("../data/product");
    return res.status(200).json({
      products,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getProductReview = async (req: any, res: any) => {
  try {
    const productreviews = require("../data/product-review");
    return res.status(200).json({
      productreviews,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
