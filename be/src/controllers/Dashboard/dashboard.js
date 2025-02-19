import { StatusCodes } from 'http-status-codes';
import Booking from '../../models/booking.js';


export const getMonthlyRevenueStatistics = async (req, res) => {
    try {
        const orders = await Booking.find({ status: { $in: ["completed"] } });
        const revenueByMonth = {};
        const currentYear = new Date().getFullYear();
        const months = [
            "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
            "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
        ]
        orders.forEach((item) => {
            const month = new Date(item.createdAt).getMonth();
            const year = new Date(item.createdAt).getFullYear();
            if (year === currentYear) {
                if (!revenueByMonth[month]) {
                    revenueByMonth[month] = 0
                }
                revenueByMonth[month] += item.totalPrice;
            }
        })
        const result = months.map((monthName, index) => ({
            month: monthName,
            totalRevenue: revenueByMonth[index] || 0
        }))
        return res.status(StatusCodes.OK).json({
            message: "Thống kê doanh thu theo tháng thành công",
            data: result
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}


export const getRevenueStatisticsByDay = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const dataFilter = {};

        if (startDate && endDate) {
            dataFilter.createdAt = {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            };
        }

        const bookings = await Booking.find({
            status: "completed",
            ...dataFilter
        });

        const revenueByDay = {};

        bookings.forEach((item) => {
            const orderDate = new Date(item.createdAt).toISOString().split('T')[0];
            if (!revenueByDay[orderDate]) {
                revenueByDay[orderDate] = {
                    total: 0,
                    totalOrder: 0
                };
            }
            revenueByDay[orderDate].total += item.totalPrice;
            revenueByDay[orderDate].totalOrder += 1;
        });

        return res.status(StatusCodes.OK).json({
            message: "Thống kê doanh thu thành công",
            revenueByDay,
            totalOrder: bookings.length,
            bookings
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};

export const getRevenueStatisticsByMovie = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const dataFilter = {};

        if (startDate && endDate) {
            dataFilter.createdAt = {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            };
        }

        const bookings = await Booking.find({
            status: "completed",
            ...dataFilter
        });

        const revenueByMovie = {};

        bookings.forEach((item) => {
            const movieTitle = item.movieTitle;

            if (!revenueByMovie[movieTitle]) {
                revenueByMovie[movieTitle] = {
                    totalRevenue: 0,
                    totalBookings: 0
                };
            }

            revenueByMovie[movieTitle].totalRevenue += item.totalPrice;
            revenueByMovie[movieTitle].totalBookings += 1;
        });

        return res.status(StatusCodes.OK).json({
            message: "Thống kê doanh thu theo phim thành công",
            revenueByMovie,
            totalBookings: bookings.length
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
};
