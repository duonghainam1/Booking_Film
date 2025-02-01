import Item from "../../../Components/Item/Item"

const Is_showing = () => {
    return (
        <div>
            <div className="flex justify-between my-4">
                <div className="flex items-center  gap-4">
                    <span className="bg-red-500 w-5 h-5 rounded-full"></span>
                    <h1 className="text-2xl font-medium">Phim đang chiếu</h1>
                </div>
                <p>Xem tất cả</p>
            </div>

            <Item status="Showing" />

        </div>
    )
}

export default Is_showing