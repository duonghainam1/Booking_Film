import { LeftOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from "antd"
import { Link } from "react-router-dom"
import { useMutation_Genres } from "../../../Common/Hook/Genrers/useMutation_Genres"

const Genres_Add = () => {
    const [form] = Form.useForm()
    const { mutate, contextHolder } = useMutation_Genres("ADD")
    const onFinish = (values: any) => {
        try {
            mutate(values)
            form.resetFields()
        } catch (error) {
            message.error("Thêm thể loại thất bại")
        }
    }
    return (
        <div className="max-w-4xl mx-auto p-6">
            {contextHolder}
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/genres" className="flex items-center gap-2"><LeftOutlined /><p className="hidden lg:block">Quay lại</p></Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">Thêm thể loại</h1>
            </div>
            <Form
                form={form}
                layout="vertical"
                name="basic"
                onFinish={onFinish}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    label="Tên thể loại"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên thể loại!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    className="flex justify-center">
                    <Button type="primary" htmlType="submit">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Genres_Add