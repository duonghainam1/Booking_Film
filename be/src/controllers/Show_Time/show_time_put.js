import { StatusCodes } from 'http-status-codes';
import ShowTime from '../../models/showTime.js';
import Movie from '../../models/movie.js';
import CinemaHall from "../../models/cinemaHall.js";

export const Show_Time_put = async (req, res) => {
    try {
        const { id } = req.params;
        const { movieId, dates } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy phim" });
        }
        if (!Array.isArray(dates) || dates.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Cần có ít nhất một ngày" });
        }
        for (const date of dates) {
            if (!date.date || !Array.isArray(date.showtimes) || date.showtimes.length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Không có dữ liệu suất chiếu" });
            }
            for (const showtime of date.showtimes) {
                if (!showtime.start_time || !showtime.end_time) {
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: "Không có dữ liệu suất chiếu" });
                }
            }
        }
        for (const dateObj of dates) {
            const dateStart = new Date(dateObj.date);
            dateStart.setHours(0, 0, 0, 0);

            const dateEnd = new Date(dateObj.date);
            dateEnd.setHours(23, 59, 59, 999);

            for (const showtime of dateObj.showtimes) {
                const { start_time, end_time, cinemaHallId } = showtime;
                const startTimeISO = new Date(start_time);
                const endTimeISO = new Date(end_time);

                const existingShowtime = await ShowTime.findOne({
                    "dates": {
                        $elemMatch: {
                            "date": { $gte: dateStart, $lte: dateEnd },
                            "showtimes": {
                                $elemMatch: {
                                    cinemaHallId: cinemaHallId,
                                    $or: [
                                        {
                                            start_time: { $lt: endTimeISO },
                                            end_time: { $gt: startTimeISO }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                });

                if (existingShowtime) {
                    return res.status(StatusCodes.CONFLICT).json({
                        message: "Suất chiếu đã tồn tại trong ngày này, vui lòng chọn ngày hoặc giờ khác."
                    });
                }
            }
        }
        const showTime = await ShowTime.findByIdAndUpdate(id, {
            movieId,
            dates,
        }, { new: true });
        if (!showTime) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy suất chiếu" });
        }

        return res.status(StatusCodes.OK).json(showTime);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
