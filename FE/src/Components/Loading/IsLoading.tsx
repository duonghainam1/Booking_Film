import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"

const IsLoading = () => {
    return (
        <div className="flex justify-center items-center h-96">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
    )
}

export default IsLoading