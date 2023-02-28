import express from "express";
import { contactController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, contactController.getContactList);
router.post("/modify", authenticateJWT, contactController.modify);

export = router;
