import { messages } from "../utils";

export const getPosts = async (req: any, res: any) => {
  try {
    const posts = require("../data/posts");
    return res.status(200).json({
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
