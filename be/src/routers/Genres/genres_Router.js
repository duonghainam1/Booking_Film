import { Router } from 'express';
import { genres_post } from '../../controllers/Genres/genres_post.js';
const Router_genres = Router();
// Router_genres.get('/genres', genres_get)
Router_genres.post('/genres-add', genres_post)
export default Router_genres;