import { Button, Result } from "antd"

const Thankyou = () => {
    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <Result
                className="bg-white rounded-xl w-[800px]"
                status="success"
                title="Bạn đã thanh toán thành công!"
                subTitle="Chúng tôi sẽ gửi vé vào email của bạn"
                extra={[
                    <Button type="primary" key="console">
                        Trang chủ
                    </Button>,
                    <Button key="buy">Thông tin vé</Button>,
                ]}
            />
        </div>
    )
}

export default Thankyou