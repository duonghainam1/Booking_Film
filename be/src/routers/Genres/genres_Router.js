import { Router } from 'express';
import { genres_post } from '../../controllers/Genres/genres_post.js';
import { genres_get, genres_get_by_id } from '../../controllers/Genres/genres_get.js';
import { genres_delete } from '../../controllers/Genres/genres_delete.js';
import { genres_put } from '../../controllers/Genres/genres_put.js';
const Router_genres = Router();
Router_genres.post('/genres-add', genres_post)
Router_genres.get('/genres', genres_get)
Router_genres.get('/genres/:id', genres_get_by_id)
Router_genres.delete('/genres/:id', genres_delete)
Router_genres.put('/genres/:id', genres_put)
export default Router_genres;