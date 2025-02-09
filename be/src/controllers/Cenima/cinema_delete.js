
import { StatusCodes } from 'http-status-codes';
import Cinema from '../../models/cinema.js';

export const cinema_delete = async (req, res) => {
    const { id } = req.params;
    try {
        await Cinema.findByIdAndDelete(id);
        return res.status(StatusCodes.OK).json({ message: "Delete successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}