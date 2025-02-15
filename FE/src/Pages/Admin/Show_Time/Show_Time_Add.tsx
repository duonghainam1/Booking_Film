import { Form, DatePicker, Select, Button, message, Space } from "antd";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useMovies } from "../../../Common/Hook/Movies/useMovies";
import { useMutation_Show_Time } from "../../../Common/Hook/Show_Time/useMutation_Show_Time";
import { useCinemaHall } from "../../../Common/Hook/Cenima/useCinemaHall";
import dayjs from "dayjs";

const Show_Time_Add = () => {
    const [form] = Form.useForm();
    const { mutate, contextHolder, isPending } = useMutation_Show_Time("ADD");
    const { data: movies } = useMovies();
    const { data: cinemaHalls } = useCinemaHall();

    const movieOptions = movies?.docs
        .filter((movie: any) => movie.status === "Showing")
        .map((movie: any) => ({
            label: movie.title,
            value: movie._id,
        }));
    const cinemaHallOptions = cinemaHalls?.docs
        .filter((cinemaHall: any) => cinemaHall.status === "active")
        .map((cinemaHall: any) => ({
            label: `${cinemaHall.name}`,
            value: cinemaHall._id,
        }));


    const onFinish = (values: any) => {

        try {
            const payload = {
                ...values,
                dates: values.dates.map((date: any) => ({
                    date: date.date.toISOString(),
                    showtimes: date.showtimes.map((showtime: any) => ({
                        start_time: showtime.start_time.toISOString(),
                        end_time: showtime.end_time.toISOString(),
                        cinemaHallId: showtime.cinemaHallId,
                    })),
                })),
            };

            const seenShowtimes = new Map();
            for (const date of payload.dates) {
                for (const showtime of date.showtimes) {
                    const key = `${date.date}-${showtime.cinemaHallId}`;
                    if (!seenShowtimes.has(key)) {
                        seenShowtimes.set(key, []);
                    }
                    const existingShowtimes = seenShowtimes.get(key);
                    const isOverlapping = existingShowtimes.some((existing: any) => {
                        return (
                            (showtime.start_time < existing.end_time) &&
                            (showtime.end_time > existing.start_time)
                        );
                    });
                    if (isOverlapping) {
                        message.error(`Phòng chiếu đã trùng thời gian suất chiếu `);
                        return;
                    }
                    existingShowtimes.push(showtime);
                }
            }
            mutate(payload);
            form.resetFields();
            message.success("Thêm lịch chiếu thành công!");
        } catch (error) {
            message.error("Thêm lịch chiếu thất bại!");
        }
    };


    if (isPending) return <IsLoading />;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {contextHolder}
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/show_time" className="flex items-center gap-2">
                    <LeftOutlined />
                    <p className="hidden lg:block">Quay lại</p>
                </Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">
                    Thêm lịch chiếu
                </h1>
            </div>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Phim" name="movieId" rules={[{ required: true, message: "Vui lòng chọn phim" }]}>
                    <Select placeholder="Chọn phim" options={movieOptions} />
                </Form.Item>

                {/* <Form.Item
                    label="Phòng chiếu phim"
                    name="cinemaHallId"
                    rules={[{ required: true, message: "Vui lòng chọn phòng chiếu" }]}
                >
                    <Select placeholder="Chọn phòng chiếu" options={cinemaHallOptions} />
                </Form.Item> */}

                <Form.List
                    name="dates"
                    initialValue={[{ date: dayjs(), showtimes: [{ start_time: dayjs(), end_time: dayjs().add(1, 'hour'), price: 100000 }] }]}
                    rules={[
                        {
                            validator: async (_, names) => {
                                if (!names || names.length < 1) {
                                    return Promise.reject(new Error('Phải có ít nhất một ngày.'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, fieldKey, name, fieldArrayKey, ...restField }: any) => (
                                <div key={key} className="mb-4">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'date']}
                                        label="Ngày"
                                        rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                                    >
                                        <DatePicker className="w-full" />
                                    </Form.Item>

                                    <Form.List
                                        name={[name, 'showtimes']}
                                        initialValue={[{ start_time: dayjs(), end_time: dayjs().add(1, 'hour'), price: 100000 }]}
                                    >
                                        {(showtimeFields, { add: addShowtime, remove: removeShowtime }) => (
                                            <>
                                                {showtimeFields.map(({ key: showtimeKey, name: showtimeName, fieldKey: showtimeFieldKey, ...restShowtimeField }) => (
                                                    <Space key={showtimeKey} align="baseline" className="mb-2 flex items-center space-x-4">
                                                        <Form.Item
                                                            {...restShowtimeField}
                                                            name={[showtimeName, 'start_time']}
                                                            label="Thời gian bắt đầu"
                                                            rules={[{ required: true, message: "Vui lòng chọn thời gian bắt đầu" }]}
                                                        >
                                                            <DatePicker showTime className="w-full" format={"HH:mm:ss"} picker="time" />
                                                        </Form.Item>

                                                        <Form.Item
                                                            {...restShowtimeField}
                                                            name={[showtimeName, 'end_time']}
                                                            label="Thời gian kết thúc"
                                                            rules={[{ required: true, message: "Vui lòng chọn thời gian kết thúc" }]}
                                                        >
                                                            <DatePicker showTime className="w-full" format={"HH:mm:ss"} picker="time" />
                                                        </Form.Item>

                                                        {/* <Form.Item
                                                            {...restShowtimeField}
                                                            name={[showtimeName, 'price']}
                                                            label="Giá vé"
                                                            rules={[{ required: true, message: "Vui lòng nhập giá vé" }]}
                                                        >
                                                            <InputNumber min={10000} className="w-full" placeholder="Nhập giá vé" />
                                                        </Form.Item> */}

                                                        <Form.Item
                                                            {...restShowtimeField}
                                                            name={[showtimeName, 'cinemaHallId']}
                                                            label="Phòng chiếu"
                                                            rules={[{ required: true, message: "Vui lòng chọn phòng chiếu" }]}
                                                        >
                                                            <Select placeholder="Chọn phòng chiếu" options={cinemaHallOptions} />
                                                        </Form.Item>

                                                        <Button className="border-none" onClick={() => removeShowtime(showtimeName)} disabled={showtimeFields.length <= 1}>
                                                            <DeleteOutlined />
                                                        </Button>
                                                    </Space>
                                                ))}
                                                <Form.Item>
                                                    <Button type="dashed" onClick={() => addShowtime()} block>
                                                        <PlusOutlined />
                                                    </Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>

                                    <Button onClick={() => remove(name)} disabled={fields.length <= 1}>
                                        <DeleteOutlined />
                                    </Button>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    <PlusOutlined />
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item className="text-center">
                    <Button type="primary" htmlType="submit">
                        Thêm lịch chiếu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Show_Time_Add;
