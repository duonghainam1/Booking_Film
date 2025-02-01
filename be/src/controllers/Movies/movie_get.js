import movie from "../../models/movie.js";
import { StatusCodes } from 'http-status-codes';

export const movie_get = async (req, res) => {
    const { _page = 1, _limit = 12, _search } = req.query;
    try {
        const option = {
            page: _page,
            limit: _limit,
            populate: "genres",
            sort: { createdAt: -1 }
        }
        const query = {};
        if (_search) {
            query.title = { $regex: _search, $options: "i" }
        }
        const movies = await movie.paginate(query, option);
        return res.status(StatusCodes.OK).json(movies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const movie_get_by_id = async (req, res) => {
    const { id } = req.params;
    try {
        const movieId = await movie.findById(id).populate("genres");
        res.status(200).json(movieId);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}