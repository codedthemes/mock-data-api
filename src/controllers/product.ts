import { products } from "../data/products";
import { messages } from "../utils";

export const getDetails = async (req: any, res: any) => {
  try {
    const { id } = req.body;

    let results;
    if (id === 'default') {
        [results] = products;
    } else {
        [results] = products.filter((product) => product.id === Number(id));
    }

    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getRelated = async (req: any, res: any) => {
  try {
    const { id } = req.body;

    const results = products.filter((product) => product.id !== Number(id));

    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
