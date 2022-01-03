import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

const { registerUser, authUser } = authController;

router.route("/register").post(registerUser);
router.post("/login", authUser);

export default router;