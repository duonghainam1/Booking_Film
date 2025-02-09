import { StatusCodes } from 'http-status-codes';
import CinemaHall from '../../models/cinemaHall.js';

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