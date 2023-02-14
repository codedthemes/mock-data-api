import { messages } from "../utils";

export const getFriendRequest = async (req: any, res: any) => {
  try {
    const friends = require("../data/friend-request");
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
    const friends = require("../data/friend-request");
    const results = friends.filter((row: any) => {
      let matches = true;

      const properties = ["name", "mutual"];
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
