import ShowTime from "../../models/showTime.js";
import { StatusCodes } from "http-status-codes";

export const show_time_get = async (req, res) => {
    const { _page = 1, _limit = 12, _search } = req.query;
    try {
        const option = {
            page: _page,
            limit: _limit,
            sort: { createdAt: -1 }
        }
        const query = {};
        if (_search) {
            query.name = { $regex: _search, $options: "i" }
        }
        const showTime = await ShowTime.paginate(query, option);
        return res.status(StatusCodes.OK).json(showTime);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });

    }
}

export const show_time_get_by_id = async (req, res) => {
    const { id } = req.params;
    try {
        const showTimeId = await ShowTime.findById(id);
        res.status(StatusCodes.OK).json(showTimeId);
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    }
}