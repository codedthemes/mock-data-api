import express from "express";
import { accountController } from "../controllers";
const router = express.Router();

router.post("/login",accountController.login);

export = router;