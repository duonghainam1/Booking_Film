import { LeftOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from "antd"
import { Link, useParams } from "react-router-dom"
import { useMutation_Genres } from "../../../Common/Hook/Genrers/useMutation_Genres"
import { useGenres } from "../../../Common/Hook/Genrers/useGenres"
import IsLoading from "../../../Components/Loading/IsLoading"

const Genres_Edit = () => {
    const { id } = useParams()
    console.log(id);

    const { data, isLoading } = useGenres(id)
    console.log(data);

    const { mutate } = useMutation_Genres("UPDATE")
    const onFinish = (values: any) => {
        try {

            const payload = { ...values, _id: id };
            mutate(payload);
            message.success("Cập nhật thể loại thành công")
        } catch (error) {
            message.error("Cập nhật thể loại thất bại")
        }
    }
    if (isLoading) {
        return <IsLoading />

    }
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/genres" className="flex items-center gap-2"><LeftOutlined /><p className="hidden lg:block">Quay lại</p></Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">Cập  nhật thể loại</h1>
            </div>
            <Form
                layout="vertical"
                name="basic"
                onFinish={onFinish}
                initialValues={{ ...data }}
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

export default Genres_Edit