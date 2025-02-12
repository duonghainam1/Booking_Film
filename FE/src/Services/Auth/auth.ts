import instance from "../../Configs/config_axios"
import { toast } from "react-toastify"
export const sign_In = async (user: any) => {
    try {
        const data = await instance.post("/auth/sign_in", user)
        const token = data.data.token
        localStorage.setItem("token", token)
        return data
    } catch (error: any) {
        if (error.response) {
            toast.error("Đăng nhập thất bại vui lòng kiểm tra lại", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}
export const sign_Up = async (user: any) => {
    try {
        const data = await instance.post("/auth/sign_up", user)
        return data
    } catch (error: any) {
        if (error.response) {
            toast.error("Đăng ký thất bại vui lòng kiểm tra lại", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;

    }
}

export const get_auth = async () => {
    try {
        const data = await instance.get("/auth")
        return data
    } catch (error: any) {
        if (error.response) {
            toast.error("Không thể lấy thông tin người dùng", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}

export const get_auth_by_id = async (userId: string | number) => {
    try {
        const data = await instance.get(`/auth/${userId}`)
        return data
    } catch (error: any) {
        if (error.response) {
            toast.error("Không thể lấy thông tin người dùng", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error;
    }
}

export const logOut = async () => {
    try {
        const data = await instance.post("/auth/logout")
        localStorage.removeItem("token")
        return data
    } catch (error: any) {
        if (error.response) {
            toast.error("Không thể đăng xuất", { autoClose: 800 });
        } else {
            toast.error("Không thể kết nối với server. Vui lòng thử lại.", { autoClose: 800 });
        }
        throw error

    }
}