import NavMenu from "../../nav/NavMenu";
import "./releaseRoom.css";
import Sencilla from "../../../imgs/sencilla.jpg";
import Doble from "../../../imgs/doble.jpg";
import Suite from "../../../imgs/suite.jpg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactComponent from "sweetalert2-react-content";
import Loader from "../../loader/Loader.jsx";
import Button from 'react-bootstrap/Button';
import MiniLoader from "../../miniLoader/MiniLoader.jsx";

function ReleaseRoom() {

    const [rooms, setRooms] = useState([]);
    const [loader, setLoader] = useState(false)
    const [miniLoader, setMiniLoader] = useState(false)
    const MySwal = withReactComponent(Swal)

    function fetchRequestGet() {
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
    }

    function fetchRequestPut(id) {
        setMiniLoader(true)
        fetch(`http://localhost:8080/releaseRooms/${id}`, {
            method: 'PUT',
            credentials: 'include'
        })
            .then(res => res.json()
                .then(data => {
                    setMiniLoader(false)
                    if (res.status === 200) {
                        MySwal.fire({
                            show: true,
                            title: `<strong>${data.message}</strong>`,
                            icon: "success",
                            showConfirmButton: true
                        })
                        fetchRequestGet()
                    } else if (res.status === 401 || res.status === 404 || res.status === 500) {
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
    }

    useEffect(() => {
        fetchRequestGet()
    }, [])

    if (loader === true) {
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
                            <p style={{ color: "red", fontWeight: "bolder" }}>{item.state}</p>
                            <div className="buttonContainner">
                                <Button onClick={() => fetchRequestPut(item._id)} variant="warning">Liberar</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default ReleaseRoom;