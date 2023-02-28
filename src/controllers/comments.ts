import { messages } from "../utils";
import fs from "fs";

export const addComment = async (req: any, res: any) => {
  try {
    const { postId, comment } = req.body;
    const posts = require("../data/posts");
    const postIndex = posts.findIndex((x: any) => x.id === postId);
    const post = posts[postIndex];
    const cComments = post.data.comments || [];
    post.data.comments = [comment, ...cComments];

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
    const { postId, commentId } = req.body;
    const posts = require("../data/posts");
    const postIndex = posts.findIndex((x: any) => x.id === postId);
    const post = posts[postIndex];
    const cComments = post.data.comments || [];
    const commentIndex = cComments.findIndex((x: any) => x.id === commentId);
    const comment = { ...cComments[commentIndex] };
    if (comment && comment.data && comment.data.likes)
      comment.data.likes.like = !comment.data.likes.like;
    if (comment && comment.data && comment.data.likes)
      comment.data.likes.value = comment.data.likes.like
        ? comment.data.likes.value + 1
        : comment.data.likes.value - 1;
    if (post && post.data && post.data.comments)
      post.data.comments[commentIndex] = comment;
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
