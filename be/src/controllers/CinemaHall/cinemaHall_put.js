import { StatusCodes } from 'http-status-codes';
import CinemaHall from '../../models/cinemaHall.js';
import Booking from '../../models/booking.js';
import ShowTime from '../../models/showTime.js';
export const cinemaHall_put = async (req, res) => {
    try {
        const { id } = req.params;
        const { cinemaId, name, screenType, seatLayout, status } = req.body;
        const updateCinemaHall = {
            cinemaId,
            name,
            screenType,
            seatLayout,
            status
        }
        const cinemaHall = await CinemaHall.findByIdAndUpdate(id, updateCinemaHall, { new: true });
        return res.status(StatusCodes.OK).json(cinemaHall);


    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });

    }
}

export const cinemaHall_update_seat = async (booking) => {
    const bookinga = await Booking.findById(booking._id);
    if (!bookinga) {
        return { success: false, message: "Booking không tồn tại" };
    }
    const showtimeIds = bookinga.showTime.map(item => item.showtimeId);
    const showtimeExists = await ShowTime.findOne({
        "dates.showtimes": {
            $elemMatch: { _id: { $in: showtimeIds } }
        }
    });

    if (!showtimeExists) {
        return { success: false, message: "Không tìm thấy suất chiếu" };
    }
    let cinemaHallId = null;
    for (const date of showtimeExists.dates) {
        for (const showtime of date.showtimes) {
            if (showtimeIds.includes(showtime._id.toString())) {
                cinemaHallId = showtime.cinemaHallId;
                break;
            }
        }
        if (cinemaHallId) break;
    }

    if (!cinemaHallId) {
        return { success: false, message: "Không tìm thấy phòng chiếu" };
    }

    const cinemaHall = await CinemaHall.findById(cinemaHallId);
    if (!cinemaHall) {
        return { success: false, message: "Không tìm thấy phòng chiếu" };
    }
    let updated = false;
    for (const seat of bookinga.seats) {
        for (const row of cinemaHall.seatLayout) {
            for (const seatItem of row.seats) {
                if (row.row === seat.row && seatItem.number === seat.seatNumber) {
                    seatItem.isBooked = true;
                    updated = true;
                }
            }
        }
    }
    if (updated) {
        await cinemaHall.save();
        return { success: true, message: "Cập nhật trạng thái ghế thành công" };
    }

    return { success: false, message: "Không tìm thấy ghế cần cập nhật" };
};

