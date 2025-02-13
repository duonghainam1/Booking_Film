import { Avatar } from "antd"
import Search from "antd/es/input/Search"
import { useLocalStorage } from "../../../Common/Hook/useStorage";
import { useAuth } from "../../../Common/Hook/Auth/useAuth";

const Header_Admin = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const { data } = useAuth(userId)
    return (
        <div className="flex items-center justify-end px-4 pt-4">
            <Search className="w-[350px] pr-3" placeholder="input search text" onSearch={value => console.log(value)} enterButton />
            <Avatar size={48} src={data?.data?.user?.avatar} />
            <div>
                <h1>{data?.data?.user?.username}</h1>
                <span className="text-xs">{data?.data?.user?.email}</span>
            </div>
        </div>)
}

export default Header_Admin