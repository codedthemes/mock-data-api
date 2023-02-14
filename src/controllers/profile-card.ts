import { messages } from "../utils";

export const getProfileCard = async (req: any, res: any) => {
  try {
    const users = require("../data/profile-card");
    return res.status(200).json({
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const filter = async (req: any, res: any) => {
  try {
    const { key } = req.body;
    const users = require("../data/profile-card");

    const results = users.filter((row: any) => {
      let matches = true;

      const properties = ["name", "role", "status"];
      let containsQuery = false;

      properties.forEach((property) => {
        if (
          row[property]
            .toString()
            .toLowerCase()
            .includes(key.toString().toLowerCase())
        ) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
      return matches;
    });

    return res.status(200).json({
      results,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
