import { get_Revenue_Statistics_By_Day, get_Revenue_Statistics_Movies } from './../../../Services/Dashboard/dashboard';
import { useQuery } from "@tanstack/react-query"
import { get_Monthly_Revenue_Statistics } from "../../../Services/Dashboard/dashboard"


export const useDashboard = () => {
    const { data, ...rest } = useQuery({
        queryKey: ["DASHBOARD"],
        queryFn: async () => {
            try {
                const { data } = await get_Monthly_Revenue_Statistics()
                return data
            } catch (error) {
                return error
            }
        }
    })
    return { data, ...rest }
}

export const useDashboard_Day = () => {
    const { data, ...rest } = useQuery({
        queryKey: ["DASHBOARD_DAY"],
        queryFn: async () => {
            try {
                return await get_Revenue_Statistics_By_Day()
            } catch (error) {
                return error
            }
        }
    })
    return { data, ...rest }
}

export const useDashboard_Movies = () => {
    const { data, ...rest } = useQuery({
        queryKey: ["DASHBOARD_MOVIES"],
        queryFn: async () => {
            try {
                return await get_Revenue_Statistics_Movies()
            } catch (error) {
                return error
            }
        }
    })
    return { data, ...rest }
}