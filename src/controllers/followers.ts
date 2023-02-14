import { messages } from "../utils";

export const getFollowers = async (req: any, res: any) => {
  try {
    const followers = require("../data/followers");
    return res.status(200).json({
      followers,
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
    const followers = require("../data/followers");
    const results = followers.filter((row: any) => {
      let matches = true;
      const properties: string[] = ["name", "location", "follow"];
      let containsQuery = false;
      properties.forEach((property: string) => {
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
