import express from 'express';
const router = express.Router();
import { deleteUser, getUser, getUsers, signOut, test, updateUser } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyUser.js';
import { getUsersByIds } from '../controllers/user.controller.js';

router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser); // Using the profile _id from MongoDB
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signOut);
router.get("/getusers", verifyUser, getUsers);
router.get("/:userId", getUser);

// Users Endpoint - This endpoint will fetch users by their IDs:
router.post('/getUsersByIds', getUsersByIds);

export default router;