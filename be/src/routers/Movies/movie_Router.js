import { Router } from 'express';
import { movie_post } from '../../controllers/Movies/movie_post.js';
import { movie_get, movie_get_by_id } from '../../controllers/Movies/movie_get.js';

const Router_movie = Router();
Router_movie.get('/movies', movie_get)
Router_movie.post('/movies-add', movie_post)
Router_movie.get('/movies/:id', movie_get_by_id)
export default Router_movie;