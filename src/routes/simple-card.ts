import express from "express";
import { simpleCardController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, simpleCardController.getSimpleCard);
router.post("/filter", authenticateJWT, simpleCardController.filter);

export = router;
