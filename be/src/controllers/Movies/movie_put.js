import movie from "../../models/movie.js";
import { StatusCodes } from "http-status-codes";
export const movie_put = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const { title, description, releaseDate, duration, actors, genres, director, language, poster, trailer_url, status, country } = req.body
        const updateMovie = { title, description, releaseDate, duration, actors, genres, director, language, poster, trailer_url, status, country };
        await movie.findByIdAndUpdate(id, updateMovie, { new: true });
        res.status(StatusCodes.OK).json({ message: "Update successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}