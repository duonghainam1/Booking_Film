import { useMutation, useQueryClient } from "@tanstack/react-query"
import { movie_Create, movie_Delete, movie_Update } from "../../../Services/Movies/movie_Service"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
type Actions = "ADD" | "EDIT" | "DELETE"

export const useMutation_Movie = (action: Actions) => {
    const [messageApi, contextHolder] = message.useMessage()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (movie: any) => {
            switch (action) {
                case "ADD":
                    return await movie_Create(movie)
                case "EDIT":
                    return await movie_Update(movie)
                case "DELETE":
                    return await movie_Delete(movie)
                default:
                    return;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["MOVIES"]
            })
            switch (action) {
                case "ADD":
                    messageApi.open({
                        type: "success",
                        content: "Thêm phim thành công"
                    })
                    navigate("/admin/movie")
                    break;
                case "EDIT":
                    messageApi.open({
                        type: "success",
                        content: "Cập nhật phim thành công"
                    })
                    navigate("/admin/movie")
                    break
                case "DELETE":
                    messageApi.open({
                        type: "success",
                        content: "Xóa phim thành công"
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