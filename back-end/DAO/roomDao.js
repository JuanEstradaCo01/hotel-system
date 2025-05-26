import RoomModel from "../models/roomModel.js"

class RoomDao {
    constructor() {
        this.model = RoomModel
    }

    async getRooms(){
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
}

export default RoomDao;