import { StatusCodes } from "http-status-codes";
import Cinema from "../../models/cinema.js";

export const cinema_post = async (req, res) => {
    try {
        const { name, phone_number, email, opening_hours } = req.body;
        if (!name || !phone_number || !email || !opening_hours) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Vui lòng điền đầy đủ tất cả thông tin" });
        }
        const newCinema = await Cinema.create({
            ...req.body,
        })
        return res.status(StatusCodes.CREATED).json(newCinema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });

    }
}