import { StatusCodes } from "http-status-codes";
import Movie from "../../models/movie.js";
import ShowTime from "../../models/showTime.js";

export const Show_Time_post = async (req, res) => {
    try {
        const { movieId, dates } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy phim" });
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
        const newShowTime = await ShowTime.create(req.body);

        return res.status(StatusCodes.CREATED).json(newShowTime);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
