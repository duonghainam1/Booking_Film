import Auth from '../../models/auth.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signUpValidation } from '../../validate/Auth/sign_Up.js';
export const sign_In = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.StatusCodes(StatusCodes.BAD_REQUEST).json({ message: "Email không tồn tại" });
        }
        const isMacth = await bcrypt.compare(password, user.password);
        if (!isMacth) {
            return res.StatusCodes(StatusCodes.BAD_REQUEST).json({ message: "Mật khẩu không chính xác" });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, "2004", {
            expiresIn: "1h",
        })
        return res.status(StatusCodes.OK).json({ token, user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const sign_Up = async (req, res) => {
    const { username, email, password, phone_number } = req.body;
    console.log(req.body);

    const { error } = signUpValidation.validate(req.body, { abortEarly: false });

    if (error) {
        console.log("nfskndk");

        const messages = error.details.map((item) => item.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            messages,
        });
    }
    const exisAuth = await Auth.findOne({ email });
    if (exisAuth) {
        return res.StatusCodes(StatusCodes.BAD_REQUEST).json({ message: "Email đã tồn tại" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const role = (await Auth.countDocuments({})) === 0 ? "admin" : "user";
    const user = await Auth.create({
        ...req.body,
        password: hashPassword,
        role
    })
    return res.status(StatusCodes.CREATED).json({
        user,
    });
}