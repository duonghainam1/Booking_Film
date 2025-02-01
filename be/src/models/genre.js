import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true, versionKey: false });
genreSchema.plugin(mongoosePaginate);
export default mongoose.model("Genre", genreSchema);