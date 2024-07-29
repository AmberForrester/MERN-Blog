import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createPost, deletePost, getPosts, updatePost } from '../controllers/post.controller.js';
import { getPostsByIds } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createPost); // User verified as an admin. 
router.get('/getposts', getPosts); 
router.delete('/deletepost/:postId/:userId', verifyUser, deletePost);
router.put('/updatepost/:postId/:userId', verifyUser, updatePost);

// Posts Endpoint - This endpoint will fetch posts by their IDs:
router.post('/getPostsByIds', getPostsByIds);

export default router;