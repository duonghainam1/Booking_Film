import instance from "../../Configs/config_axios"

export const get_Monthly_Revenue_Statistics = async () => {
    try {
        const { data } = await instance.get('/dashboard')
        return data
    } catch (error) {
        return error
    }
}
export const get_Revenue_Statistics_By_Day = async () => {
    try {
        const { data } = await instance.get('/dashboard/day')
        return data
    } catch (error) {
        return error
    }
}
export const get_Revenue_Statistics_Movies = async () => {
    try {
        const { data } = await instance.get('/dashboard/movies')
        return data
    } catch (error) {
        return error
    }
}