import express from "express";
import { reviewController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, reviewController.getReviewList);

export = router;
