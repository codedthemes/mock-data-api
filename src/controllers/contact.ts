import { messages } from "../utils";
import fs from "fs";

export const getContactList = async (req: any, res: any) => {
  try {
    const contacts = require("../data/contact");
    return res.status(200).json({
      contacts,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const modify = async (req: any, res: any) => {
  try {
    const user = req.body;
    const contacts = require("../data/contact");
    if (user.id) {
      const index = contacts.findIndex((u: any) => u.id === user.id);
      if (index > -1) {
        contacts[index] = { ...contacts[index], ...user };
      }
    } else {
      contacts.push({ ...user, id: contacts.length + 1 });
    }
    await fs.writeFile(
      "src/data/contact.json",
      JSON.stringify(contacts),
      async (err) => {
        if (err) throw err;
        return res.status(200).json(contacts);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
