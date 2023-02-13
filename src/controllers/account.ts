import jwt from "jsonwebtoken";
import { users } from "../data/users";
import { messages } from "../utils";

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

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
