import { message } from "antd"
import instance from "../../Configs/config_axios"

export const genres_Get = async (page: number, limit: number, search: string) => {
    try {
        const { data } = await instance.get(`/genres?_page=${page}&_limit=${limit}&_search=${search}`)
        return data
    } catch (error) {
        return error
    }
}

export const genres_Add = async (genres: string) => {
    try {
        const data = await instance.post('/genres-add', genres)
        console.log(data);

        return data
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            message.error(error.response.data.message);
            // throw new Error(message.error(error.response.data.message));
        }
        throw new Error(error.message || "Có lỗi xảy ra, vui lòng thử lại!");
    }
}


export const genres_GetById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`/genres/${id}`)
        return data
    } catch (error) {
        return error
    }
}

export const genres_Update = async (genres: any) => {
    try {
        const { data } = await instance.put(`/genres/${genres._id}`, genres)
        return data
    } catch (error) {
        return error
    }
}
export const genres_Delete = async (id: string | number) => {
    try {
        const { data } = await instance.delete(`/genres/${id}`)
        return data
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            message.error(error.response.data.message);
            // throw new Error(message.error(error.response.data.message));
        }
        throw new Error(error.message || "Có lỗi xảy ra, vui lòng thử lại!");
    }
}