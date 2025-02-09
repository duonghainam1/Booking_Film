
import { Router } from "express";
import { Show_Time_post } from "../../controllers/Show_Time/Show_Time_post";
import { show_time_get, show_time_get_by_id } from "../../controllers/Show_Time/show_time_get";
import { Show_Time_put } from "../../controllers/Show_Time/show_time_put";
import { show_time_delete } from "../../controllers/Show_Time/show_time_delete";
const Router_show_time = Router();
Router_show_time.get("/show_time", show_time_get)
Router_show_time.get("/show_time/:id", show_time_get_by_id)
Router_show_time.post("/show_time", Show_Time_post)
Router_show_time.put("/show_time/:id", Show_Time_put)
Router_show_time.delete("/show_time/:id", show_time_delete)
export default Router_show_time;