import express from 'express';

const router = express.Router();

import { deleteUser, getUser, getUsers, signOut, test, updateUser } from '../controllers/user.controller.js';

import { verifyUser } from '../utils/verifyUser.js';

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser); // Using the profile _id from MongoDB

router.delete("/delete/:userId", verifyUser, deleteUser);

router.post("/signout", signOut);
router.get("/getusers", verifyUser, getUsers);
router.get("/:userId", getUser);

export default router;