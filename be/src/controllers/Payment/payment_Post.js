import { StatusCodes } from 'http-status-codes';
import Booking from '../../models/booking.js';
import Payment from '../../models/payment.js';
export const payment_Post = async (req, res) => {
    try {
        const { userId, bookingId, amount, paymentMethod, transaccionId } = req.body;
        const booking = await Booking.findOne({ bookingId });
        if (!bookingId) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy đơn đặt vé" });
        }
        const payment = await Payment.create({
            userId, bookingId, amount, paymentMethod, transaccionId
        })
        return res.status(StatusCodes.CREATED).json({
            payment,
        });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}