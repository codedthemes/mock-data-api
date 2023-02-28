import { messages } from "../utils";
import fs from "fs";

export const getPosts = async (req: any, res: any) => {
  try {
    const posts = require("../data/posts");
    return res.status(200).json({
      posts,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const editComment = async (req: any, res: any) => {
  try {
    const { key, id } = req.body;
    const posts = require("../data/posts");
    const filterPosts = posts.map((post: any) => {
      if (post.id === key) {
        const cComments = post.data.comments || [];
        post.data.comments = [id, ...cComments];
        return post;
      }
      return post;
    });

    await fs.writeFile(
      "src/data/posts.json",
      JSON.stringify(filterPosts),
      async (err) => {
        if (err) throw err;
        return res.status(200).json({
          posts: filterPosts,
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
    const { postId } = req.body;
    const posts = require("../data/posts");
    const postIndex = posts.findIndex((x: any) => x.id === postId);
    const post = { ...posts[postIndex] };
    post.data = { ...post.data };
    post.data.likes = { ...post.data.likes };
    post.data.likes.like = !post.data.likes.like;
    post.data.likes.value = post.data.likes.like
      ? post.data.likes.value + 1
      : post.data.likes.value - 1;
    posts[postIndex] = post;
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
