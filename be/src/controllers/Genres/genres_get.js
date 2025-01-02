import genres from "../../models/genre.js";
import { StatusCodes } from "http-status-codes";
export const genres_get = async (req, res) => {
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
        const genres_All = await genres.paginate(query, option);
        return res.status(StatusCodes.OK).json(genres_All);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}