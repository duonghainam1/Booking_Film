import { StatusCodes } from 'http-status-codes';
import CinemaHall from '../../models/cinemaHall.js';

export const cinemaHall_get = async (req, res) => {
    const { _page = 1, _limit = 12, _search } = req.query;
    try {
        const option = {
            page: _page,
            limit: _limit,
            sort: { createdAt: -1 },
            populate: [{ path: "cinemaId" }]
        }
        const query = {};
        if (_search) {
            query.name = { $regex: _search, $options: "i" }
        }
        const cinema = await CinemaHall.paginate(query, option);
        return res.status(StatusCodes.OK).json(cinema);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export const cinemaHall_get_by_id = async (req, res) => {
    const { id } = req.params;
    try {
        const cinemaId = await CinemaHall.findById(id);
        res.status(StatusCodes.OK).json(cinemaId);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
}