import { StatusCodes } from 'http-status-codes';
import ShowTime from '../../models/showTime.js';
import Movie from '../../models/movie.js';
import cinemaHall from '../../models/cinemaHall.js';

export const Show_Time_put = async (req, res) => {
    try {
        const { id } = req.params;
        const { movieId, cinemaHallId, dates } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Movie not found" });
        }
        const cinema = await cinemaHall.findById(cinemaHallId);
        if (!cinema) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Cinema not found" });
        }
        if (!Array.isArray(dates) || dates.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "At least one date is required" });
        }
        for (const date of dates) {
            if (!date.date || !Array.isArray(date.showtimes) || date.showtimes.length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid showtimes data" });
            }
            for (const showtime of date.showtimes) {
                if (!showtime.start_time || !showtime.end_time || !showtime.price) {
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid showtime data" });
                }
            }
        }
        const showTime = await ShowTime.findByIdAndUpdate(id, {
            movieId,
            cinemaHallId,
            dates,
        }, { new: true });
        if (!showTime) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Showtime not found" });
        }

        return res.status(StatusCodes.OK).json(showTime);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
