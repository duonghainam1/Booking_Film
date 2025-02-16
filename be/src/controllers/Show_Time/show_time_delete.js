import ShowTime from '../../models/showTime.js';
import { StatusCodes } from 'http-status-codes';
export const show_time_delete = async (req, res) => {
    const { id } = req.params;
    try {
        await ShowTime.findByIdAndDelete(id);
        res.status(StatusCodes.OK).json({ message: "Xóa thành công" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}