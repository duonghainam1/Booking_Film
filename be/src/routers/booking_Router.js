import { Router } from 'express';
import { booking_Post } from '../controllers/Booking/booking_Post';
import { booking_Get, booking_Get_by_id, booking_get_userId } from '../controllers/Booking/booking_Get';


const Router_Booking = Router();

Router_Booking.post('/booking', booking_Post);
Router_Booking.get('/booking', booking_Get);
Router_Booking.post('/booking/:id', booking_Get_by_id);
Router_Booking.get('/booking/user/:userId', booking_get_userId);

export default Router_Booking;