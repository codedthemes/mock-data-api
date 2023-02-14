import express from "express";
import { commentsController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.post("/add", authenticateJWT, commentsController.addComment);
router.post("/list/like", authenticateJWT, commentsController.like);

export = router;
