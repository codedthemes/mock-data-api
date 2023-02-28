import { messages } from "../utils";

export const getUserListS1 = async (req: any, res: any) => {
  try {
    const users_s1 = require("../data/user-list-s1");
    return res.status(200).json({
      users_s1,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getUserListS2 = async (req: any, res: any) => {
  try {
    const users_s2 = require("../data/user-list-s2");
    return res.status(200).json({
      users_s2,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};