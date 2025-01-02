import { useQuery } from "@tanstack/react-query"
import { movie_Get, movie_GetById } from "../../../Services/Movies/movie_Service"

export const useMovies = (id?: string | number, page: number = 1, limit: number = 12, search: string = "") => {
    const { data, ...rest } = useQuery({
        queryKey: ["MOVIES", id, page, limit, search],
        queryFn: async () => {
            return id ? await movie_GetById(id) : await movie_Get(page, limit, search)
        }
    })
    return { data, totalDocs: data?.totalDocs, ...rest }
}