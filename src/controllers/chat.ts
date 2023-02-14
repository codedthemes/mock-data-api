import { messages } from "../utils";
import fs from "fs";

export const getChatUsers = async (req: any, res: any) => {
  try {
    const users = require("../data/chat");
    return res.status(200).json({
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const chatUserId = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    const users = require("../data/chat");
    const index = users.findIndex((x: any) => x.id === id);
    return res.status(200).json(users[index]);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const filter = async (req: any, res: any) => {
  try {
    const { user } = req.body;
    const chatHistories = require("../data/chat-history");
    const result = chatHistories.filter(
      (item: any) => item.from === user || item.to === user
    );
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const chatInsert = async (req: any, res: any) => {
  try {
    const { from, to, text, time } = req.body;
    const chatHistories = require("../data/chat-history");
    const result = chatHistories.push({ from, to, text, time });

    await fs.writeFile(
      "src/data/chat-history.json",
      JSON.stringify(result),
      async (err) => {
        if (err) throw err;
        return res.status(200).json(result);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const usersModify = async (req: any, res: any) => {
  try {
    const user = req.body;
    const users = require("../data/chat");
    if (user.id) {
      const index = users.findIndex((u: any) => u.id === user.id);
      if (index > -1) {
        users[index] = { ...users[index], ...user };
      }
    } else {
      users.push({ ...user, id: users.length + 1 });
    }
    return res.status(200).json([]);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
