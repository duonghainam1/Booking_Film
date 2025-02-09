import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import cinemaHall from "./cinemaHall";
const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },

    // total_seats: {
    //     type: Number,
    //     required: true,
    // },
    phone_number: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    opening_hours: {
        type: String,
        required: true,
    },

}, { timestamps: true, versionKey: false });
cinemaSchema.plugin(mongoosePaginate);
export default mongoose.model("Cinema", cinemaSchema);