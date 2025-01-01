import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });
export default mongoose.model("Genre", genreSchema);