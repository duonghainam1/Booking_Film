import { Router } from 'express';
import { cinema_post } from '../controllers/Cenima/cinema_post.js';
import { cinema_get, cinema_get_by_id } from '../controllers/Cenima/cinema_get.js';
import { cinema_put } from '../controllers/Cenima/cinema_put.js';
import { cinema_delete } from '../controllers/Cenima/cinema_delete.js';

const Router_Cinema = Router();
Router_Cinema.get('/cinema', cinema_get);
Router_Cinema.get('/cinema/:id', cinema_get_by_id);
Router_Cinema.post('/cinema', cinema_post);
Router_Cinema.put('/cinema/:id', cinema_put);
Router_Cinema.delete('/cinema/:id', cinema_delete);

export default Router_Cinema;