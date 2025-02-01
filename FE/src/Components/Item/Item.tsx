import { Link } from "react-router-dom";
import { useMovies } from "../../Common/Hook/Movies/useMovies"
const Item = ({ status }: any) => {
    const { data } = useMovies()
    console.log(data?.docs?.title);
    const filtereData = data?.docs?.filter((item: any) => item.status === status) || []
    return (
        <div>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {filtereData.map((item: any) => {
                    return (
                        <Link to={`/movies/${item._id}`} key={item._id}>
                            <img src={item.poster} alt="" className="rounded-xl h-[400px] w-full" />
                            <div className="flex justify-between py-2 *:text-[#5C687F] *:font-medium">
                                <p>Hài</p>
                                <p>12/12/2014</p>
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