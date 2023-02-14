import express from "express";
import { followersController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, followersController.getFollowers);
router.post("/filter", authenticateJWT, followersController.filter);

export = router;
