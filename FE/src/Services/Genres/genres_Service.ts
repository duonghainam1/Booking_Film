import instance from "../../Configs/config_axios"

export const genres_Get = async (page: number, limit: number, search: string) => {
    try {
        const { data } = await instance.get(`/genres?_page=${page}&_limit=${limit}&_search=${search}`)
        return data
    } catch (error) {
        return error
    }
}