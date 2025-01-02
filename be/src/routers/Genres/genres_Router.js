import { Router } from 'express';
import { genres_post } from '../../controllers/Genres/genres_post.js';
import { genres_get } from '../../controllers/Genres/genres_get.js';
const Router_genres = Router();
Router_genres.post('/genres-add', genres_post)
Router_genres.get('/genres', genres_get)
export default Router_genres;