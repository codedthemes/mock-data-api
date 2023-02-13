import express from "express";
import { accountController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.post("/login",accountController.login);
router.get("/me",authenticateJWT,accountController.me);

export = router;