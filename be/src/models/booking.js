import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
    orderNumber: {
        type: String,
    },
    showTime: [
        {
            start_time: {
                type: Date,
                required: true,
            },
            cinemaHall: {
                type: String,
                required: true,
            }
        }
    ],
    movieTitle: {
        type: String,
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
        enum: ["cash", "VNPAY", "VietQR"],
        default: "cash",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    qrCodeUrl: {
        type: String,
    },
    vnpayTransactionId: {
        type: String,
    },
    vnpayResponseCode: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
bookingSchema.pre('save', function (next) {
    if (!this.isModified('orderNumber')) {
        const timestamp = new Date().getTime();
        const random = Math.floor(1000 + Math.random() * 9000);
        this.orderNumber = `ORD-${timestamp}-${random}`;
    }
    next();
});
bookingSchema.plugin(mongoosePaginate);
export default mongoose.model("Booking", bookingSchema);