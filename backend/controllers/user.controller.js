import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import UserService from '../services/user.service.js';

const userController = {};

// @desc     Get user profile
// @route    GET /api/users/profile/:id
// @access   Private
userController.getUserProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await UserService.getProfile(req.user);
        res.json(profile);
    } catch (e) {
        res.status(404);
        throw new Error(e.message);
    }
});

// @desc     Update user profile
// @route    PUT /api/users/profile
// @access   Private
userController.updateUserProfile = asyncHandler(async (req, res) => {
    try {
        const profile = await UserService.updateProfile(req.user._id, req.body);
        res.json(profile);
    } catch (e) {
        res.status(404);
        throw new Error(e.message);
    }
});

export default userController;