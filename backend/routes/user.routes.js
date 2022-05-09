import express from "express";
import UserController from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

const { getUserProfile, updateUserProfile } = UserController;

router
  .route("/profile")
  .get(protect, asyncHandler(getUserProfile))
  .put(protect, asyncHandler(updateUserProfile));

export default router;
