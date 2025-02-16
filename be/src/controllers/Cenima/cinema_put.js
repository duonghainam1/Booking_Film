import { StatusCodes } from 'http-status-codes';
import Cinema from '../../models/cinema.js';

export const cinema_put = async (req, res) => {
    const { id } = req.params;
    const { name, phone_number, email, total_seats, opening_hours } = req.body;
    try {
        const update_Cinema = {
            name,
            phone_number,
            email,
            total_seats,
            opening_hours
        }
        const cinema = await Cinema.findByIdAndUpdate(id, update_Cinema, { new: true });
        return res.status(StatusCodes.OK).json(cinema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}