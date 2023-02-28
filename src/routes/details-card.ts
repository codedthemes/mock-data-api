import express from "express";
import { detailsCardController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, detailsCardController.getDetailsCard);
router.post("/filter", authenticateJWT, detailsCardController.filter);

export = router;
