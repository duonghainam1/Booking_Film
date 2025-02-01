import genres from '../../models/genre.js';
import { StatusCodes } from 'http-status-codes';
import movie from '../../models/movie.js';
export const genres_delete = async (req, res) => {
    try {
        const { id } = req.params;
        const relateMovie = await movie.findOne({ genres: id });
        console.log(relateMovie);

        if (relateMovie) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Thể loại này đang được sử dụng bởi một hoặc nhiều phim, không thể xóa!",
            });
        }
        await genres.findByIdAndDelete(id);
        res.status(StatusCodes.OK).json({ message: "Genre deleted successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}