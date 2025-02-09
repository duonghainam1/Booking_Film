import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const showTimeSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    cinemaHallId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CinemaHall",
        required: true,
    },
    dates: [{
        date: {
            type: Date,
            required: true,
        },
        showtimes: [{
            start_time: {
                type: Date,
                required: true,
            },
            end_time: {
                type: Date,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            status: {
                type: String,
                enum: ["scheduled", "ongoing", "completed", "canceled"],
                default: "scheduled",
            }
        }]
    }]
}, { timestamps: true, versionKey: false });

showTimeSchema.plugin(mongoosePaginate);
export default mongoose.model("ShowTime", showTimeSchema);
