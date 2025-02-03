import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const showTimeSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    cinemaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cinema",
        required: true,
    },
    show_time: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    screen_type: {
        type: String,

    },
    available_seats: {
        type: Number,
        required: true,
    },
    language: { type: String },

}, { timestamps: true, versionKey: false });
showTimeSchema.plugin(mongoosePaginate);
export default mongoose.model("ShowTime", showTimeSchema);