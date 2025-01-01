import { Route, Routes } from "react-router-dom"
import Lay_Out_Admin from "../Layouts/Admin/Lay_Out_Admin"
import Lay_Out_Client from "../Layouts/Client/Lay_Out_Client"
import Movie_List from "../Pages/Admin/Movies/Movie_List"
import Movie_Add from "../Pages/Admin/Movies/Movie_Add"
import Movie_Edit from "../Pages/Admin/Movies/Movie_Edit"
import Genres_List from "../Pages/Admin/Genres/Genres_List"
import Genres_Add from "../Pages/Admin/Genres/Genres_Add"
import Genres_Edit from "../Pages/Admin/Genres/Genres_Edit"

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Lay_Out_Client />}>
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