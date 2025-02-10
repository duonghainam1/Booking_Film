import Movie from "../../models/movie.js";
import { StatusCodes } from 'http-status-codes';
import ShowTime from "../../models/showTime.js";
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
        const movies = await Movie.paginate(query, option);
        return res.status(StatusCodes.OK).json(movies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const movie_get_by_id = async (req, res) => {
    const { id } = req.params;
    try {
        const movieDetails = await Movie.findById(id).populate("genres");
        if (!movieDetails) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy phim!" });
        }
        const showtimes = await ShowTime.find({ movieId: id })
            .populate({
                path: "dates.showtimes.cinemaHallId",
                select: "name location screenType seatLayout status", // Lấy thông tin phòng chiếu
            })
            .sort({ "dates.date": 1 });

        return res.status(StatusCodes.OK).json({
            movie: movieDetails,
            showtimes: showtimes
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};