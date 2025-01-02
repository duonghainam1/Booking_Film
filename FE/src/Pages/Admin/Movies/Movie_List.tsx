import { Popconfirm, Space, Table } from "antd";
import { useMovies } from "../../../Common/Hook/Movies/useMovies";
import { Link, useSearchParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import IsLoading from "../../../Components/Loading/IsLoading";
import { useMutation_Movie } from "../../../Common/Hook/Movies/useMutation_Movie";
import { useEffect, useState } from "react";

const Movie_List = () => {
    const { mutate, contextHolder } = useMutation_Movie("DELETE")
    const [searchParmas, setSearchParams] = useSearchParams()
    const currentPageUrl = searchParmas.get('page') ? Number(searchParmas.get('page')) : 1;
    const pageSizeUrl = searchParmas.get('pageSize') ? Number(searchParmas.get('pageSize')) : 10;
    const [currenPage, setCurrentPage] = useState(currentPageUrl);
    const [pageSize, setPageSize] = useState(pageSizeUrl);
    const { data, isLoading, totalDocs } = useMovies(undefined, currenPage, pageSize, '')
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
            title: 'Ảnh',
            dataIndex: 'poster',
            key: 'poster',
            render: (_: any, movie: any) => {
                return (
                    <img src={movie?.poster} alt={movie?.title} style={{ width: 50, height: 50 }} />
                )
            }
        },
        {
            title: 'Tên Phim',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thể loại',
            dataIndex: 'genre',
            key: 'genre',
            render: (_: any, movie: any) => {
                return (
                    <p>{movie?.genres?.name}</p>
                )
            }

        },
        {
            title: 'Thời gian',
            dataIndex: 'duration',
            key: 'duration',
            render: (_: any, movie: any) => {
                return (
                    <p>{movie?.duration} phút</p>
                )
            }
        },
        {
            title: 'Ngày phát hành',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            render: (_: any, movie: any) => {
                return (
                    <p>{new Date(movie?.releaseDate).toLocaleDateString()}</p>
                )
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            fixed: 'right',
            className: 'w-[130px]',
            render: (_: any, movie: any) => {
                return (
                    <Space>
                        <Popconfirm title="Bạn có chắc chắn muốn xóa?"
                            okText="Có"
                            cancelText="Không"
                            onConfirm={() => mutate(movie._id)}>
                            <DeleteOutlined style={{ fontSize: 20 }} />
                        </Popconfirm>
                        <Link to={`/admin/movie/${movie._id}`}>
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
                <h1 className="text-2xl font-bold">Danh sách phim</h1>
                <Link to="/admin/movie/add" className="bg-blue-500 text-white p-2 rounded-md font-medium">Thêm</Link>
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

export default Movie_List