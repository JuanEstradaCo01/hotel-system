import "./roomsAvailableBusy.css"
import Disponible from "../../../imgs/disponible.png";
import Ocupado from "../../../imgs/ocupado.png";
import NavMenu from "../../nav/NavMenu.jsx";
import { Link } from "react-router-dom";

function RoomsAvailableBusy() {
    return (
        <main id="bodyRoomsAvailableBusy">
            <NavMenu />

            <div className="containerCardsRoomsAB">
                <Link to={"/roomsAvailables"}>
                    <div className="roomsAvailables">
                        <img src={Disponible} alt="disponible" />

                        <h5>Habitaciones disponibles</h5>
                    </div>
                </Link>

                <Link to={"/roomsBusies"}>
                    <div className="roomsBusies">
                        <img src={Ocupado} alt="ocupado" />

                        <h5>Habitaciones ocupadas</h5>
                    </div>
                </Link>
            </div>
        </main>
    )
}

export default RoomsAvailableBusy;