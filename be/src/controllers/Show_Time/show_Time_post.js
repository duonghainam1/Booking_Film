import { StatusCodes } from "http-status-codes";
import Movie from "../../models/movie.js";
import ShowTime from "../../models/showTime.js";
import CinemaHall from "../../models/cinemaHall.js"; // Import model phòng chiếu

export const Show_Time_post = async (req, res) => {
    try {
        const { movieId, dates } = req.body;

        // Kiểm tra phim có tồn tại không
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy phim" });
        }

        // Lấy danh sách các phòng chiếu từ dữ liệu gửi lên
        const cinemaHallIds = new Set();
        dates.forEach(date => {
            date.showtimes.forEach(showtime => {
                cinemaHallIds.add(showtime.cinemaHallId);
            });
        });

        // Cập nhật trạng thái của các phòng chiếu thành "đã chọn"
        await CinemaHall.updateMany(
            { _id: { $in: [...cinemaHallIds] } },
            { $set: { status: "selected" } } // Bạn có thể thay "selected" bằng trạng thái phù hợp
        );

        // Tạo suất chiếu mới
        const newShowTime = await ShowTime.create(req.body);

        return res.status(StatusCodes.CREATED).json(newShowTime);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
