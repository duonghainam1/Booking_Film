import cron from 'node-cron';
import ShowTime from '../models/showTime.js';
import CinemaHall from '../models/cinemaHall.js';


const updateShowTimeAndCinemaHallStatus = async () => {
    const now = new Date();
    await ShowTime.updateMany(
        { 'dates.showtimes.start_time': { $lte: now }, 'dates.showtimes.end_time': { $gt: now } },
        { $set: { 'dates.$[].showtimes.$[elem].status': 'ongoing' } },
        { arrayFilters: [{ 'elem.start_time': { $lte: now }, 'elem.end_time': { $gt: now } }] }
    );

    await ShowTime.updateMany(
        { 'dates.showtimes.end_time': { $lte: now } },
        { $set: { 'dates.$[].showtimes.$[elem].status': 'completed' } },
        { arrayFilters: [{ 'elem.end_time': { $lte: now } }] }
    );
    const completedShowTimes = await ShowTime.find({ 'dates.showtimes.end_time': { $lte: now } });
    for (const showTime of completedShowTimes) {
        for (const date of showTime.dates) {
            for (const showtime of date.showtimes) {
                if (showtime.end_time <= now) {
                    await CinemaHall.updateOne(
                        { _id: showtime.cinemaHallId },
                        { $set: { status: 'active' } }
                    );
                }
            }
        }
    }
};

const updateSeat = async () => {
    const now = new Date();
    const showTimes = await ShowTime.find({
        'dates.showtimes.end_time': { $lte: now },
        'dates.showtimes.status': { $ne: 'completed' }
    });

    for (const showTime of showTimes) {
        for (const date of showTime.dates) {
            for (const showtime of date.showtimes) {
                if (showtime.end_time <= now) {
                    showtime.status = 'completed';
                    await CinemaHall.updateOne(
                        { _id: showtime.cinemaHallId },
                        { $set: { 'seatLayout.$[].seats.$[].isBooked': false } }
                    );
                }
            }
        }
        await showTime.save();
    }
}
cron.schedule('* * * * *', () => {
    console.log("Đã cập nhật trạng thái suất chiếu và phòng chiếu");
    updateShowTimeAndCinemaHallStatus();
    updateSeat()
});
