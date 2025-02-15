import { StatusCodes } from 'http-status-codes';
import Booking from '../../models/booking.js';
import ShowTime from '../../models/showTime.js';
export const booking_Post = async (req, res) => {
    const { userId, showTime, movieTitle, seats, paymentMethod } = req.body;
    const totalPrice = seats.reduce((sum, seat) => sum + seat.price, 0);
    // const showtime = await ShowTime.findById(showTimeId);
    // if (!showtime) {
    //     return res.status(StatusCodes.NOT_FOUND).json({ message: "Showtime not found" });
    // }
    try {
        const booking = await Booking.create({
            userId, showTime, movieTitle, seats, paymentMethod, totalPrice
        })
        return res.status(StatusCodes.CREATED).json({
            booking,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}




