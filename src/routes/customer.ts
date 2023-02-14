import express from "express";
import { customerController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/list", authenticateJWT, customerController.getCustomerList);
router.get("/order/list", authenticateJWT, customerController.getOrderList);
router.get("/product/list", authenticateJWT, customerController.getProductList);
router.get("/product/reviews", authenticateJWT, customerController.getProductReview);

export = router;
