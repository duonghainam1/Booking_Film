import { useQuery } from "@tanstack/react-query"
import { Cinema_Hall_Get, Cinema_Hall_GetById } from "../../../Services/Cinema/CinemaHall"

export const useCinemaHall = (id?: string | number, page: number = 1, limit: number = 12, search: string = "") => {
    const { data, ...rest } = useQuery({
        queryKey: ["CINEMA_HALL", id, page, limit, search],
        queryFn: async () => {
            try {
                return id ? await Cinema_Hall_GetById(id) : await Cinema_Hall_Get(page, limit, search)
            } catch (error) {
                return error
            }
        }
    })
    return { data, ...rest, totalDocs: data?.totalDocs }
}