
import { Table, Card, Space, Popconfirm } from "antd";
import { useCinemaHall } from "../../../Common/Hook/Cenima/useCinemaHall";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useMutation_CinemaHall } from "../../../Common/Hook/Cenima/useMutation_CinemaHall";

const CinemaHall_List = () => {
    const [searchParmas, setSearchParams] = useSearchParams()
    const currentPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const [currenPage, setCurrentPage] = useState(currentPageUrl);
    const [pageSize, setPageSize] = useState(pageSizeUrl);
    const { data, isLoading, totalDocs } = useCinemaHall(undefined, currenPage, pageSize, '');
    const { mutate, contextHolder } = useMutation_CinemaHall("DELETE")
    useEffect(() => {
        const params: any = {}
        if (currenPage !== 1) {
            params['page'] = currenPage;
        }
        if (pageSize !== 4) {
            params['pageSize'] = pageSize;
        }
        setSearchParams(params)
    }, [
        currenPage,
        pageSize,
        setSearchParams
    ])
    const dataSources = data?.docs.map((cinema: any) => {
        return {
            ...cinema,
            key: cinema._id
        }
    })


    const renderSeatLayout = (seatLayout: any) => {
        if (!seatLayout || seatLayout.length === 0) return null;
        const maxSeats = Math.max(...seatLayout.map((row: any) => row.seats.length));
        const getSeatColor = (type: any) => {
            switch (type) {
                case "VIP":
                    return "bg-yellow-500";
                case "Couple":
                    return "bg-red-500";
                default:
                    return "bg-blue-500";
            }
        };

        return (
            <div className="w-[400px] max-h-[150px] overflow-auto">
                <div className="flex min-w-max">
                    <div className="w-12 h-8"></div>
                    {Array.from({ length: maxSeats }, (_, index) => (
                        <div key={index} className="w-12 h-8 flex justify-center items-center font-bold">
                            {index + 1}
                        </div>
                    ))}
                </div>
                {seatLayout.map((row: any, rowIndex: any) => (
                    <div key={rowIndex} className="flex items-center min-w-max">
                        <div className="w-12 h-8 flex justify-center items-center font-bold">{row.row}</div>
                        {row.seats.map((seat: any, seatIndex: any) => (
                            <div
                                key={seatIndex}
                                className={`w-12 h-8 flex items-center justify-center text-white ${getSeatColor(seat.type)} m-1 rounded`}
                            >
                                {row.row}{seat.number}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );

    };



    const columns: any = [
        {
            title: "Tên rạp",
            dataIndex: "cinemaId",
            key: "cinemaId",
            render: (_: any, cinemaHall: any) => {
                return <span>{cinemaHall.cinemaId.name}</span>
            }
        },
        {
            title: "Tên phòng",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Loại màn hình",
            dataIndex: "screenType",
            key: "screenType"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_: any, cinemaHall: any) => {
                return <span>{cinemaHall.status === "active" ? "Hoạt động" : "Không hoạt động"}</span>
            }
        },
        {
            title: "Sơ đồ ghế",
            dataIndex: "seatLayout",
            key: "seatLayout",
            className: "w-[300px]",
            render: (_: any, cinemaHall: any) => {
                return (
                    <Card className="p-2">
                        {renderSeatLayout(cinemaHall.seatLayout)}
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
                    </Card>
                );

            }
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            align: "center",
            fixed: "right",
            className: "w-[130px]",
            render: (_: any, cinema: any) => {
                return (
                    <Space>
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xóa?"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => mutate(cinema._id)}
                        >
                            <DeleteOutlined style={{ fontSize: 20 }} />
                        </Popconfirm>
                        <Link to={`/admin/cinema-room/${cinema._id}`}>
                            <EditOutlined style={{ fontSize: 20 }} />
                        </Link>
                    </Space>
                );
            }
        }
    ];
    if (isLoading) return <IsLoading />

    return (
        <>
            {contextHolder}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Danh sách phòng chiếu</h1>
                <Link to="/admin/cinema-room/add" className="bg-blue-500 text-white p-2 rounded-md font-medium">Thêm</Link>
            </div>
            <Table columns={columns} dataSource={dataSources}
                pagination={{
                    current: currenPage,
                    pageSize: pageSize,
                    total: totalDocs,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                        setCurrentPage(page);
                        setPageSize(pageSize);
                    },
                    onShowSizeChange: (current, size) => {
                        setCurrentPage(current);
                        setPageSize(size);
                    }
                }}
            />;
        </>
    )


};

export default CinemaHall_List;
