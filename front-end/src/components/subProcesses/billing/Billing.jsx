import jsPDF from 'jspdf';
import NavMenu from "../../nav/NavMenu";
import Sencilla from "../../../imgs/sencilla.jpg";
import Doble from "../../../imgs/doble.jpg";
import Suite from "../../../imgs/suite.jpg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactComponent from "sweetalert2-react-content";
import Loader from "../../loader/Loader.jsx";
import Button from 'react-bootstrap/Button';

function Billing() {

    const [rooms, setRooms] = useState([]);
    const [loader, setLoader] = useState(false)
    const MySwal = withReactComponent(Swal)

    const generarPDF = (data) => {
            const doc = new jsPDF();
            doc.text(`
                Factura:

                Cliente: ${data.nombre}
                Habitación: ${data.tipo}

                Consolidado de consumos:

                Precio por noche (${data.tipo}): $${data.precioPorNoche}
                Noches: ${data.noches}
                Total noches: $${data.noches * data.precioPorNoche}
                Otros consumos: $${data.consumo}
                Impuesto 18%: $${data.impuesto}

                Total a pagar: $${data.price}

                `, 10, 10);
            doc.save(`Factura.pdf`);
        }

    function fetchRequestGet() {
        setLoader(true)
        fetch(`${process.env.REACT_APP_URL_BACK}/roomsBusies`, {
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

    function fetchRequest(id) {

        fetch(`${process.env.REACT_APP_URL_BACK}/billing/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json()
                .then(data => {
                    if (res.status === 200) {
                        generarPDF(data)
                        MySwal.fire({
                            show: true,
                            title: `<strong>¡Factura generada!</strong>`,
                            icon: "success",
                            showConfirmButton: true
                        })
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

    useEffect(() => {
        fetchRequestGet()
    }, [])

    if (loader === true) {
        return <Loader />
    }

    if (rooms.length === 0) {
        return (
            <main>
                <NavMenu />
                <h1 className="tittle">¡No hay facturas pendientes! 🫤</h1>
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
                                <Button onClick={() => fetchRequest(item.roomNumber)} variant="danger">Facturar</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Billing;