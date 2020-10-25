import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post("/login", userController.authUser);

export default router;