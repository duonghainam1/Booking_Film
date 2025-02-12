import Auth from "../../models/auth.js";
import { StatusCodes } from "http-status-codes";

export const auth_get = async (req, res) => {
    try {
        const user = await Auth.find();
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không có user nào" });
        }
        return res.status(StatusCodes.OK).json({
            user,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });

    }
}

export const get_Auth_By_Id = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await Auth.findById(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy user" });
        }
        return res.status(StatusCodes.OK).json({ user });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Có lỗi xảy ra" });
    }
}