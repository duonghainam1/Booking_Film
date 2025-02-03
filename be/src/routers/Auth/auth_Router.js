import { Router } from "express";
import { sign_In, sign_Up } from "../../controllers/Auth/auth";

const Router_auth = Router();
Router_auth.post('/auth/sign_in', sign_In);
Router_auth.post('/auth/sign_up', sign_Up);
export default Router_auth;