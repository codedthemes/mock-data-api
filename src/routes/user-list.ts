import express from "express";
import { userListController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/s1/list", authenticateJWT, userListController.getUserListS1);
router.get("/s2/list", authenticateJWT, userListController.getUserListS2);

export = router;
