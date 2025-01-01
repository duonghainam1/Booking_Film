import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import Router_movie from "./routers/Movies/movie_Router.js";
import Router_genres from "./routers/Genres/genres_Router.js";
const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
connectDB(process.env.DB_URI);

// routers

app.use("/api/v1", Router_movie)
app.use("/api/v1", Router_genres)


// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// })
export const viteNodeApp = app;

