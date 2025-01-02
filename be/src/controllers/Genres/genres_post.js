import { StatusCodes } from 'http-status-codes';
import genre from '../../models/genre';

export const genres_post = async (req, res) => {
    try {
        const { name } = req.body
        const newGenre = new genre({ name });
        await newGenre.save();
        return res.status(StatusCodes.OK).json({ newGenre });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}