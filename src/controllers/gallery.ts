import { messages } from "../utils";

export const getGallery = async (req: any, res: any) => {
  try {
    const gallery = require("../data/gallery");
    return res.status(200).json({
      gallery,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};