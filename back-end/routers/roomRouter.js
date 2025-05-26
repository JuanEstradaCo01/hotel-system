import { Router } from "express";
import RoomDao from "../DAO/roomDao.js"

const roomDao = new RoomDao();

const roomRouter = Router()

//Consultar habitaciones
roomRouter.get("/rooms", async (req, res) => {
    try {
        const rooms = await roomDao.getRooms()

        return res.status(200).json(rooms)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al consultar las habitaciones"
        })
    }
})

//Crear habitacion
roomRouter.post("/createRoom", async (req, res) => {
    try {
        const body = req.body

        //Valido si hay informacion faltante
        if (body.roomNumber === "" || body.type === "" || body.price === "" || body.state === "") {
            let body = {}
            body.message = "Datos faltantes"
            return res.status(401).json(body)
        }

        //Valido si el numero de habitacion ya existe en la BD
        const rooms = await roomDao.getRooms()
        const findIfExistRoom = rooms.find(item => item.roomNumber === body.roomNumber)

        if (!findIfExistRoom) {
            await roomDao.createRoom(body)

            return res.status(201).json({
                message: `Habitacion creada con exito (${body.roomNumber})`
            })
        }

        return res.status(401).json({
            message: "El numero de habitacion ya existe"
        })
    } catch {
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al crear"
        })
    }
})

//Consultar habitacion por ID
roomRouter.get("/room/:id", async (req, res) => {

    const id = req.params.id
    
    try {
        const room = await roomDao.getRoomById(id)

        return res.status(200).json(room)
    } catch {
        return res.status(404).json({
            message: "La habitacion no existe"
        })
    }

})

export default roomRouter;