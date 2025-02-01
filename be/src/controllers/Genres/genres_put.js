import { StatusCodes } from "http-status-codes";
import genres from "../../models/genre.js";
export const genres_put = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const genre = await genres.findByIdAndUpdate(id, { name }, { new: true });
        res.status(StatusCodes.OK).json({ genre });

    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}