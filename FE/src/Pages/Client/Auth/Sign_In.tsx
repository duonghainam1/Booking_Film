import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input } from "antd"
import poster from "../../../assets/img/bg_11111.jpg"

import { Link } from "react-router-dom";
type FieldType = {
    password?: string;
    email: string
};

const Sign_In = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };
    return (
        <div >
            <div className="flex justify-center items-center h-screen  bg-cover bg-center"
                style={{ backgroundImage: `url(${poster})` }}>
                <Form
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 400 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    className="bg-[#10141B] p-8 border rounded-lg w-full"
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="mb-8 flex justify-between items-center">
                        <h1 className="text-white text-[24px] font-medium">Đăng nhập</h1>
                        <CloseOutlined className="text-white" />
                    </div>


                    <Form.Item<FieldType>
                        label={<span className="text-white">Email</span>}
                        name="email"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input placeholder="Email" className="w-full" />
                    </Form.Item>



                    <Form.Item<FieldType>
                        label={<span className="text-white">Mật khẩu</span>}
                        name="password"
                        className="mb-2"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input placeholder="Mật khẩu" />
                    </Form.Item>
                    <p className="text-white text-right mb-6">Quên mật khẩu</p>

                    <Form.Item className="">
                        <Button type="primary" htmlType="submit" className="w-full rounded-full">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <div className="text-center">
                        <p className="text-white">Bạn chưa có tài khoản? <Link to="/signin" className="text-[#6387FF]">Đăng ký</Link></p>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Sign_In