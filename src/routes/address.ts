import express from "express";
import { addressController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, addressController.getAddressList);
router.post("/new", authenticateJWT, addressController.addAddress);
router.post("/edit", authenticateJWT, addressController.editAddress);

export = router;
