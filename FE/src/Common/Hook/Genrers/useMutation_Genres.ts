import { useMutation, useQueryClient } from "@tanstack/react-query"
import { genres_Add, genres_Delete, genres_Update } from "../../../Services/Genres/genres_Service"
import { message } from "antd"
type Actions = "ADD" | "UPDATE" | "DELETE"

export const useMutation_Genres = (action: Actions) => {
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (genres: any) => {
            switch (action) {
                case "ADD":
                    return await genres_Add(genres)
                case "UPDATE":
                    return await genres_Update(genres)
                case "DELETE":
                    return await genres_Delete(genres)
                default:
                    return null
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["GENRES"]
            })
            switch (action) {
                case "ADD":
                    messageApi.open({
                        type: "success",
                        content: "Thêm thể loại thành công"
                    })
                    break
                case "UPDATE":
                    messageApi.open({
                        type: "success",
                        content: "Cập nhật thể loại thành công"
                    })
                    break
                case "DELETE":
                    messageApi.open({
                        type: "success",
                        content: "Xóa thể loại thành công"
                    })
                    break
                default:
                    break
            }

        }
    })
    return { mutate, ...rest, contextHolder }
}