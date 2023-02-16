import { productReviews } from "../data/review";
import { messages } from "../utils";

export const getReviewList = async (req: any, res: any) => {
  try {
    return res.status(200).json({ productReviews });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};