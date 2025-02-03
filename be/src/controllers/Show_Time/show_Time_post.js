import { StatusCodes } from "http-status-codes";
import Movie from "../../models/movie.js";
import Cenima from "../../models/cenima.js";
import ShowTime from "../../models/showTime.js";
export const Show_Time_post = async (req, res) => {
    try {
        const { movieId, cinemaId, show_time, price, screen_type, available_seats, language } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Movie not found" });
        }
        const cinema = await Cenima.findById(cinemaId);
        if (!cinema) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Cinema not found" });
        }
        const newShowTime = await ShowTime.create({
            ...req.body,
        })
        return res.status(StatusCodes.CREATED).json(newShowTime);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}