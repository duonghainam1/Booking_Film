import { Route, Routes } from "react-router-dom"
import Lay_Out_Admin from "../Layouts/Admin/Lay_Out_Admin"
import Lay_Out_Client from "../Layouts/Client/Lay_Out_Client"
import Movie_List from "../Pages/Admin/Movies/Movie_List"
import Movie_Add from "../Pages/Admin/Movies/Movie_Add"
import Movie_Edit from "../Pages/Admin/Movies/Movie_Edit"
import Genres_List from "../Pages/Admin/Genres/Genres_List"
import Genres_Add from "../Pages/Admin/Genres/Genres_Add"
import Genres_Edit from "../Pages/Admin/Genres/Genres_Edit"
import Home_Page from "../Pages/Client/Home/Home_Page"
import Show_Schedule_Page from "../Pages/Client/Show_Schedule/Show_Schedule_Page"
import Ticket_Page from "../Pages/Client/Ticket/Ticket_Page"
import Sign_In from "../Pages/Client/Auth/Sign_In"
import Sign_Up from "../Pages/Client/Auth/Sign_Up"
import Movie_Details from "../Pages/Client/Movie_Details/Movie_Details"

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Lay_Out_Client />}>
                    <Route index element={<Home_Page />} />
                    <Route path="movies/:id" element={<Movie_Details />} />
                    <Route path="showTime" element={<Show_Schedule_Page />} />
                    <Route path="ticket" element={<Ticket_Page />} />
                    <Route path="signin" element={<Sign_In />} />
                    <Route path="signup" element={<Sign_Up />} />

                </Route>
                <Route path="/admin" element={<Lay_Out_Admin />}>
                    {/* Phim */}
                    <Route path="movie" element={<Movie_List />} />
                    <Route path="movie/add" element={<Movie_Add />} />
                    <Route path="movie/:id" element={<Movie_Edit />} />
                    {/* Thể loại */}
                    <Route path="genres" element={<Genres_List />} />
                    <Route path="genres/add" element={<Genres_Add />} />
                    <Route path="genres/:id" element={<Genres_Edit />} />

                </Route>
            </Routes>
        </>)
}

export default Router