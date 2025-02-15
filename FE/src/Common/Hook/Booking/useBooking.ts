import { useQuery } from "@tanstack/react-query"
import { booking_get, booking_get_by_id, booking_get_userId } from "../../../Services/Booking/booking"


export const useBooking = (id?: string | number, page: number = 1, limit: number = 12, search: string = "",) => {
    const { data, ...rest } = useQuery({
        queryKey: ["BOOKING", id, page, limit, search],
        queryFn: async () => {
            return id ? await booking_get_by_id(id) : await booking_get(page, limit, search)
        }
    })
    return { data, totalDocs: data?.totalDocs, ...rest }
}

export const useBookingUserId = (userId: string | number) => {
    const { data, ...rest } = useQuery({
        queryKey: ["BOOKING_USERID", userId],
        queryFn: async () => {
            return await booking_get_userId(userId)
        }
    })
    return { data, ...rest }
}