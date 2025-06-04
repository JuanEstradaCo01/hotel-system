import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import "./initSystem.css"

function InitSystem() {

    return (
        <main id='bodyInitSystem'>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Iniciando servidor, por favor espera...
            </Button>
        </main>
    )
}

export default InitSystem;