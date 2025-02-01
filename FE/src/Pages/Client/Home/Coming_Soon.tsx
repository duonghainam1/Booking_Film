import Item from "../../../Components/Item/Item"

const Coming_Soon = () => {
    return (
        <div>
            <div className="flex justify-between my-4">
                <div className="flex items-center  gap-4">
                    <span className="bg-red-500 w-5 h-5 rounded-full"></span>
                    <h1 className="text-2xl font-medium">Phim sắp chiếu</h1>
                </div>
                <p>Xem tất cả</p>
            </div>
            <Item status="Coming_soon" />

        </div>
    )
}

export default Coming_Soon