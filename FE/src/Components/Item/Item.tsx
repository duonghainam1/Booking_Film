import { Link } from "react-router-dom";
import { useMovies } from "../../Common/Hook/Movies/useMovies"
import IsLoading from "../Loading/IsLoading";
const Item = ({ status }: any) => {
    const { data } = useMovies()
    const filtereData = data?.docs?.filter((item: any) => item.status === status) || []
    if (!data) {
        return <IsLoading />
    }
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {filtereData.map((item: any) => {
                    return (
                        <Link to={`/movies/${item._id}`} key={item._id}>
                            <img src={item.poster} alt="" className="rounded-xl h-[400px] w-full" />
                            <div className="flex justify-between py-2 *:text-[#5C687F] *:font-medium">
                                <p>{item?.genres?.name}</p>
                                <p>{new Date(item?.releaseDate).toLocaleDateString()}</p>
                            </div>
                            <h1 className="text-xl font-medium">{item.title}</h1>
                        </Link>
                    )
                })}

            </div>
        </div>
    )
}

export default Item