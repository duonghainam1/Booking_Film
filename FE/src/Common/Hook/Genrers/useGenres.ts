import { genres_Get, genres_GetById } from './../../../Services/Genres/genres_Service';
import { useQuery } from "@tanstack/react-query"

export const useGenres = (id?: string | number, page: number = 1, limit: number = 12, search: string = "") => {
    const { data, ...rest } = useQuery({
        queryKey: ["GENRES", id, page, limit, search],
        queryFn: async () => {
            return id ? await genres_GetById(id) : await genres_Get(page, limit, search)
        }
    })
    return { data, totalDocs: data?.totalDocs, ...rest }
}