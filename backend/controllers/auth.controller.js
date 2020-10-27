import asyncHandler from 'express-async-handler';
import User from '../models/user.model';
import generateToken from '../utils/jwt-gen';

const authController = {};

// @desc     Register a new user
// @route    POST /api/users/register
// @access   Public
authController.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
        res.status(400);
        throw new Error("Пользователь с такой почтой уже существует");
    } 

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    } else {
        res.status(404);
        throw new Error("Пользователь не найден");
    }
});

// @desc     Auth user & get token
// @route    POST /api/users/login
// @access   Public
authController.authUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(401);
            throw new Error('Введены неверные эл.почта или пароль');
        }
});

export default authController;