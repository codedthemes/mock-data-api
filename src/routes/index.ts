import * as express from "express";
import accountRouter from "./account";
import dashboardRouter from "./dashboard";

const router = express.Router();

router.use("/account", accountRouter);
router.use("/dashboard", dashboardRouter);

export = router;