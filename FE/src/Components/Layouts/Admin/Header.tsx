import { Avatar } from "antd"
import Search from "antd/es/input/Search"

const Header_Admin = () => {
    return (
        <div className="flex items-center justify-end px-4 pt-4">
            <Search className="w-[350px]" placeholder="input search text" onSearch={value => console.log(value)} enterButton />
            <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div>
                <h1>Admin</h1>
                <span className="text-xs">Admin@gmail.com</span>
            </div>
        </div>)
}

export default Header_Admin