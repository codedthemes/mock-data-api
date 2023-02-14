import { messages } from "../utils";

export const getProfileList = async (req: any, res: any) => {
  try {
    const users = require("../data/profile-list");
    return res.status(200).json({
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};