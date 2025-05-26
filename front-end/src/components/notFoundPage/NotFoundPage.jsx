import "./notFoundPage.css"
import { Link } from "react-router-dom";

function NotFoundPage () {
    return(
        <main id="body404NotFound">
            <div className="container">
                <div class="content">
                    <h1 className="h1404">404</h1>
                    <p className="p404">¡Pagina no encontrada!</p>
                    <Link to={"/"} class="back-button">Volver al incio</Link>
                </div>
            </div>
        </main>
    )
}

export default NotFoundPage;