import CinemaHall from "../../models/cinemaHall.js";
import { StatusCodes } from 'http-status-codes';
export const cinemaHall_post = async (req, res) => {
    try {
        const { cinemaId, name, screenType, seatLayout, status } = req.body;
        if (!cinemaId || !name || !screenType || !seatLayout) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Vui lòng điền đẩy đủ thông tin" });
        }
        const existingCinemaHall = await CinemaHall.findOne({ cinemaId, name });
        if (existingCinemaHall) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Tên phòng đã tồn tại" });
        }
        const newCinemaHall = new CinemaHall({
            cinemaId,
            name,
            screenType,
            seatLayout,
            status
        });
        const savedCinemaHall = await newCinemaHall.save();
        return res.status(StatusCodes.CREATED).json({
            message: "Thêm phòng chiếu thành công",
            cinemaHall: savedCinemaHall
        });
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
