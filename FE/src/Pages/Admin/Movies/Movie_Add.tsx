

import { Form, Input, DatePicker, InputNumber, Select, Upload, Button } from "antd";
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const Movie_Add = () => {
    const onFinish = (values: any) => {
        console.log("Form values:", values);
        // Gửi API thêm phim tại đây
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/movie" className="flex items-center gap-2"><LeftOutlined /><p className="hidden lg:block">Quay lại</p></Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">Thêm phim</h1>
            </div>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    status: "Sắp chiếu",
                }}
            >
                <Form.Item
                    label="Tên phim"
                    name="title"
                    rules={[{ required: true, message: "Vui lòng nhập tên phim" }]}
                >
                    <Input placeholder="Nhập tên phim" />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                >
                    <TextArea rows={4} placeholder="Nhập mô tả phim" />
                </Form.Item>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Ngày phát hành"
                        name="releaseDate"
                        rules={[{ required: true, message: "Vui lòng chọn ngày phát hành" }]}
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                        label="Thời lượng (phút)"
                        name="duration"
                        rules={[{ required: true, message: "Vui lòng nhập thời lượng phim" }]}
                    >
                        <InputNumber min={1} className="w-full" placeholder="Nhập thời lượng" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Diễn viên"
                        name="actors"
                        rules={[{ required: true, message: "Vui lòng nhập danh sách diễn viên" }]}
                    >
                        <Select mode="tags" placeholder="Nhập tên diễn viên" />
                    </Form.Item>
                    <Form.Item
                        label="Thể loại"
                        name="genres"
                        rules={[{ required: true, message: "Vui lòng nhập thể loại" }]}
                    >
                        <Select mode="tags" placeholder="Nhập thể loại phim" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Form.Item
                        label="Đạo diễn"
                        name="director"
                        rules={[{ required: true, message: "Vui lòng nhập tên đạo diễn" }]}
                    >
                        <Input placeholder="Nhập tên đạo diễn" />
                    </Form.Item>
                    <Form.Item
                        label="Ngôn ngữ"
                        name="language"
                        rules={[{ required: true, message: "Vui lòng nhập ngôn ngữ phim" }]}
                    >
                        <Input placeholder="Nhập ngôn ngữ" />
                    </Form.Item>
                    <Form.Item
                        label="Quốc gia"
                        name="country"
                        rules={[{ required: true, message: "Vui lòng nhập quốc gia sản xuất" }]}
                    >
                        <Input placeholder="Nhập quốc gia" />
                    </Form.Item>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Poster"
                        name="poster"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                        rules={[{ required: true, message: "Vui lòng upload poster phim" }]}
                    >
                        <Upload name="poster" listType="picture" action="/upload.do">
                            <Button icon={<UploadOutlined />}>Upload Poster</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Link trailer" name="trailer_url">
                        <Input placeholder="Nhập link trailer (tuỳ chọn)" />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
                    className="w-1/2"
                >
                    <Select>
                        <Option value="Đang chiếu">Đang chiếu</Option>
                        <Option value="Sắp chiếu">Sắp chiếu</Option>
                        <Option value="Ngừng chiếu">Ngừng chiếu</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    className="text-center"
                >
                    <Button type="primary" htmlType="submit">
                        Thêm Phim
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Movie_Add;


