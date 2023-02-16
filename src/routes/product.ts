import express from "express";
import { productController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.post("/details", authenticateJWT, productController.getDetails);
router.post("/related", authenticateJWT, productController.getRelated);

export = router;
