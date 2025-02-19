import { Router } from "express";
import { getMonthlyRevenueStatistics, getRevenueStatisticsByDay, getRevenueStatisticsByMovie } from "../controllers/Dashboard/dashboard";


const Router_Dashboard = Router();

Router_Dashboard.get("/dashboard", getMonthlyRevenueStatistics)
Router_Dashboard.get("/dashboard/day", getRevenueStatisticsByDay)
Router_Dashboard.get("/dashboard/movies", getRevenueStatisticsByMovie)

export default Router_Dashboard;
