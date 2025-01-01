import instance from "../../Configs/config_axios"
export const movie_Get = async (page: number, limit: number, search: string) => {
    try {
        const { data } = await instance.get(`/movies?_page=${page}&_limit=${limit}&_search=${search}`)
        return data
    } catch (error) {
        return error
    }
}

export const movie_GetById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`/movies/${id}`)
        return data
    } catch (error) {
        return error
    }
}