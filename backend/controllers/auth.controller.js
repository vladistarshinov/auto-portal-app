import AuthService from '../services/auth.service.js';

class AuthController {

    // @desc     Register a new user
    // @route    POST /api/users/register
    // @access   Public
    async registerUser(req, res) {
        try {
            const newUser = await AuthService.register(req.body);
            res.status(201).json(newUser);
        } catch (e) {
            res.status(500);
            throw new Error(e.message);
            console.log(e.message);
        }
    };

    // @desc     Auth user & get token
    // @route    POST /api/users/login
    // @access   Public
    async authUser(req, res) {
        try {
            const validateUser = await AuthService.login(req.body);
            res.json(validateUser);
        } catch (e) {
            res.status(500);
            throw new Error(e.message);
            console.log(e.message);
        }
    };
};
export default new AuthController();