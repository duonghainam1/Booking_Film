import { genres_Get } from './../../../Services/Genres/genres_Service';
import { useQuery } from "@tanstack/react-query"

export const useGenres = (page: number = 1, limit: number = 12, search: string = "") => {
    const { data, ...rest } = useQuery({
        queryKey: ["GENRES"],
        queryFn: async () => {
            return await genres_Get(page, limit, search)
        }
    })
    return { data, totalDocs: data?.totalDocs, ...rest }
}