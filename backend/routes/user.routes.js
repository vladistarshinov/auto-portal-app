import express from 'express';
import userController from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

const { registerUser, authUser, getUserProfile } = userController;

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

export default router;