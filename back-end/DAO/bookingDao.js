import bookingModel from "../models/bookingModel.js";

class BookingDao {
    constructor() {
        this.model = bookingModel
    }

    async getBookings() {
        return this.model.find()
    }

    async newBooking(body) {
        return this.model.create({
            roomNumber: body.roomNumber,
            type: body.type,
            guestName: body.guestName,
            nightsQuantity: body.nightsQuantity
        })
    }

    async deleteBooking(bid, body){
        return this.model.deleteOne({_id: bid})
    }
}

export default BookingDao;