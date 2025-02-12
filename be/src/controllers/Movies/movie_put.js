import movie from "../../models/movie.js";
import { StatusCodes } from "http-status-codes";
import Genre from "../../models/genre.js";

export const movie_put = async (req, res) => {
    const { id } = req.params;

    try {
        const { title, description, releaseDate, duration, actors, genres, director, language, poster, trailer_url, status, country, banner } = req.body;
        const existingMovie = await movie.findById(id);
        let updatedGenres = [];
        if (genres && genres.length > 0) {
            updatedGenres = await Genre.find({ name: { $in: genres } }).select('_id');
            updatedGenres = updatedGenres.map(genre => genre._id);
        } else {
            updatedGenres = existingMovie.genres;
        }

        const updateMovie = {
            title,
            description,
            releaseDate,
            duration,
            actors,
            genres: updatedGenres,
            director,
            language,
            poster,
            trailer_url,
            status,
            country,
            banner,
        };
        await movie.findByIdAndUpdate(id, updateMovie, { new: true });
        res.status(StatusCodes.OK).json({ message: "Update successfully" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
