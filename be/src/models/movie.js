import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const movieChema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    actors: {
        type: [String],
        required: true,
    },
    genres: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    trailer_url: {
        type: String
    },
    status: {
        type: String,
        enum: ['Đang chiếu', 'Sắp chiếu', 'Ngừng chiếu'],
        default: 'Sắp chiếu'
    },
    country: {
        type: String,
        required: true,
    },

}, { timestamps: true, versionKey: false });
movieChema.plugin(mongoosePaginate);
export default mongoose.model('Movie', movieChema);