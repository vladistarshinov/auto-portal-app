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

    if (!name && !email && !password) {
        res.status(400);
        throw new Error("Введите имя пользователя, электронную почту и пароль");
    }

    if (!name && !email) {
        res.status(400);
        throw new Error("Введите имя пользователя и электронную почту");
    } else if (!name && !password) {
        res.status(400);
        throw new Error("Введите имя пользователя и пароль");
    } else if (!email && !password) {
        res.status(400);
        throw new Error("Введите электронную почту и пароль");
    }

    if (!name) {
        res.status(400);
        throw new Error("Введите имя пользователя");
    } else if (!email) {
        res.status(400);
        throw new Error("Введите электронную почту");
    } else if (!password) {
        res.status(400);
        throw new Error("Введите пароль");
    }

    if (password.length < 6) {
        res.status(400);
        throw new Error("Пароль должен содержать не менее 6 символов");
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

        if (!email && !password) {
            res.status(400);
            throw new Error("Введите электронную почту и пароль");
        } else if (!email) {
            res.status(400);
            throw new Error("Введите электронную почту");
        } else if (!password) {
            res.status(400);
            throw new Error("Введите пароль");
        }
        

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