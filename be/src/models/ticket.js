import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
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
    seat_number: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymen_status: {
        type: String,
        enmu: ["paid", "unpaid"],
        default: "unpaid",
    },
    purchase_date: {
        type: Date,
        default: Date.now
    },
    ticket_code: {
        type: String,
        unique: true
    },

}, { timestamps: true, versionKey: false });
export default mongoose.model("Ticket", ticketSchema);