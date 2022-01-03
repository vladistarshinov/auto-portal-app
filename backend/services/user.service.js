import User from '../models/user.model.js';
import generateToken from '../utils/jwt-gen.js';

class UserService {
	async getProfile(data) {
		const user = await User.findById(data._id);

    if (user) {
        const profile = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        };
				return profile;
    } else {
        throw new Error('Пользователь не найден');
    }
	}

	async updateProfile(id, data) {
		const user = await User.findById(id);

    if (user) {
        user.name = data.name || user.name;
        user.email = data.email || user.email;
        if (data.password) {
            user.password = data.password;
        }

        const updatedUser = await user.save();

				const updProfile = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        };

				return updProfile;

    } else {
        throw new Error('Пользователь не найден');
    }
	}
}

export default new UserService();