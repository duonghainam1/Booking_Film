import instance from "../../Configs/config_axios"

export const Show_Time_Get = async (page: number, limit: number, search: string) => {
    try {
        const { data } = await instance.get(`/show_time?_page=${page}&_limit=${limit}&_search=${search}`)
        return data
    } catch (error) {
        return error
    }
}

export const Show_Time_GetById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`/show_time/${id}`)
        return data
    } catch (error) {
        return error
    }
}
export const Show_Time_Create = async (show_time: any) => {
    try {
        const data = await instance.post(`/show_time`, show_time)
        return data
    } catch (error) {
        return error
    }
}
export const Show_Time_Update = async (show_time: any) => {
    try {
        const data = await instance.put(`/show_time/${show_time._id}`, show_time)
        return data
    } catch (error) {
        return error
    }
}
export const Show_Time_Delete = async (id: string | number) => {
    try {
        const data = await instance.delete(`/show_time/${id}`)
        return data
    } catch (error) {
        return error
    }
}