import express from "express";
import { repliesController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.post("/add", authenticateJWT, repliesController.addReplies);
router.post("/list/like", authenticateJWT, repliesController.like);

export = router;
