import { useQuery } from "@tanstack/react-query"
import { Cinema_Get, Cinema_GetById } from "../../../Services/Cinema/Cinema"

export const useCinema = (id?: string | number, page: number = 1, limit: number = 12, search: string = "") => {
    const { data, ...rest } = useQuery({
        queryKey: ["CINEMA", id, page, limit, search],
        queryFn: async () => {
            try {
                return id ? await Cinema_GetById(id) : await Cinema_Get(page, limit, search)
            } catch (error) {
                return error
            }
        }
    })
    return { data, ...rest, totalDocs: data?.totalDocs }
}