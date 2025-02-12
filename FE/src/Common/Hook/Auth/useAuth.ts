import { useQuery } from "@tanstack/react-query"
import { get_auth, get_auth_by_id } from "../../../Services/Auth/auth"

export const useAuth = (userId: string | number) => {

    const { data, ...rest } = useQuery({
        queryKey: ["AUTH", userId],
        queryFn: async () => {
            return userId ? await get_auth_by_id(userId) : await get_auth()
        }
    })
    return { data, ...rest }
}