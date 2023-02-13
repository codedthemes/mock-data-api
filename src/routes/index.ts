import * as express from "express";
import accountRouter from "./account";
import dashboardRouter from "./dashboard";
import postsRouter from "./posts";

const router = express.Router();

router.use("/account", accountRouter);
router.use("/dashboard", dashboardRouter);
router.use("/posts", postsRouter);

export = router;