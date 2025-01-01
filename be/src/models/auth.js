import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    avatar: {
        type: String,
    },
    phone_number: {
        type: String,
    },
    address: {
        type: String,
    },
}, { timestamps: true, versionKey: false });
export default mongoose.model("Auth", authSchema);