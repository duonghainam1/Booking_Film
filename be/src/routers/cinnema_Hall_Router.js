import { Router } from 'express';
import { cinemaHall_post } from '../controllers/CinemaHall/cinemaHall_post.js';
import { cinemaHall_get, cinemaHall_get_by_id } from '../controllers/CinemaHall/cinemaHall_get.js';
import { cinemaHall_put } from '../controllers/CinemaHall/cinemaHall_put.js';
import { cinemaHall_delete } from '../controllers/CinemaHall/cinemaHall_delete.js';


const Router_Cinema_Hall = Router();
Router_Cinema_Hall.get('/cinema-room', cinemaHall_get);
Router_Cinema_Hall.get('/cinema-room/:id', cinemaHall_get_by_id);
Router_Cinema_Hall.post('/cinema-room', cinemaHall_post);
Router_Cinema_Hall.put('/cinema-room/:id', cinemaHall_put);
Router_Cinema_Hall.delete('/cinema-room/:id', cinemaHall_delete);

export default Router_Cinema_Hall;