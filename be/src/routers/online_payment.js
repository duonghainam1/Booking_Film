import express from 'express';
import { createPaymentUrl, returnUrll } from '../controllers/OnlineCheckoutController/onlineCheckoutController.js';

const Router_OnlPayment = express.Router();


Router_OnlPayment.post('/createPayment', createPaymentUrl)
Router_OnlPayment.get('/return', returnUrll);

export default Router_OnlPayment;
