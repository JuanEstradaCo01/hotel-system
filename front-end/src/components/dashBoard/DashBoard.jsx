import { Link } from "react-router-dom";
import "./dashBoard.css";
import Button from 'react-bootstrap/Button';
import NuevaReserva from "../../imgs/agregarReserva.png";
import EstadoHabitaciones from "../../imgs/estadoHabitacion.png";
import Habitacion from "../../imgs/habitacion.png";
import Liberar from "../../imgs/liberar.png";
import Facturacion from "../../imgs/facturacion.png";
import Reporte from "../../imgs/reporteIngresos.png";

function DashBoard() {
    return (
        <main id="bodyDashBoard">
            <div className="tittleDashboardContainer">
                <h1>DashBoard</h1>
            </div>

            <div className="outButtonConatiner">
                <Link to={"/"}><Button variant="danger">Salir</Button></Link>
            </div>

            <div className="cardsDashBoardContainer">
                <Link to={"/newBooking"}>
                    <div className="cardDashboardContainer">
                        <img src={NuevaReserva} alt="Nueva reserva" />

                        <div className="tittleCardDashboardContainer">
                            <h3>Nueva reserva</h3>
                        </div>
                    </div>
                </Link>

                <Link to={"/rooms"}>
                    <div className="cardDashboardContainer">
                        <img src={EstadoHabitaciones} alt="Nueva reserva" />

                        <div className="tittleCardDashboardContainer">
                            <h3>Estado habitaciones</h3>
                        </div>
                    </div>
                </Link>

                <Link to={"/roomsState"}>
                    <div className="cardDashboardContainer">
                        <img src={Habitacion} alt="Nueva reserva" />

                        <div className="tittleCardDashboardContainer">
                            <h3>Habitaciones ocupadas/libres</h3>
                        </div>
                    </div>
                </Link>

                <Link to={"/releaseRooms"}>
                    <div className="cardDashboardContainer">
                        <img src={Liberar} alt="Nueva reserva" />

                        <div className="tittleCardDashboardContainer">
                            <h3>Liberar habitacion (checkout)</h3>
                        </div>
                    </div>
                </Link>

                <div className="cardDashboardContainer">
                    <img src={Facturacion} alt="Nueva reserva" />

                    <div className="tittleCardDashboardContainer">
                        <h3>Facturación</h3>
                    </div>
                </div>

                <div className="cardDashboardContainer">
                    <img src={Reporte} alt="Nueva reserva" />

                    <div className="tittleCardDashboardContainer">
                        <h3>Reporte ingresos</h3>
                    </div>
                </div>

            </div>
        </main>
    )
}

export default DashBoard;