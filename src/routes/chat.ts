import express from "express";
import { chatController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/users", authenticateJWT, chatController.getChatUsers);
router.post("/users/id", authenticateJWT, chatController.chatUserId);
router.post("/filter", authenticateJWT, chatController.filter);
router.post("/insert", authenticateJWT, chatController.chatInsert);
router.post("/users/modify", authenticateJWT, chatController.usersModify);

export = router;
