import { Router } from 'express';
import { cenima_post } from '../../controllers/Cenima/cenima_post.js';
import { cenima_get, cenima_get_by_id } from '../../controllers/Cenima/cenima_get.js';

const Router_Cenima = Router();
Router_Cenima.get('/cenima', cenima_get);
Router_Cenima.get('/cenima/:id', cenima_get_by_id);
Router_Cenima.post('/cenima', cenima_post);

export default Router_Cenima;