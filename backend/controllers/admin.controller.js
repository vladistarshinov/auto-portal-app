import asyncHandler from 'express-async-handler';
import User from '../models/user.model';

const adminController = {};

// @desc     Get all users
// @route    GET /api/admin/users
// @access   Private/Admin
adminController.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc     Get users by id
// @route    GET /api/admin/users/:id
// @access   Private/Admin
adminController.getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("Пользователь не найден")
    }
});

// @desc     Update user
// @route    PUT /api/admin/users/:id
// @access   Private/Admin
adminController.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });

    } else {
        res.status(404);
        throw new Error('Пользователь не найден');
    }
});

// @desc     Delete user
// @route    DELETE /api/admin/users/:id
// @access   Private/Admin
adminController.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.remove();
        res.json({ message: 'Пользователь успешно удален' });
    } else {
        res.status(404);
        throw new Error("Пользователь не найден");
    }
});

export default adminController;