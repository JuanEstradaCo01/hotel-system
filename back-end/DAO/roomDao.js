import RoomModel from "../models/roomModel.js"

class RoomDao {
    constructor() {
        this.model = RoomModel
    }

    async getRooms() {
        return this.model.find()
    }

    async getRoomById(id) {
        return this.model.findById(id)
    }

    async createRoom(body) {
        return this.model.create({
            roomNumber: body.roomNumber,
            type: body.type,
            price: body.price,
            state: body.state
        })
    }

    async updateStateRoom(bid, body) {
        const booking = await this.getRoomById(bid)

        if (!booking) {
            throw new Error("La habitacion no existe")
        }

        const update = {
            state: body.state
        }

        return this.model.updateOne({ _id: bid }, update)
    }

    async newBooking(body) {
        return this.model.create({
            roomNumber: body.roomNumber,
            type: body.type,
            guestName: body.guestName,
            nightsQuantity: body.nightsQuantity
        })
    }
}

export default RoomDao;