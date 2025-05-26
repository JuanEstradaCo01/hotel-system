import mongoose from "mongoose";

const collection = "Rooms"

const userSchema = mongoose.Schema({
    roomNumber: Number,
    price: Number,
    guestName: String,
    nightsQuantity: Number
})

export default mongoose.model(collection, userSchema)