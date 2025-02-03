
import { Router } from "express";
import { Show_Time_post } from "../../controllers/Show_Time/Show_Time_post";
import { show_time_get, show_time_get_by_id } from "../../controllers/Show_Time/show_time_get";
const Router_show_time = Router();
Router_show_time.get("/show_time", show_time_get)
Router_show_time.get("/show_time/:id", show_time_get_by_id)
Router_show_time.post("/show_time", Show_Time_post)
export default Router_show_time;