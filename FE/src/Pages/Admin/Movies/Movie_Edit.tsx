import { Form, Input, DatePicker, InputNumber, Select, Upload, Button, message } from "antd";
import { LeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useMutation_Movie } from "../../../Common/Hook/Movies/useMutation_Movie";
import { useGenres } from "../../../Common/Hook/Genrers/useGenres";
import { uploadFileCloudinary } from "../../../Common/lib/utils";
import { useMovies } from "../../../Common/Hook/Movies/useMovies";
import moment from "moment";
import IsLoading from "../../../Components/Loading/IsLoading";

const { TextArea } = Input;
const { Option } = Select;

const Movie_Edit = () => {
    const { id } = useParams();
    const { data: movie } = useMovies(id);

    console.log(movie);

    const { mutate, contextHolder } = useMutation_Movie("EDIT");
    const { data } = useGenres();

    const options = data?.docs?.map((genre: any) => ({
        label: genre.name,
        value: genre._id,
    }));

    const onFinish = (values: any) => {
        const posterUrl = values.poster?.[0]?.response;
        const payload = {
            ...values,
            poster: posterUrl,
            _id: id,
        };
        mutate(payload);
        message.success("Cập nhật phim thành công!");
    };

    if (!movie) return <IsLoading />


    return (
        <div className="max-w-4xl mx-auto p-6">
            {contextHolder}
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/movie" className="flex items-center gap-2">
                    <LeftOutlined />
                    <p className="hidden lg:block">Quay lại</p>
                </Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">
                    Cập nhật phim
                </h1>
            </div>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    title: movie.movie?.title,
                    description: movie.movie?.description,
                    releaseDate: movie.movie.releaseDate ? moment(movie.releaseDate) : null,
                    duration: movie.movie.duration,
                    actors: movie.movie.actors,
                    genres: movie.movie.genres?.name,
                    director: movie.movie.director,
                    language: movie.movie.language,
                    country: movie.movie.country,
                    poster: movie.movie.poster ? [{ url: movie.movie.poster }] : [],
                    trailer_url: movie.movie.trailer_url,
                    status: movie.movie.status,
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
                        <Select
                            placeholder="Nhập thể loại phim"
                            options={options} // Gắn danh sách options vào Select
                        />
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
                        <Upload
                            name="poster"
                            listType="picture"
                            customRequest={async ({ file, onSuccess, onError }) => {
                                try {
                                    const url = await uploadFileCloudinary(file as File);
                                    onSuccess && onSuccess(url);
                                } catch (error: any) {
                                    onError && onError(error);
                                }
                            }}
                        >
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
                        <Option value="Showing">Đang chiếu</Option>
                        <Option value="Coming_soon">Sắp chiếu</Option>
                        <Option value="Stop_showing">Ngừng chiếu</Option>
                    </Select>
                </Form.Item>

                <Form.Item className="text-center">
                    <Button type="primary" htmlType="submit">
                        Cập nhật Phim
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Movie_Edit;
