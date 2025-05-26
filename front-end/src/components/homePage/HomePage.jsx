import { Link } from "react-router-dom";
import "./homePage.css"
import Button from 'react-bootstrap/Button';

function HomePage () {
    return(
        <main id="bodyHomePage">
            <h1>Gestion sistema hotelero</h1>
            <Link to={"/dashboard"}><Button variant="outline-success">Ir al Dashboard</Button></Link>
        </main>
    )
}

export default HomePage;