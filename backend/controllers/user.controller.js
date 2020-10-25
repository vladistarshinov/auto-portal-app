import asyncHandler from 'express-async-handler';
import User from '../models/user.model';

const userController = {};

// @desc     Auth user & get token
// @route    GET /api/users/login
// @access   Public
userController.authUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.name,
                isAdmin: user.isAdmin,
                token: null
            });
        } else {
            res.status(401);
            throw new Error('Введены неверные эл.почта или пароль');
        }
});

export default userController;