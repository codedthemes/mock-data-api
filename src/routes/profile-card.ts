import express from "express";
import { profileCardController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, profileCardController.getProfileCard);
router.post("/filter", authenticateJWT, profileCardController.filter);

export = router;
