import express from 'express';
import userController from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

const { getUserProfile, updateUserProfile } = userController;

router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

export default router;