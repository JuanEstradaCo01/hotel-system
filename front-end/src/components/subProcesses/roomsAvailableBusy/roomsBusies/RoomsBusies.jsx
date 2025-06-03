import NavMenu from "../../../nav/NavMenu"
import "./roomsBusies.css"
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
import withReactComponent from "sweetalert2-react-content";
import Sencilla from "../../../../imgs/sencilla.jpg"
import Doble from "../../../../imgs/doble.jpg"
import Suite from "../../../../imgs/suite.jpg"
import Loader from "../../../loader/Loader";

function RoomsBusies() {

    const [rooms, setRooms] = useState([]);
    const [loader, setLoader] = useState(false)

    const MySwal = withReactComponent(Swal)

    useEffect(() => {

        setLoader(true)

        fetch(`http://localhost:8080/roomsBusies`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json()
                .then(data => {
                    setLoader(false)
                    if (res.status === 200) {
                        setRooms(data)
                    } else if (res.status === 404 || res.status === 500) {
                        MySwal.fire({
                            show: true,
                            title: `<strong>${data.message}</strong>`,
                            icon: "error",
                            showConfirmButton: true
                        })
                    }
                }))
            .catch((e) => {
                console.log(e)
            })
    }, [])

    if(loader === true){
        return <Loader />
    }

    if(rooms.length === 0){
        return(
            <main>
                <NavMenu />
                <h1 className="tittle">¡No hay habitaciones ocupadas! 🫤</h1>
            </main>
        )
    }

    return (
        <main>
            <NavMenu />
            <div className="containerCardsRooms">
                {rooms.map((item) => (
                    <div className="cardRoomContainer">
                        {
                            item.type === 'Sencilla' ? (
                                <img src={Sencilla} alt="Sencilla" />
                            ) : item.type === 'Doble' ? (
                                <img src={Doble} alt="Doble" />
                            ) : item.type === 'Suite' ? (
                                <img src={Suite} alt="Suite" />
                            ) : null
                        }

                        <div className="descriptionRoomsCard">
                            <p><strong>Habitacion: </strong>{item.roomNumber}</p>
                            <p><strong>Tipo: </strong>{item.type}</p>
                            <p><strong>Precio: </strong>${item.price}</p>
                            <p style={{ color: "red", fontWeight: "bolder" }}>{item.state}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default RoomsBusies;