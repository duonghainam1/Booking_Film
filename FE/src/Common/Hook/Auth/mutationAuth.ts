import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { sign_In, sign_Up } from "../../../Services/Auth/auth";
import { useLocalStorage } from "../useStorage";

type Actions = "SIGN_IN" | "SIGN_UP"
export const mutationAuth = (action: Actions) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [, setUser] = useLocalStorage("user", {});
    const { mutate } = useMutation({
        mutationFn: async (user: any) => {
            console.log(user);

            switch (action) {
                case "SIGN_IN":
                    return await sign_In(user);

                case "SIGN_UP":
                    return await sign_Up(user);

                default:
                    break;
            }
        },
        onSuccess: (user: any) => {
            console.log(user);

            switch (action) {
                case "SIGN_IN":
                    setUser(user);
                    messageApi.success("Đăng nhập thành công");
                    break;
                case "SIGN_UP":
                    messageApi.success("Đăng ký thành công");
                    break;
                default:
                    break;
            }
        }
    })
    return { mutate, contextHolder }
}