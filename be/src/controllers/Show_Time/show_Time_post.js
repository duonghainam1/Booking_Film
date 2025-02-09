import { StatusCodes } from "http-status-codes";
import Movie from "../../models/movie.js";
import ShowTime from "../../models/showTime.js";
import cinemaHall from "../../models/cinemaHall.js";
export const Show_Time_post = async (req, res) => {
    try {
        const { movieId, cinemaHallId } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy phim" });
        }
        const cinema = await cinemaHall.findById(cinemaHallId);
        if (!cinema) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy phòng chiếu" });
        }
        const newShowTime = await ShowTime.create({
            ...req.body,
        })
        return res.status(StatusCodes.CREATED).json(newShowTime);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}