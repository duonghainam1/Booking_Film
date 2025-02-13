import { StatusCodes } from 'http-status-codes';
import Booking from '../../models/booking.js';
export const booking_Get = async (req, res) => {
    const { _page = 1, _limit = 12, _search } = req.query;
    try {
        const option = {
            page: _page,
            limit: _limit,
            sort: { createdAt: -1 },
            populate: [
                { path: "userId" }
            ]
        }
        const query = {};

        if (_search) {
            query.name = { $regex: _search, $options: "i" }
        }
        const booking = await Booking.paginate(query, option);
        return res.status(StatusCodes.OK).json(booking);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });

    }
}

export const booking_Get_by_id = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id)
        if (!booking) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
}