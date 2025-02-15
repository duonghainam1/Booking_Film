import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { message, Radio } from "antd";
import { nanoid } from "nanoid";

import vietQr from "../../../assets/img/VietQR.png"
import { useLocalStorage } from "../../../Common/Hook/useStorage";
// import { useMutation_Booking } from "../../../Common/Hook/Booking/useMutation_Booking";
import instance from "../../../Configs/config_axios";
const Payment = () => {
    const [user,] = useLocalStorage("user", {});
    const userId = user?.data?.user?._id;
    const location = useLocation();
    const paymentData = location.state;
    // const { mutate } = useMutation_Booking("ADD");
    const [paymentMethod, setPaymentMethod] = useState('');

    const handlePaymentMethodChange = (method: any) => {
        setPaymentMethod(method);
    };
    const handlePayment = async () => {
        if (!paymentMethod) {
            message.warning("Vui lòng chọn phương thức thanh toán");
            return;
        }
        if (paymentMethod === 'VNPAY') {
            try {
                const response = await instance.post('/createPayment', {
                    userId: userId,
                    orderId: nanoid(24),
                    showTime: [{
                        start_time: paymentData?.movie?.startTime,
                        cinemaHall: paymentData?.movie?.cinemaHall,
                    }],
                    movieTitle: paymentData?.movie?.title,
                    seats: paymentData?.selectedSeats.map((seat: any) => ({
                        row: seat.row,
                        seatNumber: seat.seatNumber,
                        price: seat.price || 0,
                    })),
                    totalPrice: paymentData?.totalPrice,
                    paymentMethod: paymentMethod,
                });
                if (response.data.paymentUrl) {
                    window.location.href = response.data.paymentUrl;
                }
            } catch (error) {
                message.error("Có lỗi xảy ra. Vui lòng thử lại.");
            }
        } else {
        }
    };

    return (
        <div className="container mx-auto flex justify-between gap-8">
            <div className="w-[70%]">
                <div className="rounded-xl bg-[#080A0D] px-8 py-4 *:my-4">
                    <h1 className="font-bold text-xl">Thông tin phim</h1>
                    <div className="flex justify-between gap-4">
                        <div className="w-[70%] *:py-3">
                            <div>
                                <p>Phim</p>
                                <h2 className="font-bold text-xl">{paymentData?.movie?.title}</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p>Ngày giờ chiếu</p>
                                    <h2 className="font-bold"><span className="text-red-500 font-medium mr-4">{new Date(paymentData?.movie?.startTime)?.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</span>{new Date(paymentData?.movie.startTime).toLocaleDateString()}</h2>
                                </div>
                                <div>
                                    <p>Ghế</p>
                                    <p>{paymentData?.selectedSeats?.map((seat: any) => seat?.row + seat?.seatNumber).join(', ')}</p>

                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p>Định dạng</p>
                                    <span className="font-bold">2D</span>
                                </div>
                                <div>
                                    <p>Phòng chiếu</p>
                                    <span className="font-bold">{paymentData?.movie?.cinemaHall}</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-[28%]">
                            <img src={paymentData?.movie?.poster} alt="" className="h-[200px] w-[150px] rounded-xl" />
                        </div>
                    </div>
                </div>
                <div className="rounded-xl bg-[#080A0D] px-8 py-4 *:my-4 my-6">
                    <h1 className="font-bold text-xl">Thông tin thanh toán</h1>
                    <div>
                        <table className="w-full *:border  *:border-slate-500 *:text-left *:font-bold *:rounded-full">
                            <thead>
                                <tr className="*:py-4 *:px-2">
                                    <th>Ghế</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className="*:py-4 *:px-2">
                                    <td>Ghế ({paymentData?.selectedSeats?.map((seat: any) => seat?.row + seat?.seatNumber).join(', ')})</td>
                                    <td>{paymentData?.selectedSeats?.length}</td>
                                    <td>{paymentData?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="w-[30%] mb-8 rounded-xl bg-[#080A0D] px-8 py-4">
                <h1 className="font-bold text-xl">Phương thức thanh toán</h1>
                <div>
                    <div
                        className="my-4 rounded-xl bg-[#080A0D] px-8 py-4 flex items-center"
                        onClick={() => handlePaymentMethodChange('VNPAY')}

                    >

                        <Radio checked={paymentMethod === 'VNPAY'}
                            onChange={() => handlePaymentMethodChange('VNPAY')} />
                        <span className="ml-4 font-bold">Thanh toán VNPAY</span>
                    </div>
                    <div
                        className="my-4 rounded-xl bg-[#080A0D] px-8 py-4 flex items-center"
                        onClick={() => handlePaymentMethodChange('VietQR')}
                    >
                        <Radio checked={paymentMethod === 'VietQR'}
                            onChange={() => handlePaymentMethodChange('VietQR')} />
                        <span className="ml-4 font-bold">Thanh toán VietQR</span>
                    </div>
                </div>

                {paymentMethod === 'VietQR' && (
                    <div className="my-4">
                        <img
                            src={vietQr}
                            alt="VietQR QR Code"
                            className="w-[150px] h-[150px] mx-auto rounded-xl"
                        />
                    </div>
                )}

                <div>
                    <h1 className="font-bold text-xl">Chi phí</h1>
                    <div className="flex justify-between gap-4 mt-4">
                        <div>
                            <p>Thanh toán</p>
                            <p>Phí</p>
                            <p>Tổng cộng</p>
                        </div>
                        <div>
                            <p>{paymentData?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            <p>0</p>
                            <p>{paymentData?.totalPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button onClick={handlePayment} className="w-full bg-gradient-to-tr from-[#6387FF] to-[#FF4747] text-white font-bold rounded-full py-2 mt-4">Thanh toán</button>
                    <Link to="/ticket">
                        <button className="w-full bg-gradient-to-tr from-[#FF4747] to-[#6387FF] text-white font-bold rounded-full py-2 mt-4">Quay lại</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Payment