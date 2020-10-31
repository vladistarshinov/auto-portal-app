import asyncHandler from 'express-async-handler';
import User from '../models/user.model';

const adminController = {};

// @desc     Get all users
// @route    GET /api/users
// @access   Private/Admin
adminController.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

export default adminController;