import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true,
        maxlenght: 60,
    },
    address: {
        type: String,
        required: true,
        maxlenght: 200,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    },
    method: {
        type: Number,
        required: true,
    },
    
},{timestamps: true});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);