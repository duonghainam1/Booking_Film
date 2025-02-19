import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons"
import { Card, Col, Row, Statistic, Table } from "antd"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useDashboard, useDashboard_Day, useDashboard_Movies } from "../../../Common/Hook/Dashboard/useDashboard"

const Dashboard = () => {
    const { data } = useDashboard()
    const revenueData = data?.map((item: any) => ({
        name: item.month,
        revenue: item.totalRevenue
    }))
    const { data: day } = useDashboard_Day()
    const currenDate = new Date().toISOString().split('T')[0];
    const totalRevenue = day?.revenueByDay?.[currenDate] || { total: 0, totalOrder: 0 };
    const formattedRevenue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(totalRevenue.total);

    const { data: movies } = useDashboard_Movies()
    const dataSource = movies?.revenueByMovie
        ? Object.entries(movies.revenueByMovie).map(([movieTitle, data]: any) => ({
            key: movieTitle,
            movieTitle,
            totalRevenue: data.totalRevenue,
            totalBookings: data.totalBookings,
        }))
        : [];
    const columns = [
        {
            title: "Tên phim",
            dataIndex: "movieTitle",
            key: "movieTitle",
        },
        {
            title: "Doanh thu",
            dataIndex: "totalRevenue",
            key: "totalRevenue",
            render: (value: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value),
        },
        {
            title: "Số lượng vé",
            dataIndex: "totalBookings",
            key: "totalBookings",
        }
    ];
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Doang thu theo ngày"
                            value={formattedRevenue}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Doanh thu theo phim"
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
            <div className="mt-8">
                <h1 className="font-bold text-xl mb-8">Biểu đồ doanh thu</h1>
                <div className="w-full">
                    <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 250 : 400}>
                        <LineChart
                            data={revenueData}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="mt-8">
                <h1 className="font-bold text-xl mb-8">Thống kê doanh thu theo phim</h1>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ pageSize: 5 }} // Hiển thị 5 phim mỗi trang
                />
            </div>
        </div>
    )
}

export default Dashboard