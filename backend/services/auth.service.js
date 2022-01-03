import generateToken from '../utils/jwt-gen.js';
import User from '../models/user.model.js';

class AuthService {
	async register(data) {
		const { name, email, password } = data;

        const existUser = await User.findOne({ email });

        if (existUser) {
            throw new Error("Пользователь с такой почтой уже существует");
        } 

        if (!name || !email || !password) {
            if (email || password) {
                throw new Error("Введите имя пользователя");
            } else if (name || password) {
                throw new Error("Введите электронную почту");
            } else if (email || name) {
                throw new Error("Введите пароль");
            }
            throw new Error("Введите все данные: имя, эл. почту, пароль");
        }

        if (password.length < 6) {
            throw new Error("Пароль должен содержать не менее 6 символов");
        }

        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            const newUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            };
            return newUser;

        } else {
            throw new Error("Пользователь не найден");
        }
	}

	async login(data) {
		const { email, password } = data;
        const user = await User.findOne({ email });

        if (!email && !password) {
            throw new Error("Введите электронную почту и пароль");
        } else if (!email) {
            throw new Error("Введите электронную почту");
        } else if (!password) {
            throw new Error("Введите пароль");
        }
        

        if (user && (await user.matchPassword(password))) {
            const validateUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            }
			return validateUser;
        } else {
            throw new Error('Введены неверные эл.почта или пароль');
        }
	}
}

export default new AuthService();