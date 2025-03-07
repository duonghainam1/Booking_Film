import { Form, DatePicker, Select, Button, message, Space } from "antd";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useMovies } from "../../../Common/Hook/Movies/useMovies";
import { useMutation_Show_Time } from "../../../Common/Hook/Show_Time/useMutation_Show_Time";
import { useCinemaHall } from "../../../Common/Hook/Cenima/useCinemaHall";
import dayjs from "dayjs";
import { useShow_time } from "../../../Common/Hook/Show_Time/useShow_time";

const Show_Time_Edit = () => {
    const { id } = useParams();
    const { mutate, contextHolder } = useMutation_Show_Time("EDIT");
    const { data } = useShow_time(id);

    const { data: movies } = useMovies();
    const { data: cinemaHalls } = useCinemaHall();

    const movieOptions = movies?.docs
        .filter((movie: any) => movie.status === "Showing")
        .map((movie: any) => ({
            label: movie.title,
            value: movie._id,
        }));
    // .filter((cinemaHall: any) => cinemaHall.status === "active")

    const cinemaHallOptions = cinemaHalls?.docs.map((cinemaHall: any) => ({
        label: `${cinemaHall.name}`,
        value: cinemaHall._id,
    }));

    const onFinish = (values: any) => {
        try {
            const payload = {
                ...values,
                _id: id,
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
            message.success("Cập nhật lịch chiếu thành công!");
        } catch (error) {
            message.error("Cập nhật lịch chiếu thất bại!");
        }
    };

    if (!data) return <IsLoading />;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {contextHolder}
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/show_time" className="flex items-center gap-2">
                    <LeftOutlined />
                    <p className="hidden lg:block">Quay lại</p>
                </Link>
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg lg:text-2xl font-bold">
                    Cập nhật lịch chiếu
                </h1>
            </div>
            <Form layout="vertical" onFinish={onFinish}
                initialValues={{
                    movieId: data?.movieId._id,
                    cinemaHallId: data?.cinemaHallId?._id,
                    dates: data?.dates.map((date: any) => ({
                        date: dayjs(date.date),
                        showtimes: date.showtimes.map((showtime: any) => ({
                            start_time: dayjs(showtime.start_time),
                            end_time: dayjs(showtime.end_time),
                            cinemaHallId: showtime.cinemaHallId?._id,
                        })),
                    })),
                }}
            >
                <Form.Item label="Phim" name="movieId" rules={[{ required: true, message: "Vui lòng chọn phim" }]}>
                    <Select placeholder="Chọn phim" options={movieOptions} />
                </Form.Item>

                <Form.List
                    name="dates"
                    initialValue={[{ date: dayjs(), showtimes: [{ start_time: dayjs(), end_time: dayjs().add(1, 'hour'), price: 100000 }] }]}
                    rules={[{
                        validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('Phải có ít nhất một ngày.'));
                            }
                        }
                    }]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
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
                                        initialValue={[{ start_time: dayjs(), end_time: dayjs().add(1, 'hour') }]}
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
                        Cập nhật lịch chiếu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Show_Time_Edit;
