import { Popconfirm, Space, Table, Tag } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useEffect, useState } from "react";
import { useMutation_Cinema } from "../../../Common/Hook/Cenima/useMutation_Cinema";
import { useBooking } from "../../../Common/Hook/Booking/useBooking";

const Booking_List = () => {
    const { mutate, contextHolder } = useMutation_Cinema("DELETE")
    const [searchParmas, setSearchParams] = useSearchParams()
    const currentPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const [currenPage, setCurrentPage] = useState(currentPageUrl);
    const [pageSize, setPageSize] = useState(pageSizeUrl);
    const { data, isLoading, totalDocs } = useBooking(undefined, currenPage, pageSize, '')
    // data.docs.map((cinema: any) => {
    //     console.log(cinema);

    // })

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
    const columns: any = [
        {
            title: 'Tên người dùng',
            dataIndex: 'userId',
            key: 'userId',
            render: (_: any, booking: any) => {
                return (
                    <p>{booking?.userId?.username}</p>
                )
            }
        },
        {
            title: 'Thời gian chiếu',
            dataIndex: 'showTimeId',
            key: 'showTimeId',
            render: (_: any, booking: any) => (
                booking?.showTime.map((showTime: any) => {
                    return (
                        <div className="flex gap-2">
                            <Tag>{new Date(showTime?.start_time).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</Tag> - <Tag>{new Date(showTime?.start_time).toLocaleDateString()}</Tag>

                        </div>)
                })
            )

        },
        {
            title: 'Tên phim',
            dataIndex: 'movieTitle',
            key: 'movieTitle',
        },
        {
            title: 'Số ghế',
            dataIndex: 'seats',
            key: 'seats',
            render: (_: any, booking: any) => {
                return (
                    booking.seats.map((seat: any) => seat?.row + seat?.seatNumber).join(', ')
                )
            }
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',

        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, booking: any) => {
                return (
                    booking.status === 'pending' ? <Tag color="blue">Đang chờ</Tag> : booking.status === 'completed' ? <Tag color="green">Đã xác nhận</Tag> : <Tag color="red">Đã Hủy</Tag>
                )
            }
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            className: 'w-[130px]',
            render: (_: any, cinema: any) => {
                return (
                    <Space>
                        <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => mutate(cinema._id)}>
                            <DeleteOutlined style={{ fontSize: 20 }} />
                        </Popconfirm>
                        <Link to={`/admin/cinema/${cinema._id}`}>
                            <EditOutlined style={{ fontSize: 20 }} />
                        </Link>
                    </Space>
                )
            }
        },
    ]
    const dataSource = data?.docs?.map((booking: any) => {
        return {
            key: booking._id,
            ...booking
        }
    })
    if (isLoading) return <IsLoading />


    return (
        <div>
            {contextHolder}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Danh sách đơn hàng</h1>
                {/* <Link to="/admin/cinema/add" className="bg-blue-500 text-white p-2 rounded-md font-medium">Thêm</Link> */}
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={{
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
            }} />
        </div>
    )
}

export default Booking_List