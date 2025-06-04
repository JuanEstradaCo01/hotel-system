import "./newBooking.css"
import { useState } from "react";
import NavMenu from "../../nav/NavMenu.jsx";
import Swal from "sweetalert2";
import withReactComponent from "sweetalert2-react-content";
import MiniLoader from "../../miniLoader/MiniLoader.jsx";

function NewBooking() {

    const [typeRoom, setTypeRoom] = useState("")
    const [roomNumber, setRoomNumber] = useState("")
    const [guestName, setGuestName] = useState("")
    const [nights, setNights] = useState("")
    const [loader, setLoader] = useState(false)

    const MySwal = withReactComponent(Swal)

    const newBooking = async (evt) => {
        evt.preventDefault()

        document.getElementById("formNewBooking").reset()

        setLoader(true)

        const body = {
            typeRoom,
            roomNumber,
            guestName,
            nightsQuantity: nights
        }

        await fetch(`${process.env.REACT_APP_URL_BACK}/newBooking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json()
                .then(data => {
                    setLoader(false)
                    if (res.status === 201) {
                        MySwal.fire({
                            show: true,
                            title: `<strong>${data.message}</strong>`,
                            icon: "success",
                            showConfirmButton: true
                        })
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

    return (
        <>
            <NavMenu />
            <main id="bodyNewBooking">
                <div className="form-container">
                    <h2>Nueva reserva</h2>

                    <div className="typeRoomContainer">
                        <label for="opciones">Tipo de habitacion:</label>
                        <select onChange={(e) => { setTypeRoom(e.target.value) }} id="opciones" name="opciones">
                            <option selected disabled >Selecciona tipo de habitacion</option>
                            <option value="Sencilla">Sencilla</option>
                            <option value="Doble">Doble</option>
                            <option value="Suite">Suite</option>
                        </select>
                    </div>


                    {typeRoom === 'Sencilla' ? (
                        <form id="formNewBooking">
                            <label for="habitacion">Habitacion:</label>
                            <select onChange={(e) => { setRoomNumber(e.target.value) }} id="habitacion" name="habitacion">
                                <option selected disabled >Selecciona habitacion</option>
                                <option value="100">100</option>
                                <option value="101">101</option>
                                <option value="102">102</option>
                                <option value="103">103</option>
                                <option value="104">104</option>
                                <option value="105">105</option>
                            </select>

                            <label for="huesped">Nombre completo huesped:</label>
                            <input onChange={(e) => { setGuestName(e.target.value) }} type="text" id="huesped" name="huesped" />

                            <label for="noches">Noches:</label>
                            <input onChange={(e) => { setNights(e.target.value) }} type="number" id="noches" name="noches" required />

                            <button className="buttonSend" onClick={newBooking} type="submit">{loader === true ? <MiniLoader /> : <p>Enviar</p>}</button>
                        </form>
                    ) : typeRoom === 'Doble' ? (

                        <form id="formNewBooking">
                            <label for="habitacion">Habitacion:</label>
                            <select onChange={(e) => { setRoomNumber(e.target.value) }} id="habitacion" name="habitacion">
                                <option selected disabled >Selecciona habitacion</option>
                                <option value="200">200</option>
                                <option value="201">201</option>
                                <option value="202">202</option>
                                <option value="203">203</option>
                                <option value="204">204</option>
                                <option value="205">205</option>
                            </select>

                            <label for="huesped">Nombre completo huesped:</label>
                            <input onChange={(e) => { setGuestName(e.target.value) }} type="text" id="huesped" name="huesped" />

                            <label for="noches">Noches:</label>
                            <input onChange={(e) => { setNights(e.target.value) }} type="number" id="noches" name="noches" required />

                            <button className="buttonSend" onClick={newBooking} type="submit">{loader === true ? <MiniLoader /> : <p>Enviar</p>}</button>
                        </form>

                    ) : typeRoom === 'Suite' ? (

                        <form id="formNewBooking">
                            <label for="habitacion">Habitacion:</label>
                            <select onChange={(e) => { setRoomNumber(e.target.value) }} id="habitacion" name="habitacion">
                                <option selected disabled >Selecciona habitacion</option>
                                <option value="300">300</option>
                                <option value="301">301</option>
                                <option value="302">302</option>
                                <option value="303">303</option>
                                <option value="304">304</option>
                                <option value="305">305</option>
                            </select>

                            <label for="huesped">Nombre completo huesped:</label>
                            <input onChange={(e) => { setGuestName(e.target.value) }} type="text" id="huesped" name="huesped" />

                            <label for="noches">Noches:</label>
                            <input onChange={(e) => { setNights(e.target.value) }} type="number" id="noches" name="noches" required />

                            <button className="buttonSend" onClick={newBooking} type="submit">{loader === true ? <MiniLoader /> : <p>Enviar</p>}</button>
                        </form>
                    ) : null
                    }
                </div>
            </main >
        </>
    )
}
export default NewBooking;