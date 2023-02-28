import jwt from "jsonwebtoken";
import fs from "fs";
import { messages } from "../utils";

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const users = require("../data/users");
    const user = users.find((_user: any) => _user.email === email);

    if (!user) {
      return res
        .status(400)
        .json({ message: messages.errorMessages.verifyEmailAndPassword });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ message: messages.errorMessages.invalidPassword });
    }

    const serviceToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "",
      {
        expiresIn: process.env.JWT_EXPIRES_TIME,
      }
    );

    return res.status(200).json({
      serviceToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const register = async (req: any, res: any) => {
  try {
    const { id, email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: messages.errorMessages.enterEmailAndPassword });
    }

    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: messages.errorMessages.enterName });
    }

    const users = require("../data/users");

    const isAlreadyRegistered = users.find(
      (_user: any) => _user.email === email
    );

    if (isAlreadyRegistered) {
      return res
        .status(400)
        .json({ message: messages.errorMessages.alreadyRegistered });
    } else {
      const user = {
        id,
        email,
        password,
        name: `${firstName} ${lastName}`,
      };

      users.push(user);

      await fs.writeFile(
        "src/data/users.json",
        JSON.stringify(users),
        async (err) => {
          if (err) throw err;
          return res.status(200).json(users);
        }
      );
    }
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const me = async (req: any, res: any) => {
  try {
    const { user } = req;
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
