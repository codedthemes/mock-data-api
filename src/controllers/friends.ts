import { messages } from "../utils";

export const getFriends = async (req: any, res: any) => {
  try {
    const friends = require("../data/friends");
    return res.status(200).json({
      friends,
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
    const friends = require("../data/friends");
    const results = friends.filter((row: any) => {
      let matches = true;

      const properties = ["name", "location"];
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
