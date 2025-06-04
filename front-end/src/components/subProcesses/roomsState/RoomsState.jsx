import "./roomsState.css";
import NavMenu from "../../nav/NavMenu";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactComponent from "sweetalert2-react-content";
import Sencilla from "../../../imgs/sencilla.jpg";
import Doble from "../../../imgs/doble.jpg";
import Suite from "../../../imgs/suite.jpg";
import Loader from "../../loader/Loader.jsx";

function RoomsState() {

    const [bookings, setBooking] = useState([])
    const [loader, setLoader] = useState(false)

    const MySwal = withReactComponent(Swal)

    useEffect(() => {
        //Activo el loader
        setLoader(true)

        fetch(`${process.env.REACT_APP_URL_BACK}/rooms`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json()
                .then(data => {
                    //Desactivo el loader
                    setLoader(false)
                    if (res.status === 200) {
                        setBooking(data)
                    } else if (res.status === 500) {
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

    return (
        <main>
            <NavMenu />
            <div className="containerCardsRooms">
                {bookings.map((item) => (
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
                            {item.state === "Disponible" ? <p style={{
                                color: "green",
                                fontWeight: "bolder"
                            }}>{item.state}</p> : <p style={{
                                color: "red",
                                fontWeight: "bolder"
                            }}>{item.state}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default RoomsState;