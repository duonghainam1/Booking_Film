import mongoose from "mongoose"


const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
    showTimeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShowTime",
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    seats: [
        {
            row: String,
            seatNumber: Number,
            price: Number,
        },
    ],
    totalPrice: {
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
}, { timestamps: true, versionKey: false });

export default mongoose.model("Booking", bookingSchema);