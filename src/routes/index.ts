import * as express from "express";
import accountRouter from "./account";
import dashboardRouter from "./dashboard";
import postsRouter from "./posts";
import commentsRouter from "./comments";
import repliesRouter from "./replies";
import followersRouter from "./followers";
import friendsRouter from "./friends";
import friendRequestRouter from "./friends-request";
import galleryRouter from "./gallery";

const router = express.Router();

router.use("/account", accountRouter);
router.use("/dashboard", dashboardRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/replies", repliesRouter);
router.use("/followers", followersRouter);
router.use("/friends", friendsRouter);
router.use("/friend-request", friendRequestRouter);
router.use("/gallery", galleryRouter)

export = router;