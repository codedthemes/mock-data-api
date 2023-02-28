import express from "express";
import { friendRequestController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, friendRequestController.getFriendRequest);
router.post("/filter", authenticateJWT, friendRequestController.filter);

export = router;
