import { Popconfirm, Space, Table } from "antd";
import { Link, useSearchParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useEffect, useState } from "react";
import { useCinema } from "../../../Common/Hook/Cenima/useCinema";
import { useMutation_Cinema } from "../../../Common/Hook/Cenima/useMutation_Cinema";

const Cinema_List = () => {
    const { mutate, contextHolder } = useMutation_Cinema("DELETE")
    const [searchParmas, setSearchParams] = useSearchParams()
    const currentPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const [currenPage, setCurrentPage] = useState(currentPageUrl);
    const [pageSize, setPageSize] = useState(pageSizeUrl);
    const { data, isLoading, totalDocs } = useCinema(undefined, currenPage, pageSize, '')
    console.log(data);

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
            title: 'Tên hòng chiếu',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'location',
            key: 'location',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Thời gian mở cửa',
            dataIndex: 'opening_hours',
            key: 'opening_hours',

        },
        // {
        //     title: 'Số lượng chỗ ngồi',
        //     dataIndex: 'total_seats',
        //     key: 'total_seats',
        // },
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
    const dataSource = data?.docs?.map((cinema: any) => {
        return {
            key: cinema._id,
            ...cinema
        }
    })
    if (isLoading) return <IsLoading />


    return (
        <div>
            {contextHolder}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Danh sách phim</h1>
                <Link to="/admin/cinema/add" className="bg-blue-500 text-white p-2 rounded-md font-medium">Thêm</Link>
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

export default Cinema_List