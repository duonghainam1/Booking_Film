import { useMutation, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import { Cinema_Create, Cinema_Delete, Cinema_Update } from "../../../Services/Cinema/Cinema"
type Actions = "ADD" | "EDIT" | "DELETE"

export const useMutation_Cinema = (action: Actions) => {
    const [messageApi, contextHolder] = message.useMessage()
    const queryClient = useQueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (cinema: any) => {
            switch (action) {
                case "ADD":
                    return await Cinema_Create(cinema)
                case "EDIT":
                    return await Cinema_Update(cinema)
                case "DELETE":
                    return await Cinema_Delete(cinema)
                default:
                    return;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["CINEMA"]
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
        }
    })

    return {
        mutate,
        ...rest,
        contextHolder
    }
}