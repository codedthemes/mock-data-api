import express from "express";
import { productsController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, productsController.getProductsList);
router.post("/filter", authenticateJWT, productsController.filter);

export = router;
