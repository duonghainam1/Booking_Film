import moment from "moment";
import crypto from "crypto";
import qs from "qs";
import express from "express";
import Booking from "../../models/booking.js";
import nodemailer from "nodemailer";
import QRCode from "qrcode";
const app = express();
const tmnCode = "76Q18QBZ";
const secretKey = "CMFMW4TMIB2BSOILMO4FLWA1PILU718G";
const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const returnUrl = "http://localhost:3112/api/v1/return";

function sortObject(obj) {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    keys.forEach((key) => {
        sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
    });
    return sorted;
}

export const createPaymentUrl = async (req, res, next) => {
    const { userId, orderId, totalPrice, movieTitle, showTime, seats } = req.body;

    const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    const createDate = moment().format("YYYYMMDDHHmmss");
    const currCode = "VND";

    let vnp_Params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `${orderId}`,
        vnp_OrderType: "other",
        vnp_Amount: totalPrice * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
    };


    vnp_Params = sortObject(vnp_Params);

    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnp_Params["vnp_SecureHash"] = signed;
    const paymentUrl = `${vnpUrl}?${qs.stringify(vnp_Params, { encode: false })}`;
    const newBooking = new Booking({
        userId,
        orderNumber: orderId,
        movieTitle,
        showTime,
        seats,
        totalPrice,
        status: "pending",
        paymentMethod: "VNPAY",
        paymentStatus: "pending",
    });
    await newBooking.save();
    res.json({ paymentUrl });
}

export const returnUrll = async (req, res) => {
    let vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = sortObject(vnp_Params);
    const signData = qs.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        if (vnp_Params.vnp_ResponseCode === "00") {
            const { vnp_TransactionNo, vnp_TxnRef } = vnp_Params;
            const booking = await Booking.findOne({ orderNumber: vnp_TxnRef }).populate("userId");

            if (booking) {
                booking.paymentStatus = "paid";
                booking.vnpayTransactionId = vnp_TransactionNo;
                booking.vnpayResponseCode = vnp_Params.vnp_ResponseCode;
                booking.status = "completed";

                await booking.save();

                const qrCodeData = `Mã đơn: ${booking.orderNumber} - Ghế: ${booking.seats.map(s => `${s.row}${s.seatNumber}`).join(", ")}`;
                const qrCodeUrl = await QRCode.toDataURL(qrCodeData);
                console.log("dsdsdasdas", qrCodeUrl);

                await sendConfirmationEmail(booking, qrCodeUrl);

                return res.redirect("http://localhost:2024/thankyou");
            } else {
                return res.redirect("http://localhost:2024/that_bai?error=not_found");
            }
        } else {
            return res.redirect("http://localhost:2024/that_bai?error=payment_failed");
        }
    } else {
        return res.redirect("http://localhost:2024/that_bai?error=invalid_signature");
    }
};

// Hàm gửi email
const sendConfirmationEmail = async (booking, qrCodeUrl) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "namdhph33318@fpt.edu.vn",
            pass: "f m e d r h o c l n k h f a c h",
        },
    });

    const seatDetails = booking.seats.map(s => `Ghế: ${s.row}${s.seatNumber}, Giá: ${s.price.toLocaleString()} VND`).join("<br>");
    const emailHTML = `
        <h2>Thông tin vé xem phim</h2>
        <p><strong>Phim:</strong> ${booking.movieTitle}</p>
        <p><strong>Suất chiếu:</strong> ${new Date(booking.showTime[0].start_time).toLocaleString()}</p>
        <p><strong>Phòng chiếu:</strong> ${booking.showTime[0].cinemaHall}</p>
        <p><strong>Ghế:</strong> <br> ${seatDetails}</p>
        <p><strong>Tổng tiền:</strong> ${booking.totalPrice.toLocaleString()} VND</p>
        <p><strong>Trạng thái:</strong> Đã thanh toán</p>
        <h3>Quét mã QR để vào rạp</h3>
        <img src="cid:qrcode" alt="QR Code" width="200"/>
    `;

    await transporter.sendMail({
        from: "namdhph33318@fpt.edu.vn",
        to: booking.userId.email,
        subject: "Xác nhận đặt vé xem phim",
        html: emailHTML,
        attachments: [
            {
                filename: "qrcode.png",
                content: qrCodeUrl.split(";base64,").pop(),
                encoding: "base64",
                cid: "qrcode",
            },
        ],
    });
};

