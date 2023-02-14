import { messages } from "../utils";
import fs from "fs";

export const addReplies = async (req: any, res: any) => {
  try {
    const { postId, commentId, reply } = req.body;
    const posts = require("../data/posts");
    const postIndex = posts.findIndex((x: any) => x.id === postId);
    const post = posts[postIndex];
    const cComments = post.data.comments || [];
    const commentIndex = cComments.findIndex((x: any) => x.id === commentId);
    const comment = cComments[commentIndex];
    if (comment && comment.data && comment.data.replies)
      comment.data.replies = [...comment.data.replies, reply];

    await fs.writeFile(
      "src/data/posts.json",
      JSON.stringify(posts),
      async (err) => {
        if (err) throw err;
        return res.status(200).json({
          posts: posts,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const like = async (req: any, res: any) => {
  try {
    const { postId, commentId, replayId } = req.body;
    const posts = require("../data/posts");
    const postIndex = posts.findIndex((x: any) => x.id === postId);
    const post = posts[postIndex];
    const cComments = post.data.comments || [];
    const commentIndex = cComments.findIndex((x: any) => x.id === commentId);
    const comment = { ...cComments[commentIndex] };
    const replayIndex = comment?.data?.replies?.findIndex(
      (x: any) => x.id === replayId
    );
    if (replayIndex !== undefined) {
      if (comment && comment.data && comment.data.replies) {
        const reply = { ...comment.data.replies[replayIndex] };
        if (reply && reply.data && reply.data.likes) {
          reply.data.likes.like = !reply.data.likes.like;
          reply.data.likes.value = reply.data.likes.like
            ? reply.data.likes.value + 1
            : reply.data.likes.value - 1;
        }
        comment.data.replies[replayIndex] = reply;
        if (post && post.data && post.data.comments)
          post.data.comments[commentIndex] = comment;
      }
    }
    await fs.writeFile(
      "src/data/posts.json",
      JSON.stringify(posts),
      async (err) => {
        if (err) throw err;
        return res.status(200).json({
          posts: posts,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
