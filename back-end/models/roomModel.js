import mongoose from "mongoose";

const collection = "Rooms"

const roomSchema = mongoose.Schema({
    roomNumber: Number,
    type: String,
    price: Number,
    state: String,
    guestName: String,
    nightsQuantity: Number
});

export default mongoose.model(collection, roomSchema)