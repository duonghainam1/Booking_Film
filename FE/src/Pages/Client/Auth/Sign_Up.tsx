import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, message } from "antd"
import { Link, useNavigate } from "react-router-dom";
import poster from "../../../assets/img/bg_2.jpg"
import { mutationAuth } from "../../../Common/Hook/Auth/mutationAuth";

type FieldType = {
    username?: string;
    password?: string;
    confirmPassword?: string
    phone_number?: string;
    email: string
};
const Sign_Up = () => {
    const { mutate, contextHolder } = mutationAuth("SIGN_UP")
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        mutate(values)
        message.success("Đăng ký thành công");
        navigate("/signin")
    };
    return (
        <div >
            {contextHolder}
            <div className="flex justify-center items-center h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${poster})` }}>
                <Form
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 400 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    className="bg-[#10141B] p-8 border rounded-lg "
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="mb-8 flex justify-between items-center">
                        <h1 className="text-white text-[24px] font-medium">Đăng ký</h1>
                        <CloseOutlined className="text-white" />
                    </div>
                    <Form.Item<FieldType>
                        label={<span className="text-white">Tên đăng nhập</span>}
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input className="w-full" placeholder="Tên đăng nhập" />
                    </Form.Item>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item<FieldType>
                            label={<span className="text-white">Email</span>}
                            name="email"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={<span className="text-white">Số điện thoại</span>}
                            name="phone_number"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input placeholder="Số điện thoại" />
                        </Form.Item>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item<FieldType>
                            label={<span className="text-white">Mật khẩu</span>}
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label={<span className="text-white">Nhập lại mật khẩu</span>}
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input placeholder="Nhập lại mật khẩu" />
                        </Form.Item>
                    </div>

                    <Form.Item className="">
                        <Button type="primary" htmlType="submit" className="w-full rounded-full">
                            Đăng ký
                        </Button>
                    </Form.Item>
                    <div className="text-center">
                        <p className="text-white">Đã có tài khoản? <Link to="/signin" className="text-[#6387FF]">Đăng nhập</Link></p>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Sign_Up