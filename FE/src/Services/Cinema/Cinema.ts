import instance from "../../Configs/config_axios"


export const Cinema_Get = async (page: number, limit: number, search: string) => {
    try {
        const { data } = await instance.get(`/cinema?_page=${page}&_limit=${limit}&_search=${search}`)
        return data
    } catch (error) {
        return error
    }
}
export const Cinema_GetById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`/cinema/${id}`)
        return data
    } catch (error) {
        return error
    }
}

export const Cinema_Create = async (cinema: any) => {
    try {
        const data = await instance.post(`/cinema`, cinema)
        return data
    } catch (error) {
        return error
    }
}
export const Cinema_Update = async (cinema: any) => {
    try {
        const data = await instance.put(`/cinema/${cinema._id}`, cinema)
        return data
    } catch (error) {
        return error
    }
}
export const Cinema_Delete = async (id: string | number) => {
    try {
        const data = await instance.delete(`/cinema/${id}`)
        return data
    } catch (error) {
        return error
    }
}
