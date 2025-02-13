import { useMutation } from "@tanstack/react-query"
import { booking_Add } from "../../../Services/Booking/booking";
type Actions = "ADD" | "EDIT" | "DELETE"
export const useMutation_Booking = (action: Actions) => {
    const { mutate } = useMutation({
        mutationFn: async (booking: any) => {
            switch (action) {
                case "ADD":
                    return await booking_Add(booking)
                case "EDIT":

                    break;
                case "DELETE":

                    break;
                default:
                    break;
            }
        }
    })
    return { mutate }
}
