import { Link } from "react-router-dom";
import "./homePage.css"
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import InitSystem from "../initSystem/InitSystem";

function HomePage() {

    const [state, setState] = useState(false)

    function initSystem() {
        setState(true)
        fetch(`http://localhost:8080/initSystem`, {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json()
                .then(data => {
                    setState(false)
                }))
            .catch((e) => {
                console.log(e)
            })
    }

    if(state === true){
        return <InitSystem />
    }

    return (
        <main id="bodyHomePage">
            <h1>Gestion sistema hotelero</h1>
            <Link to={"/dashboard"}><Button onClick={() => initSystem()} variant="outline-success">Ir al Dashboard</Button></Link>
        </main>
    )
}


export default HomePage;