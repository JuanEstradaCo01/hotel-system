import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashBoard from './components/dashBoard/DashBoard.jsx';
import HomePage from './components/homePage/HomePage.jsx';
import RoomsState from './components/subProcesses/roomsState/RoomsState.jsx';
import NotFoundPage from './components/notFoundPage/NotFoundPage.jsx';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashBoard />} />
                    {/*Procesos menu principal*/}
                    <Route path="/rooms" element={<RoomsState />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
