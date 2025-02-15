import { useBookingUserId } from "../../../../Common/Hook/Booking/useBooking";
import { useLocalStorage } from "../../../../Common/Hook/useStorage";
import IsLoading from "../../../../Components/Loading/IsLoading";

const Ticket = () => {
    const [user,] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;

    const { data } = useBookingUserId(userId);
    data?.map((item: any) => (
        console.log(item)
    ))
    if (!data) {
        return <IsLoading />

    }

    return (

        <div className="container mx-auto my-8">
            <div className="overflow-hidden rounded-lg border border-gray-600">
                <table className="w-full border-collapse text-white">
                    <thead>
                        <tr className="bg-[#020817] text-white text-lg">
                            <th className="px-6 py-3 border-b border-gray-600">Tên Phim</th>
                            <th className="px-6 py-3 border-b border-gray-600">Ngày chiếu</th>
                            <th className="px-6 py-3 border-b border-gray-600">Giờ chiếu</th>
                            <th className="px-6 py-3 border-b border-gray-600">Phòng chiếu</th>
                            <th className="px-6 py-3 border-b border-gray-600">Ghế</th>
                            <th className="px-6 py-3 border-b border-gray-600">Trạng thái</th>
                            <th className="px-6 py-3 border-b border-gray-600">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item: any) => (
                            <tr className="hover:bg-gray-800 text-center text-base">
                                <td className="px-6 py-4 border-b border-gray-600">{item?.movieTitle}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{item?.showTime?.map((date: any) => (
                                    <p>{new Date(date?.start_time).toLocaleDateString()}</p>
                                ))}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{item?.showTime?.map((date: any) => (
                                    <p>{new Date(date?.start_time).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</p>
                                ))}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{item?.showTime?.map((date: any) => (
                                    <p>{date?.cinemaHall}</p>
                                ))}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{item?.seats?.map((seat: any) => seat?.row + seat?.seatNumber).join(", ")}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{item?.status === "completed" ? "Đã thanh toán" : item?.status === "pending" ? "Chưa thanh toán" : "Đã hủy"}</td>
                                <td className="px-6 py-4 border-b border-gray-600">{item?.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default Ticket