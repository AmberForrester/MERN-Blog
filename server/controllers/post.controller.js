import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not authorized to create a blog post."));
  }

  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Title and content are required to create a blog post. "));
  }

  // GOOD FOR SEO RESULTS!
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

    // Store this new post in the DB. 
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } 
    catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {

  try {

    const startIndex = parseInt(req.query.startIndex) || 0; // Where to start from. 

    const limit = parseInt(req.query.limit) || 9; // Set limit to amount of posts returned on the page. 

    const sortDirection = req.query.order === "asc" ? 1 : -1; // Newest to oldest. 

    // Find the posts within the MongoDB - paying attention to how it is stored in the DB = how to call it. (ex. _id:)
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // How many blog posts are available within the MongoDB
    const totalPosts = await Post.countDocuments();

    // Return blog posts according to the date created. 
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.find({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error); //Middleware call 
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to delete this post.")
    );
  }

  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("Post has been deleted.");
  } catch (error) {
    next(error);
  }
};



export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(
      errorHandler(403, "You are not authorized to update this post.")
    );
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};