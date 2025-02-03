import { StatusCodes } from "http-status-codes";
import Cenima from "../../models/cenima.js";

export const cenima_post = async (req, res) => {
    try {
        const { name, location, total_seats, phone_number, email, opening_hours } = req.body;
        if (!name || !location || !total_seats || !phone_number || !email || !opening_hours) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Vui lòng điền đầy đủ tất cả thông tin" });
        }
        const newCenima = await Cenima.create({
            ...req.body,
        })
        return res.status(StatusCodes.CREATED).json(newCenima);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });

    }
}