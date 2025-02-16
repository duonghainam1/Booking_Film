import { Input, Popconfirm, Space, Table, Tag } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useEffect, useState } from "react";
import { useShow_time } from "../../../Common/Hook/Show_Time/useShow_time";
import { useMutation_Show_Time } from "../../../Common/Hook/Show_Time/useMutation_Show_Time";
const { Search } = Input;
const Show_Time_List = () => {
    const { mutate, contextHolder } = useMutation_Show_Time("DELETE")
    const [searchParmas, setSearchParams] = useSearchParams()
    const currentPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const searchUrl = searchParmas.get('search') || "";

    const [currenPage, setCurrentPage] = useState(currentPageUrl);
    const [pageSize, setPageSize] = useState(pageSizeUrl);
    const [search, setSearch] = useState(searchUrl);

    const { data, isLoading, totalDocs } = useShow_time(undefined, currenPage, pageSize, search)

    useEffect(() => {
        const params: any = {}
        if (currenPage !== 1) {
            params['page'] = currenPage;
        }
        if (pageSize !== 4) {
            params['pageSize'] = pageSize;
        }
        if (search) params['search'] = search;

        setSearchParams(params)
    }, [
        currenPage,
        pageSize,
        search,
        setSearchParams
    ])
    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };
    const columns: any = [
        {
            title: 'Tên Phim',
            dataIndex: 'movieId',
            key: 'movieId',
            render: (_: any, show_time: any) => {

                return (
                    <p>{show_time?.movieId?.title}</p>
                )
            }
        },
        // {
        //     title: 'Tên Phòng chiếu + Rạp',
        //     dataIndex: 'cinemaHallId',
        //     key: 'cinemaHallId',
        //     render: (_: any, show_time: any) => {
        //         return (
        //             <p>{show_time.cinemaHallId?.name} - {show_time?.cinemaHallId?.cinemaId?.name}</p>
        //         )
        //     }
        // },
        {
            title: 'Ngày chiếu',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (_: any, show_time: any) => {
                return (
                    <div>
                        {show_time.dates.map((date: any, index: number) => {
                            const dateObj = new Date(date.date);
                            return (
                                <div key={index}>
                                    <p><strong>{dateObj.toLocaleDateString('vi-VN')}</strong></p>
                                    {date.showtimes.map((show: any, showIndex: number) => {
                                        const startTime = new Date(show.start_time).toLocaleTimeString('vi-VN');
                                        // const endTime = new Date(show.end_time).toLocaleTimeString('vi-VN');

                                        return (
                                            <div key={showIndex} className="space-x-1 space-y-2">
                                                <Tag>{startTime}</Tag>
                                                {/* <p>Giá: {show.price} VND</p> */}
                                                <Tag>
                                                    {show.status === "scheduled"
                                                        ? "Sắp chiếu"
                                                        : show.status === "ongoing"
                                                            ? "Đang chiếu"
                                                            : show.status === "completed"
                                                                ? "Kết thúc"
                                                                : show.status === "canceled"
                                                                    ? "Đã hủy"
                                                                    : ""}
                                                </Tag>
                                                <Tag>{show?.cinemaHallId?.name} - {show?.cinemaHallId?.cinemaId?.name}</Tag>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                );
            }
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            className: 'w-[130px]',
            render: (_: any, show_time: any) => {
                return (
                    <Space>
                        <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => mutate(show_time._id)}>
                            <DeleteOutlined style={{ fontSize: 20 }} />
                        </Popconfirm>
                        <Link to={`/admin/show_time/${show_time._id}`}>
                            <EditOutlined style={{ fontSize: 20 }} />
                        </Link>
                    </Space>
                )
            }
        },
    ]
    const dataSource = data?.docs?.map((movie: any) => {
        return {
            key: movie._id,
            ...movie
        }
    })
    if (isLoading) return <IsLoading />


    return (
        <div>
            {contextHolder}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Danh sách lịch chiếu</h1>
                <div className="flex items-center gap-4">
                    <Search placeholder="Tìm kiếm phim" allowClear style={{ width: 400 }} onSearch={handleSearch} defaultValue={search} />
                    <Link to="/admin/show_time/add" className="bg-blue-500 text-white p-2 rounded-md font-medium">Thêm</Link>

                </div>
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

export default Show_Time_List