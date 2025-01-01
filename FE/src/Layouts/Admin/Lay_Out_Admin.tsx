
import { Breadcrumb, Layout, theme } from 'antd';
import Footer_Admin from '../../Components/Layouts/Admin/Footer';
import Sidebar from '../../Components/Layouts/Admin/Sidebar';
import { Outlet } from 'react-router-dom';
import Header_Admin from '../../Components/Layouts/Admin/Header';

const { Content } = Layout;


const Lay_Out_Admin = () => {
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
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
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
