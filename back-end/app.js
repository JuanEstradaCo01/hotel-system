import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import MongoSingleton from "./config/singleton.js";
import roomsRouter from "./routers/roomRouter.js"
dotenv.config();

//Conexion a la base de datos(MongoDB):
MongoSingleton.getConnection()

const app = express();

/*app.use(cors({
    origin: `${process.env.URL_FRONTEND}`, //Frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))*/

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser(`${process.env.SECRET_KEY}`))

const PORT = process.env.PORT || 8080

//Levanto servidor:
app.listen(PORT, () => (console.log(`Server running on port ${PORT}`)))

app.get("/healtcheck", (req, res) => {
    return res.status(200).json({
        state: "Running",
        date: new Date().toLocaleString()
    })
})

app.use("/", roomsRouter)