import movie from "../../models/movie.js";
import { StatusCodes } from 'http-status-codes';
export const movie_delete = async (req, res) => {
    const { id } = req.params;
    try {
        await movie.findByIdAndDelete(id);
        res.status(StatusCodes.OK).json({ message: "Delete successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}