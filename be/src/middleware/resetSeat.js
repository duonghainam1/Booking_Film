import ShowTime from "../../models/ShowTime.js";
import CinemaHall from "../../models/CinemaHall.js";

// Hàm kiểm tra và reset ghế
const resetSeatsAfterShowtime = async () => {
    try {
        const now = new Date();

        // Tìm các suất chiếu đã kết thúc
        const finishedShowtimes = await ShowTime.find({
            "dates.showtimes.end_time": { $lte: now },
        }).populate("dates.showtimes.cinemaHallId");

        for (const showtime of finishedShowtimes) {
            for (const date of showtime.dates) {
                for (const show of date.showtimes) {
                    if (new Date(show.end_time) <= now) {
                        const cinemaHallId = show.cinemaHallId._id;

                        // Reset ghế về trạng thái ban đầu
                        await CinemaHall.updateOne(
                            { _id: cinemaHallId },
                            { $set: { "seatLayout.$[].seats.$[].isBooked": false } }
                        );

                        console.log(`Đã reset ghế cho phòng chiếu ${cinemaHallId}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Lỗi khi reset trạng thái ghế:", error);
    }
};

// Chạy kiểm tra mỗi 5 phút
setInterval(resetSeatsAfterShowtime, 5 * 60 * 1000);
