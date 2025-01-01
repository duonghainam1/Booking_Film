import { Layout } from 'antd';

const { Footer } = Layout;
const Footer_Admin = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Booking film ©{new Date().getFullYear()} DHN
        </Footer>
    )
}

export default Footer_Admin