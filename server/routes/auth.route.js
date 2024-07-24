import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup); // Sign-UP API
router.post('/signin', signin); // Sign-IN API
router.post('/google', google); // Create route for Google Auth

export default router;