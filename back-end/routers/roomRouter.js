import { Router } from "express";
import RoomDao from "../DAO/roomDao.js";
import BookingDao from "../DAO/bookingDao.js";

const roomDao = new RoomDao();
const bookingDao = new BookingDao()

const roomRouter = Router()

//Consultar habitaciones
roomRouter.get("/rooms", async (req, res) => {
    try {
        const rooms = await roomDao.getRooms()

        return res.status(200).json(rooms)
    } catch (e) {
        return res.status(500).json({
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

//Crear reserva
roomRouter.post("/newBooking", async (req, res) => {
    try{
        const body = req.body

        //Valido si hay informacion faltante
        if (body.roomNumber === "" || body.type === "" || body.guestName === "" || body.nightsQuantity === "") {
            let body = {}
            body.message = "Datos faltantes"
            return res.status(401).json(body)
        }

        const rooms = await roomDao.getRooms()

        const room = rooms.find(item => item.roomNumber == body.roomNumber)

        if(!room) {
            return res.status(404).json({
                message: "La habitacion no existe"
            })
        }

        if(room.state === "Ocupado") {
            return res.status(401).json({
                message: "La habitacion esta ocupada"
            })
        }

        //Se hace la reserva
        await bookingDao.newBooking(body)

        //Se actualiza estado habitacion
        await roomDao.updateStateRoom(room._id, {
            state: "Ocupado"
        })

        return res.status(201).json({
            message: `Reserva creada con exito`
        })

    }catch{
        return res.status(500).json({
            error: "Error al crear la reserva"
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

//Consultar habitaciones libres
roomRouter.get("/roomsAvailables", async (req, res) => {
    try{
        const roomsAvailables = []

        const rooms = await roomDao.getRooms()

        //Valido la consulta y si existen habitaciones
        if(!rooms || rooms.length === 0){
            return res.status(404).json({
                message: "No existen habitaciones"
            })
        };

        rooms.forEach(item => {
            if(item.state === "Disponible"){
                roomsAvailables.push(item)
            }
        });

        return res.status(200).json(roomsAvailables)
    }catch{
        return res.status(500).json({
            error: "Error al consultar las habitaciones"
        })
    }
})

//Consultar habitaciones ocupadas
roomRouter.get("/roomsBusies", async (req, res) => {
    try{
        const roomsBusies = []

        const rooms = await roomDao.getRooms()

        //Valido la consulta y si existen habitaciones
        if(!rooms || rooms.length === 0){
            return res.status(404).json({
                message: "No existen habitaciones"
            })
        };

        rooms.forEach(item => {
            if(item.state === "Ocupado"){
                roomsBusies.push(item)
            }
        });

        return res.status(200).json(roomsBusies)
    }catch{
        return res.status(500).json({
            error: "Error al consultar las habitaciones"
        })
    }
})

//Liberar habitacion ocupada
roomRouter.put("/releaseRooms/:rid", async (req, res) => {
    try{
        const rid = req.params.rid

        const rooms = await roomDao.getRooms()

        const room = rooms.find(item => item._id == rid)

        if(!room){
            return res.status(404).json({
                message: "La habitacion no existe"
            })
        }

        if(room.state === "Disponible"){
            return res.status(401).json({
                message: "La habitacion actualmente ya estaba disponible"
            })
        }

        //Valido y elimino reserva
        const bookings = await bookingDao.getBookings()
        const booking = bookings.find(item => item.roomNumber == room.roomNumber)

        if(!booking){
            return res.status(404).json({
                message: "La habitacion no tiene reserva"
            })
        }

        //Elimino reserva
        await bookingDao.deleteBooking(booking._id)

        //Libero habitacion
        await roomDao.updateStateRoom(rid, {
            state: "Disponible"
        })

        return res.status(200).json({
            message: `Habitacion ${room.roomNumber} liberada`
        })
    }catch{
        return res.status(500).json({
            message: "Error al liberar la habitacion"
        })
    }
})

//Consultar reservas
roomRouter.get("/bookings", async (req, res) => {
    try{
        const bookings = await bookingDao.getBookings()

        return res.status(200).json(bookings)
    }catch{
        return res.status(500).json({
            message: "Error al consultar las reservas"
        })
    }
})

//Facturando
roomRouter.get("/billing/:roomNumber", async (req, res) => {
    try{
        const roomNumber = req.params.roomNumber

        const rooms = await roomDao.getRooms()
        const bookings = await bookingDao.getBookings()

        const room = rooms.find(item => item.roomNumber == roomNumber)

        if(!room){
            return res.status(404).json({
                message: "La habitacion no existe"
            })
        }

        const booking = bookings.find(item => item.roomNumber == roomNumber)

        if(!booking){
            return res.status(404).json({
                message: "La reserva no existe"
            })
        }

        const subTotal = room.price * booking.nightsQuantity;
        //Numero random para consumos adicionales
        const adicional = Math.floor(Math.random() * 20) + 1;
        const total = subTotal + adicional
        //Calculo el valor del impuesto (18%)
        const impuesto = total * 0.18
        const impuestoRedondeado = parseFloat(impuesto.toFixed(2));
        const totalPagar = total + impuestoRedondeado

        const billInfo = {
            nombre: booking.guestName,
            tipo: room.type,
            price: totalPagar,
            consumo: adicional,
            impuesto: impuestoRedondeado,
            precioPorNoche: room.price,
            noches: booking.nightsQuantity
        }

        return res.status(200).json(billInfo)
    }catch{
        return res.status(500).json({
            message: "Error al generar la factura"
        })
    }
})

//
roomRouter.get("/initSystem", async (req, res) => {
    try{
        const ok = "Servidor iniciado"

        return res.status(200).json({
            message: ok
        })
    }catch{
        return res.status(500).json({
            message: "Error al iniciar el sistema"
        })
    }
})

export default roomRouter;