import { Router } from "express";
import { logOut, sign_In, sign_Up } from "../../controllers/Auth/auth.js";
import { auth_get, get_Auth_By_Id } from "../../controllers/Auth/auth_get.js";

const Router_auth = Router();
Router_auth.post('/auth/sign_in', sign_In);
Router_auth.post('/auth/sign_up', sign_Up);
Router_auth.get('/auth', auth_get);
Router_auth.get('/auth/:userId', get_Auth_By_Id)
Router_auth.post('/auth/logout', logOut)
export default Router_auth;