import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import dotenv from "dotenv";

dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Не авторизован, токен просрочен');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Не авторизован, нет токена');
    }
});

export { protect };