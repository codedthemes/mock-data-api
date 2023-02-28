import express from "express";
import { galleryController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, galleryController.getGallery);

export = router;
