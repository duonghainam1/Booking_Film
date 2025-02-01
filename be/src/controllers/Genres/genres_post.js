import { StatusCodes } from 'http-status-codes';
import genre from '../../models/genre.js';

export const genres_post = async (req, res) => {
    try {
        const { name } = req.body
        const genreExist = await genre.findOne({ name });
        if (genreExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Thể loại này đã được tạo" });
        }
        const newGenre = new genre({ name });
        await newGenre.save();
        return res.status(StatusCodes.OK).json({ newGenre });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}