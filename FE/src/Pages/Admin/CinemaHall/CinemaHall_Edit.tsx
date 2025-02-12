import { useEffect, useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { useMutation_CinemaHall } from "../../../Common/Hook/Cenima/useMutation_CinemaHall";
import { useCinema } from "../../../Common/Hook/Cenima/useCinema";
import { DeleteOutlined, LeftOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useCinemaHall } from "../../../Common/Hook/Cenima/useCinemaHall";
import IsLoading from "../../../Components/Loading/IsLoading";

const { Option } = Select;

const defaultPrices: any = {
    VIP: 80000,
    Standard: 70000,
    Couple: 100000,
};

const CinemaHall_Edit = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const { mutate, contextHolder } = useMutation_CinemaHall("EDIT");
    const { data } = useCinema();
    const { data: cinemaHall, isLoading } = useCinemaHall(id);

    const [seatLayout, setSeatLayout] = useState<any[]>([]);
    const [rows, setRows] = useState(1);
    const [cols, setCols] = useState(1);

    useEffect(() => {
        if (cinemaHall) {
            setRows(cinemaHall?.seatLayout?.length || 1);
            setCols(cinemaHall?.seatLayout?.[0]?.seats?.length || 1);
            setSeatLayout(cinemaHall?.seatLayout || []);
        }
    }, [cinemaHall]);

    if (isLoading) return <IsLoading />;

    const options = data?.docs.map((cinema: any) => ({
        label: cinema.name,
        value: cinema._id,
    }));

    const generateSeats = (newRows: number, newCols: number) => {
        const updatedLayout = [...seatLayout];

        while (updatedLayout.length < newRows) {
            const rowName = String.fromCharCode(65 + updatedLayout.length);
            updatedLayout.push({
                row: rowName,
                seats: Array(newCols)
                    .fill(null)
                    .map((_, j) => ({
                        number: j + 1,
                        type: "Standard",
                        price: defaultPrices["Standard"],
                    })),
            });
        }

        while (updatedLayout.length > newRows) {
            updatedLayout.pop();
        }

        updatedLayout.forEach((row) => {
            while (row.seats.length < newCols) {
                row.seats.push({
                    number: row.seats.length + 1,
                    type: "Standard",
                    price: defaultPrices["Standard"],
                });
            }
            while (row.seats.length > newCols) {
                row.seats.pop();
            }
        });

        setSeatLayout(updatedLayout);
    };

    const removeSeat = (rowIndex: number, seatIndex: number) => {
        const updatedLayout = [...seatLayout];
        updatedLayout[rowIndex].seats.splice(seatIndex, 1);
        setSeatLayout(updatedLayout);
    };

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const cinemaData = { ...values, _id: id, seatLayout };
            mutate(cinemaData);
            // message.success("Cập nhật phòng chiếu thành công!");
        } catch (error: any) {
            message.error(error.response?.data?.message || "Lỗi khi cập nhật!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            {contextHolder}
            <div className="relative flex items-center justify-between my-4">
                <Link to="/admin/cinema-room" className="flex items-center gap-2">
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
                form={form}
                initialValues={{
                    cinemaId: cinemaHall?.cinemaId,
                    name: cinemaHall?.name,
                    screenType: cinemaHall?.screenType,
                    rows: rows,
                    cols: cols,
                    status: cinemaHall?.status,
                }}
            >
                <Form.Item name="cinemaId" label="Tên Rạp" rules={[{ required: true, message: "Nhập tên rạp!" }]}>
                    <Select placeholder="Chọn phòng" options={options} />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="name" label="Tên Phòng" rules={[{ required: true, message: "Nhập tên phòng!" }]}>
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item name="screenType" label="Loại Màn Hình" rules={[{ required: true, message: "Chọn loại màn hình!" }]}>
                        <Select placeholder="Chọn loại màn hình">
                            <Option value="2D">2D</Option>
                            <Option value="3D">3D</Option>
                            <Option value="IMAX">IMAX</Option>
                            <Option value="4DX">4DX</Option>
                        </Select>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Form.Item label="Số hàng" name="rows">
                        <Input
                            type="number"
                            min={1}
                            max={26}
                            value={rows}
                            onChange={(e) => {
                                const newRows = Number(e.target.value);
                                setRows(newRows);
                                generateSeats(newRows, cols);
                            }}
                        />
                    </Form.Item>

                    <Form.Item label="Số cột" name="cols">
                        <Input
                            type="number"
                            min={1}
                            max={20}
                            value={cols}
                            onChange={(e) => {
                                const newCols = Number(e.target.value);
                                setCols(newCols);
                                generateSeats(rows, newCols);
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Trạng thái" name="status">
                        <Select>
                            <Option value="active">Hoạt động</Option>
                            <Option value="inactive">Không hoạt động</Option>
                        </Select>

                    </Form.Item>
                </div>

                <div className="overflow-auto max-h-96 border p-4 rounded-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                {Array.from({ length: cols }).map((_, index) => (
                                    <th key={index} className="border p-2">{index + 1}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {seatLayout.map((row: any, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.seats.map((seat: any, seatIndex: number) => (
                                        <td key={seatIndex} className="border p-2 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="font-semibold">{row.row}{seat.number}</span>
                                                <Select
                                                    value={seat.type}
                                                    onChange={(value) => {
                                                        const updatedLayout = [...seatLayout];
                                                        updatedLayout[rowIndex].seats[seatIndex].type = value;
                                                        updatedLayout[rowIndex].seats[seatIndex].price = defaultPrices[value]; // Update price based on selected seat type
                                                        setSeatLayout(updatedLayout);
                                                    }}
                                                >
                                                    <Option value="VIP"><div className="bg-yellow-400 w-5 h-5"></div></Option>
                                                    <Option value="Standard"><div className="bg-blue-500 w-5 h-5"></div></Option>
                                                    <Option value="Couple"><div className="bg-red-500 w-5 h-5"></div></Option>
                                                </Select>
                                                <Input
                                                    type="number"
                                                    value={seat.price || 0}
                                                    onChange={(e) => {
                                                        const updatedLayout = [...seatLayout];
                                                        updatedLayout[rowIndex].seats[seatIndex].price = Number(e.target.value);
                                                        setSeatLayout(updatedLayout);
                                                    }}
                                                    placeholder="Giá"
                                                    style={{ width: "80px" }}
                                                />
                                                <DeleteOutlined
                                                    onClick={() => removeSeat(rowIndex, seatIndex)}
                                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                                />
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center gap-4 mt-4">
                        <div className="flex flex-col items-center gap-2">
                            <span className="bg-yellow-500 w-6 h-6 rounded-md"></span>
                            <span>VIP</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="bg-blue-500 w-6 h-6 rounded-md"></span>
                            <span>Thường</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="bg-red-500 w-6 h-6 rounded-md"></span>
                            <span>Đôi</span>
                        </div>
                    </div>
                </div>

                <Form.Item className="mt-4 text-center">
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập Nhật Phòng Chiếu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CinemaHall_Edit;
