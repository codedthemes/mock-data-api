import express from "express";
import { mailsController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, mailsController.getEmailsList);
router.post("/setRead", authenticateJWT, mailsController.setRead);
router.post("/setImportant", authenticateJWT, mailsController.setImportant);
router.post("/setStarred", authenticateJWT, mailsController.setStarred);
router.post("/filter", authenticateJWT, mailsController.filter);

export = router;
