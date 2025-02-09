import { Form, Input, Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

import IsLoading from "../../../Components/Loading/IsLoading";
import { useMutation_Cinema } from "../../../Common/Hook/Cenima/useMutation_Cinema";
import { useCinema } from "../../../Common/Hook/Cenima/useCinema";


const Cinema_Edit = () => {
    const { id } = useParams();
    const { data } = useCinema(id);
    const { mutate, contextHolder } = useMutation_Cinema("EDIT");

    const onFinish = (values: any) => {
        const payload = {
            ...values,
            _id: id,
        };
        mutate(payload);
    };

    if (!data) return <IsLoading />


    return (
        <div className="max-w-4xl mx-auto p-6">
            {contextHolder}
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/cinema" className="flex items-center gap-2">
                    <LeftOutlined />
                    <p className="hidden lg:block">Quay lại</p>
                </Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">
                    Cập nhật phòng chiếu
                </h1>
            </div>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    ...data,

                }}
            >
                <Form.Item
                    label="Tên phòng chiếu"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên phòng chiếu" }]}
                >
                    <Input placeholder="Nhập tên phòng chiếu" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Điạ chỉ"
                        name="location"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                    >
                        <Input placeholder="Nhập tên địa chỉ" />
                    </Form.Item>
                    <Form.Item
                        label="Thời gian mở cửa"
                        name="opening_hours"
                        rules={[{ required: true, message: "Vui lòng nhập thời lượng phim" }]}
                    >
                        <Input className="w-full" placeholder="Nhập thời gian mở cửa" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-4">
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

                <Form.Item className="text-center">
                    <Button type="primary" htmlType="submit">
                        Cập nhật phòng chiếu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Cinema_Edit;
