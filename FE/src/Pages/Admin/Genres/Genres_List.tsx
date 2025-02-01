import { Button, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useGenres } from "../../../Common/Hook/Genrers/useGenres";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation_Genres } from "../../../Common/Hook/Genrers/useMutation_Genres";

const Genres_List = () => {
    const [searchParmas, setSearchParams] = useSearchParams()
    const currentPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const [currenPage, setCurrentPage] = useState(currentPageUrl);
    const [pageSize, setPageSize] = useState(pageSizeUrl);
    const { data, isLoading, totalDocs } = useGenres(undefined, currenPage, pageSize, '')
    const { mutate, contextHolder } = useMutation_Genres("DELETE")
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
            title: 'Tên thể loại',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            className: 'w-[230px]',
            render: (_: any, genre: any) => {
                return (
                    <Space>
                        <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => mutate(genre._id)} >
                            <DeleteOutlined style={{ fontSize: 20 }} />
                        </Popconfirm>
                        <Link to={`/admin/genres/${genre._id}`}>
                            <EditOutlined style={{ fontSize: 20 }} />
                        </Link>
                    </Space>
                )
            }

        }
    ]


    const dataSource = data?.docs?.map((genre: any) => ({
        ...genre,
        key: genre._id
    }))
    if (isLoading) return <IsLoading />
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between my-4">
                <h1 className=" text-lg lg:text-2xl font-bold">Danh sách thể loại</h1>
                <Link to="/admin/genres/add" className="flex items-center gap-2">
                    <Button type="primary">Thêm</Button>
                </Link>
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
        </>
    )
}

export default Genres_List