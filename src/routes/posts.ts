import express from "express";
import { postsController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, postsController.getPosts);

export = router;
