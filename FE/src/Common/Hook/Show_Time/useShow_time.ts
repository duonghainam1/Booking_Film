import { useQuery } from "@tanstack/react-query"
import { Show_Time_Get, Show_Time_GetById } from "../../../Services/Show_Time/Show_Time"

export const useShow_time = (id?: string | number, page: number = 1, limit: number = 12, search: string = "") => {
    const { data, ...rest } = useQuery({
        queryKey: ["SHOW_TIME", id, page, limit, search],
        queryFn: async () => {
            return id ? await Show_Time_GetById(id) : await Show_Time_Get(page, limit, search)
        }
    })
    return { data, totalDocs: data?.totalDocs, ...rest }
}