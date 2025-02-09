import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { Show_Time_Create, Show_Time_Delete, Show_Time_Update } from "../../../Services/Show_Time/Show_Time"
import { useNavigate } from "react-router-dom"
type Actions = "ADD" | "EDIT" | "DELETE"

export const useMutation_Show_Time = (action: Actions) => {
    const [messageApi, contextHolder] = message.useMessage()
    const queryClient = useQueryClient()
    const naviget = useNavigate()

    const { mutate, ...rest } = useMutation({
        mutationFn: async (show_time: any) => {
            switch (action) {
                case "ADD":
                    return await Show_Time_Create(show_time)
                case "EDIT":
                    return await Show_Time_Update(show_time)
                case "DELETE":
                    return await Show_Time_Delete(show_time)
                default:
                    return;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["SHOW_TIME"]
            })
            switch (action) {
                case "ADD":
                    messageApi.open({
                        type: "success",
                        content: "Thêm lịch chiếu thành công"
                    })
                    break;
                case "EDIT":
                    naviget("/admin/show_time")
                    break
                case "DELETE":
                    messageApi.open({
                        type: "success",
                        content: "Xóa lịch chiếu thành công"
                    })
                    break
                default:
                    break;
            }
        }
    })

    return {
        mutate,
        ...rest,
        contextHolder
    }
}