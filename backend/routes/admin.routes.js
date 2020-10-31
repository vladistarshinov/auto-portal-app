import express from 'express';
import adminController from '../controllers/admin.controller';
import { protect } from '../middleware/auth.middleware';
import { adminProtect } from '../middleware/admin.middleware';

const router = express.Router();

const { getUsers, deleteUser } = adminController;

router.route("/")
    .get(protect, adminProtect, getUsers);
router.route("/:id")
    .delete(protect, adminProtect, deleteUser);

export default router;