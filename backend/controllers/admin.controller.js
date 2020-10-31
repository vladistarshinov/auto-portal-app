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

// @desc     Delete user
// @route    DELETE /api/users/:id
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