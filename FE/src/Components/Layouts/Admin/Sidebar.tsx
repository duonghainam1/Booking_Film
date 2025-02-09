import { ClockCircleOutlined, FileTextOutlined, FolderOutlined, PieChartOutlined, TeamOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider"
import { useState } from "react";
import { NavLink } from "react-router-dom";
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<NavLink to="/admin">Thống kê</NavLink>, '1', <PieChartOutlined />),
    getItem("Quản lý phim", 'sub1', <FolderOutlined />, [
        getItem(<NavLink to="/admin/movie">Danh sách phim</NavLink>, '3'),
        getItem(<NavLink to="/admin/movie/add">Thêm phim</NavLink>, '4'),
        getItem(<NavLink to="/admin/genres">Thể Loại</NavLink>, '5'),
    ]),
    getItem('Quản lý lịch chiếu', 'sub2', <ClockCircleOutlined />, [
        getItem(<NavLink to="/admin/show_time">Danh sách lịch chiếu</NavLink>, '6'),
        getItem(<NavLink to="/admin/show_time/add">Thêm lịch chiếu</NavLink>, '7'),
        // getItem('Sửa lịch chiếu', '8'),
    ]),
    getItem('Quản lý vé', 'sub3', <FileTextOutlined />, [
        getItem('Danh sách vé', '9'),
        getItem('Thêm vé', '10'),
        getItem('Sửa vẽ', '11'),
    ]),
    getItem('Quản lý rạp chiếu', 'sub4', <UnorderedListOutlined />, [
        getItem(<NavLink to="/admin/cinema">Danh sách rạp chiếu</NavLink>, '12'),
        getItem(<NavLink to="/admin/cinema/add">Thêm rạp chiếu</NavLink>, '13'),
        // getItem('Sửa phòng chiếu', '14'),
    ]),
    getItem('Quản lý phòng chiếu', 'sub7', <UnorderedListOutlined />, [
        getItem(<NavLink to="/admin/cinema-room">Danh sách phòng chiếu</NavLink>, '20'),
        getItem(<NavLink to="/admin/cinema-room/add">Thêm phòng chiếu</NavLink>, '21'),
        // getItem('Sửa phòng chiếu', '14'),
    ]),
    // getItem('Quản lý ghế', 'sub6', <CalendarOutlined />, [
    //     getItem(<NavLink to="/admin/seat">Danh sách ghế</NavLink>, '18'),
    //     getItem(<NavLink to="/admin/seat/add">Thêm ghế</NavLink>, '19'),
    //     // getItem('Sửa lịch chiếu', '8'),
    // ]),
    getItem('Quản tài khoản', 'sub5', <TeamOutlined />, [
        getItem('Tom', '15'),
        getItem('Bill', '16'),
        getItem('Alex', '17'),
    ]),
    // getItem('Files', '9', <FileOutlined />),
];
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    )
}

export default Sidebar