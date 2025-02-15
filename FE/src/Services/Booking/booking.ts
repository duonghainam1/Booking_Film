import instance from "../../Configs/config_axios"

export const booking_Add = async (booking: any) => {
    try {
        const data = await instance.post(`/booking`, booking)
        return data
    } catch (error) {
        return error
    }
}

export const booking_get = async (page: number, pageSize: number, search: string) => {
    try {
        const { data } = await instance.get(`/booking?page=${page}&pageSize=${pageSize}&search=${search}`)
        return data
    } catch (error) {
        return error
    }
}

export const booking_get_by_id = async (id: string | number) => {
    try {
        const data = await instance.get(`/booking/${id}`)
        return data
    } catch (error) {
        return error
    }
}
export const booking_get_userId = async (userId: string | number) => {
    try {
        const { data } = await instance.get(`/booking/user/${userId}`)
        return data
    } catch (error) {
        return error
    }
}