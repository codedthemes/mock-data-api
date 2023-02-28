import { v4 as UIDV4 } from "uuid";
import fs from "fs";
import { messages } from "../utils";

export const getAddressList = async (req: any, res: any) => {
  try {
    const address = require("../data/address");
    return res.status(200).json({ address });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const addAddress = async (req: any, res: any) => {
  try {
    const data = req.body;
    let address = require("../data/address");
    const {
      name,
      destination,
      building,
      street,
      city,
      state,
      country,
      post,
      phone,
      isDefault,
    } = data;
    const newAddress = {
      id: UIDV4(),
      name,
      destination,
      building,
      street,
      city,
      state,
      country,
      post,
      phone,
      isDefault,
    };

    if (isDefault) {
      address = address.map((item: any) => {
        if (item.isDefault === true) {
          return { ...item, isDefault: false };
        }
        return item;
      });
    }

    address = [...address, newAddress];
    await fs.writeFile(
      "src/data/address.json",
      JSON.stringify(address),
      async (err) => {
        if (err) throw err;
        return res.status(200).json({ address });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const editAddress = async (req: any, res: any) => {
  try {
    const data = req.body;
    let address = require("../data/address");
    if (data.isDefault) {
      address = address.map((item: any) => {
        if (item.isDefault === true) {
          return { ...item, isDefault: false };
        }
        return item;
      });
    }

    address = address.map((item: any) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
    await fs.writeFile(
      "src/data/address.json",
      JSON.stringify(address),
      async (err) => {
        if (err) throw err;
        return res.status(200).json({ address });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
