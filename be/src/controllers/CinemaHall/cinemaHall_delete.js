
import { StatusCodes } from 'http-status-codes';
import CinemaHall from '../../models/cinemaHall.js';

export const cinemaHall_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const cinemaHall = await CinemaHall.findByIdAndDelete(id);
        if (!cinemaHall) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Phòng chiếu không tồn tại" });
        }
        return res.status(StatusCodes.OK).json({ message: "Phòng chiếu đã bị xóa" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}