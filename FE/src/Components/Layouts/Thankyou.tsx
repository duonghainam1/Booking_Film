import { Button, Result } from "antd"
import { Link } from "react-router-dom"

const Thankyou = () => {
    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <Result
                className="bg-white rounded-xl w-[800px]"
                status="success"
                title="Bạn đã thanh toán thành công!"
                subTitle="Chúng tôi sẽ gửi vé vào email của bạn"
                extra={[
                    <Link to="/">
                        <Button type="primary" key="console">
                            Trang chủ
                        </Button>
                    </Link>
                    ,
                    <Link to="/profile">
                        <Button key="buy">Thông tin vé</Button>,
                    </Link>
                ]}
            />
        </div>
    )
}

export default Thankyou