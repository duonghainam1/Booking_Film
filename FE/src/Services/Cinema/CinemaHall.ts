import instance from "../../Configs/config_axios"


export const Cinema_Hall_Get = async (page: number, limit: number, search: string) => {
    try {
        const { data } = await instance.get(`/cinema-room?_page=${page}&_limit=${limit}&_search=${search}`)
        return data
    } catch (error) {
        return error
    }
}
export const Cinema_Hall_GetById = async (id: string | number) => {
    try {
        const { data } = await instance.get(`/cinema-room/${id}`)
        return data
    } catch (error) {
        return error
    }
}

export const CinemaHall_Create = async (cinema: any) => {
    try {
        const data = await instance.post(`/cinema-room`, cinema)
        return data
    } catch (error: any) {
        // Trả lại thông báo lỗi từ backend
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message) // Đảm bảo lỗi từ backend được ném ra
        }
        throw new Error("Có lỗi xảy ra, vui lòng thử lại!")
    }
}

export const Cinema_Hall_Update = async (cinema: any) => {
    try {
        const data = await instance.put(`/cinema-room/${cinema._id}`, cinema)
        return data
    } catch (error) {
        return error
    }
}
export const Cinema_Hall_Delete = async (id: string | number) => {
    try {
        const data = await instance.delete(`/cinema-room/${id}`)
        return data
    } catch (error) {
        return error
    }
}
