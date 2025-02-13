import { message } from "antd";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Navigate } from "react-router-dom";
interface CustomJwtPayload extends JwtPayload {
    role?: string;
}


const PrivateRoute = ({ children }: any) => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/signin" />
    }
    try {
        const decode = jwtDecode<CustomJwtPayload>(token)
        const role = decode.role
        if (role !== "admin") {
            message.error("Bạn không có quyền truy cập")
            return <Navigate to="/signin" />
        }
    } catch (error) {
        return <Navigate to="/signin" />

    }
    return children
}

export default PrivateRoute