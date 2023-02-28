import express from "express";
import { friendsController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, friendsController.getFriends);
router.post("/filter", authenticateJWT, friendsController.filter);

export = router;
