import express from "express";
import { profileListController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, profileListController.getProfileList);

export = router;
