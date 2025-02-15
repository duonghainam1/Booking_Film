import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const cinemaHallSchema = new mongoose.Schema({
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    // capacity: { type: Number, required: true },
    screenType: {
        type: String,
        enum: ["2D", "3D", "IMAX", "4DX"],
        required: true
    },
    seatLayout: [
        {
            row: { type: String, required: true },
            seats: [{
                number: { type: Number, required: true },
                type: { type: String, required: true },
                price: { type: Number }, // Thêm trường giá tiền
                isBooked: { type: Boolean, default: false }, // Trạng thái ghế
            }]
        }
    ],

    status: {
        type: String,
        enum: ["active", "maintenance", "closed", "selected"],
        default: "active"
    },
}, { timestamps: true, versionKey: false });
cinemaHallSchema.plugin(mongoosePaginate);
export default mongoose.model("CinemaHall", cinemaHallSchema);