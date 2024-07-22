import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup); // Sign-UP API
router.post('/signin', signin); // Sign-IN API

export default router;