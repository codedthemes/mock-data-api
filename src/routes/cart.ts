import express from "express";
import { cartController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.post("/add", authenticateJWT, cartController.add);
router.post("/remove", authenticateJWT, cartController.remove);
router.post("/update", authenticateJWT, cartController.update);
router.post("/billing-address", authenticateJWT, cartController.billingAddress);
router.post("/discount", authenticateJWT, cartController.discount);
router.post("/shipping-charge", authenticateJWT, cartController.shippingCharge);
router.post("/payment-method", authenticateJWT, cartController.paymentMethod);
router.post("/payment-card", authenticateJWT, cartController.paymentCard);
router.post("/reset", authenticateJWT, cartController.reset);

export = router;
