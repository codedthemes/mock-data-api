import { dashboard } from "../data/dashboard";
import { messages } from "../utils";

export const getDashboardData = async (req: any, res: any) => {
  try {
    return res.status(200).json({
      dashboard,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
