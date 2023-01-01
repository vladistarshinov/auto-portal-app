import express from "express";
import AuthController from "../controllers/auth.controller.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

const { registerUser, authUser } = AuthController;

router.route("/register").post(asyncHandler(registerUser));
router.post("/login", asyncHandler(authUser));

export default router;
