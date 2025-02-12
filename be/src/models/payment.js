import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "canceled"],
        default: "pending",
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "VNPAY"],
        default: "cash",
    },
    transaccionId: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
export default mongoose.model("Payment", PaymentSchema);