import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Seat = ({ data, onBack, dataMovie }: any) => {

    const [selectedSeats, setSelectedSeats] = useState<{ row: string, seatNumber: number, price: number }[]>([]);
    const navigate = useNavigate();

    const getSeatColor = (type: string, isSelected: boolean, isBooked: boolean) => {
        if (isBooked) return "bg-gray-400 text-black";
        if (isSelected) return "bg-slate-500";
        switch (type) {
            case "VIP":
                return "bg-yellow-500";
            case "Couple":
                return "bg-red-500";
            default:
                return "bg-blue-500";
        }
    };

    const handleSeatClick = (row: string, seatNumber: number, isBooked: boolean, price: number) => {
        if (isBooked) return;

        setSelectedSeats((prev) =>
            prev.some((seat) => seat.row === row && seat.seatNumber === seatNumber)
                ? prev.filter((seat) => seat.row !== row || seat.seatNumber !== seatNumber)
                : [...prev, { row, seatNumber, price }]
        );
    };

    const totalPrice = selectedSeats.reduce((total, seat) => total + seat.price, 0);

    const handlePayment = () => {
        if (selectedSeats.length === 0) {
            message.warning("Vui lòng chọn ghế trước khi thanh toán");
            return;
        }
        const paymentData = {
            movie: {
                movieId: dataMovie?.movie?._id,
                showtimeId: dataMovie?.showtimes.map((item: any) => item._id),
                title: dataMovie?.movie?.title,
                poster: dataMovie?.movie?.poster,
                startTime: data?.start_time,
                cinemaHall: data?.cinemaHallId?.name,
            },
            selectedSeats,
            totalPrice,
        };
        navigate("/payment", { state: paymentData });
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                <button>
                    Giờ chiếu: <span className="font-medium text-lg">{new Date(data.start_time).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</span>
                </button>
                <button className="border p-2 rounded-lg w-[200px]">Thời gian chọn ghế: 10:00</button>
            </div>

            <div>
                <h1 className="text-center">{data?.cinemaHallId?.name}</h1>
                <div className="mt-6">
                    {data?.cinemaHallId?.seatLayout?.map((row: any, rowIndex: number) => {
                        const rowLetter = String.fromCharCode(65 + rowIndex);
                        return (
                            <div key={rowIndex} className="flex justify-center gap-4 mb-4">
                                {row.seats.map((seat: any, seatIndex: number) => {
                                    const isSelected = selectedSeats.some((s) => s.row === rowLetter && s.seatNumber === seat.number);
                                    const isBooked = seat.isBooked;

                                    return (
                                        <div
                                            key={seatIndex}
                                            className={`w-[40px] h-[40px] rounded-lg flex justify-center items-center text-white font-semibold cursor-pointer ${getSeatColor(seat.type, isSelected, isBooked)}`}
                                            onClick={() => handleSeatClick(rowLetter, seat.number, isBooked, seat.price)}
                                        >
                                            {isBooked ? "X" : `${rowLetter}${seat.number}`}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-8 mt-6">
                    <div className="flex items-center gap-4">
                        <span className="border w-[40px] h-[40px] rounded-lg flex justify-center items-center">X</span>
                        <span>Đã đặt</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-[40px] h-[40px] rounded-lg flex justify-center items-center bg-slate-500"></span>
                        <span>Đã chọn</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-[40px] h-[40px] rounded-lg flex justify-center items-center bg-blue-500"></span>
                        <span>Thường</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-[40px] h-[40px] rounded-lg flex justify-center items-center bg-yellow-500"></span>
                        <span>Vip</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-[40px] h-[40px] rounded-lg flex justify-center items-center bg-red-500"></span>
                        <span>Đôi</span>
                    </div>
                </div>
            </div>

            {/* Chọn ghế và thanh toán */}
            <div className="flex items-center justify-between gap-4 py-6">
                <div>
                    <p>Ghế đã chọn: {selectedSeats.map(seat => `${seat.row}${seat.seatNumber}`).join(", ") || "Chưa chọn"}</p>
                    <p>Tổng tiền: {totalPrice.toLocaleString()} VND</p>
                </div>
                <div className="flex gap-4">
                    <button
                        className="px-8 p-2 rounded-full text-white font-medium bg-gradient-to-tr from-[#6387FF] to-[#FF4747]"
                        onClick={onBack}
                    >
                        Quay lại
                    </button>
                    <button onClick={handlePayment} className="px-8 p-2 rounded-full text-white font-medium bg-gradient-to-tr from-[#FF4747] to-[#6387FF]">
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Seat;
