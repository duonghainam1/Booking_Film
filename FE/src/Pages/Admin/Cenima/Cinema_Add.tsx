

import { Form, Input, Button, message } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useMutation_Cinema } from "../../../Common/Hook/Cenima/useMutation_Cinema";

const Cinema_Add = () => {
    const [form] = Form.useForm();

    const { mutate, contextHolder, isPending } = useMutation_Cinema("ADD")

    const onFinish = (values: any) => {
        try {
            const payload = {
                ...values,
            };
            mutate(payload);
            form.resetFields();
            message.success("Thêm rạp chiếu thành công")
        } catch (error) {
            message.error("Thêm rạp chiếu thất bại")

        }
    };

    if (isPending) return <IsLoading />

    return (
        <div className="max-w-4xl mx-auto p-6">
            {contextHolder}
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/cinema" className="flex items-center gap-2"><LeftOutlined /><p className="hidden lg:block">Quay lại</p></Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">Thêm rạp chiếu</h1>
            </div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    status: "Coming_soon",
                }}
            >
                <Form.Item
                    label="Tên rạp chiếu"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên phòng chiếu" }]}
                >
                    <Input placeholder="Nhập tên phòng chiếu" />
                </Form.Item>

                <div className="grid grid-cols-3 gap-4">
                    {/* <Form.Item
                        label="Điạ chỉ"
                        name="location"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                    >
                        <Input placeholder="Nhập tên địa chỉ" />
                    </Form.Item> */}
                    <Form.Item
                        label="Thời gian mở cửa"
                        name="opening_hours"
                        rules={[{ required: true, message: "Vui lòng nhập thời lượng phim" }]}
                    >
                        <Input className="w-full" placeholder="Nhập thời gian mở cửa" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone_number"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Vui lòng nhập Email" }]}
                    >
                        <Input placeholder="Nhập Email" />
                    </Form.Item>
                </div>
                <Form.Item
                    className="text-center"
                >
                    <Button type="primary" htmlType="submit">
                        Thêm rạp chiếu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Cinema_Add;


