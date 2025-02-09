import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { Cinema_Hall_Delete, Cinema_Hall_Update, CinemaHall_Create } from "../../../Services/Cinema/CinemaHall"

type Actions = "ADD" | "EDIT" | "DELETE"

export const useMutation_CinemaHall = (action: Actions) => {
    const [messageApi, contextHolder] = message.useMessage()
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (cinema: any) => {
            switch (action) {
                case "ADD":
                    return await CinemaHall_Create(cinema)
                case "EDIT":
                    return await Cinema_Hall_Update(cinema)
                case "DELETE":
                    return await Cinema_Hall_Delete(cinema)
                default:
                    return;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["CINEMA_HALL"]
            })
            switch (action) {
                case "ADD":
                    messageApi.open({
                        type: "success",
                        content: "Thêm phòng chiếu thành công"
                    })
                    break;
                case "EDIT":
                    messageApi.open({
                        type: "success",
                        content: "Cập nhật phòng chiếu thành công"
                    })
                    break
                case "DELETE":
                    messageApi.open({
                        type: "success",
                        content: "Xóa phòng chiếu thành công"
                    })
                    break
                default:
                    break;
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.message || "Có lỗi xảy ra, vui lòng thử lại!"
            messageApi.open({
                type: "error",
                content: errorMessage
            })
        }
    })

    return {
        mutate,
        ...rest,
        contextHolder
    }
}
