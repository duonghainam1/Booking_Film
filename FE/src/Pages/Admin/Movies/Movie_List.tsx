import { Popconfirm, Space, Table } from "antd";
import { useMovies } from "../../../Common/Hook/Movies/useMovies";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Movie_List = () => {
    const { data, isLoading } = useMovies()
    const columns: any = [
        {
            title: 'Ảnh',
            dataIndex: 'poster',
            key: 'poster',
            render: (_: any, movie: any) => {
                console.log("movie", movie);

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
            render: (_: any, movie: any) => {
                return (
                    <Space>
                        <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => console.log("Xóa")}>
                            <DeleteOutlined />
                        </Popconfirm>
                        <Link to={`/admin/movie/${movie._id}`}>
                            <EditOutlined />
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
    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    )
}

export default Movie_List