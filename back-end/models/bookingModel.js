import mongoose from "mongoose";

const collection = "Bookings"

const bookingSchema = mongoose.Schema({
    roomNumber: Number,
    type: String,
    guestName: String,
    nightsQuantity: Number
})

export default mongoose.model(collection, bookingSchema)