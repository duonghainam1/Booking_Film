
import { StatusCodes } from 'http-status-codes';
import movie from '../../models/movie.js';

export const movie_post = async (req, res) => {
    try {
        const { title, description, releaseDate, duration, actors, genres, director, language, poster, trailer_url, status, country } = req.body
        const newMovie = new movie({ title, description, releaseDate, duration, actors, genres, director, language, poster, trailer_url, status, country });
        await newMovie.save();
        return res.status(StatusCodes.OK).json({ newMovie });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}