import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DashBoard from './components/dashBoard/DashBoard.jsx';
import HomePage from './components/homePage/HomePage.jsx';
import RoomsState from './components/subProcesses/roomsState/RoomsState.jsx';
import NewBooking from './components/subProcesses/newBooking/NewBooking.jsx';
import RoomsAvailableBusy from './components/subProcesses/roomsAvailableBusy/RoomsAvailableBusy.jsx';
import RoomsAvailables from './components/subProcesses/roomsAvailableBusy/roomsAvailables/RoomsAvailables.jsx';
import RoomsBusies from './components/subProcesses/roomsAvailableBusy/roomsBusies/RoomsBusies.jsx';
import ReleaseRoom from './components/subProcesses/releaseRoom/ReleaseRoom.jsx';
import Billing from './components/subProcesses/billing/Billing.jsx';
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
                    <Route path="/newBooking" element={<NewBooking />} />
                    <Route path="/roomsState" element={<RoomsAvailableBusy />} />
                    <Route path="/roomsAvailables" element={<RoomsAvailables />} />
                    <Route path="/roomsBusies" element={<RoomsBusies />} />
                    <Route path="/releaseRooms" element={<ReleaseRoom />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
