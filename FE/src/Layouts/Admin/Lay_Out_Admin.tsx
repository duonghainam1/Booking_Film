
import { Breadcrumb, Layout, theme } from 'antd';
import Footer_Admin from '../../Components/Layouts/Admin/Footer';
import Sidebar from '../../Components/Layouts/Admin/Sidebar';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header_Admin from '../../Components/Layouts/Admin/Header';

const { Content } = Layout;


const Lay_Out_Admin = () => {
    const location = useLocation();
    const breadcrumbNameMap: any = {
        "/admin": "Thông kê",
        '/admin/movie': 'Danh sách phim',
        '/admin/movie/add': 'Thêm phim',
        '/admin/movie/:id': 'Chỉnh sửa phim',
        '/admin/genres': 'Danh sách thể loại',
        '/admin/genres/add': 'Thêm thể loại',
        '/admin/genres/:id': `Chỉnh sửa thể loại`,
        '/admin/cinema': 'Danh sách rạp chiếu',
        '/admin/cinema/add': 'Thêm rạp chiếu',
        '/admin/cinema/:id': 'Chỉnh sửa rạp chiếu',
        '/admin/show_time': 'Danh sách lịch chiếu',
        '/admin/show_time/add': 'Thêm lịch chiếu',
        '/admin/show_time/:id': 'Chỉnh sửa lịch chiếu',
        '/admin/cinema-room': 'Danh sách phòng chiếu',
        '/admin/cinema-room/add': 'Thêm phòng chiếu',
        '/admin/cinema-room/:id': 'Chỉnh sửa phòng chiếu',
    };
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>
                    {breadcrumbNameMap[url] || _}
                </Link>
            </Breadcrumb.Item>
        );
    });
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout >
                <Header_Admin />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        {breadcrumbItems}
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer_Admin />
            </Layout>
        </Layout>
    );
};


export default Lay_Out_Admin
