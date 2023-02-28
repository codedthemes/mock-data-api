import { messages } from "../utils";
import { Chance } from "chance";
import { filter } from "lodash";

const chance = new Chance();

export const add = async (req: any, res: any) => {
  try {
    const { product, products } = req.body;
    let newProduct: any;
    let subtotal: number;
    let inCartProduct: any[];
    let latestProducts: any[];
    newProduct = { ...product!, itemId: chance.timestamp() };
    subtotal = newProduct?.quantity * newProduct.offerPrice;

    inCartProduct = filter(products, {
      id: newProduct.id,
      color: newProduct.color,
      size: newProduct.size,
    });
    if (inCartProduct && inCartProduct.length > 0) {
      const newProducts = products.map((item: any) => {
        if (
          newProduct?.id === item.id &&
          newProduct?.color === item.color &&
          newProduct.size === item.size
        ) {
          return {
            ...newProduct,
            quantity: newProduct.quantity + inCartProduct[0].quantity,
          };
        }
        return item;
      });
      latestProducts = newProducts;
    } else {
      latestProducts = [...products, newProduct];
    }

    return res.status(200).json({ products: latestProducts, subtotal });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const remove = async (req: any, res: any) => {
  try {
    const { id, products } = req.body;
    let subtotal: number;
    let result;

    result = filter(products, { itemId: id });
    subtotal = result[0].quantity * result[0].offerPrice;
    const newProducts = filter(products, (item) => item.itemId !== id);

    return res.status(200).json({ products: newProducts, subtotal });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const update = async (req: any, res: any) => {
  try {
    const { id, quantity, products } = req.body;
    let subtotal: number;
    let latestProducts: any[];
    let oldSubTotal;
    let result;

    result = filter(products, { itemId: id });
    subtotal = quantity! * result[0].offerPrice;
    oldSubTotal = 0;

    latestProducts = products.map((item: any) => {
      if (id === item.itemId) {
        oldSubTotal = item.quantity * (item.offerPrice || 0);
        return { ...item, quantity: quantity! };
      }
      return item;
    });

    return res
      .status(200)
      .json({ products: latestProducts, oldSubTotal, subtotal });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const billingAddress = async (req: any, res: any) => {
  try {
    const { address } = req.body;
    return res.status(200).json({ billing: address! });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const discount = async (req: any, res: any) => {
  try {
    const { total, code } = req.body;
    let amount;
    amount = 0;
    if (total > 0) {
      switch (code) {
        case "BERRY50":
          amount = chance.integer({ min: 1, max: total < 49 ? total : 49 });
          break;
        case "FLAT05":
          amount = total < 5 ? total : 5;
          break;
        case "SUB150":
          amount = total < 150 ? total : 150;
          break;
        case "UPTO200":
          amount = chance.integer({ min: 1, max: total < 199 ? total : 199 });
          break;
        default:
          amount = 0;
      }
    }

    return res.status(200).json({ amount });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const shippingCharge = async (req: any, res: any) => {
  try {
    const { shipping, charge } = req.body;
    let newShipping;

    newShipping = 0;
    if (shipping > 0 && charge === "free") {
      newShipping = -5;
    }
    if (charge === "fast") {
      newShipping = 5;
    }

    return res.status(200).json({
      shipping: charge === "fast" ? 5 : 0,
      newShipping,
      type: charge!,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const paymentMethod = async (req: any, res: any) => {
  try {
    const { method } = req.body;
    return res.status(200).json({ method: method! });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const paymentCard = async (req: any, res: any) => {
  try {
    const { card } = req.body;
    return res.status(200).json({ card: card! });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const reset = async (req: any, res: any) => {
  try {
    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

