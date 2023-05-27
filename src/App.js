import './App.css';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import EditPage from "./components/EditPage";
import ParcelForm from "./components/ParcelForm";
import CustomerPage from "./components/CustomerPage";
import ParcelSentTable from "./components/ParcelSentTable";
import ParcelReceivedTable from "./components/ParcelReceivedTable";
import NavBar from "./components/NavBar";
import PaymentPage from "./components/PaymentPage";
import "./App.css";

function App() {


  return (<Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/edit-info" element={<><NavBar /><EditPage /></>} />
            <Route path="/payment" element={<><NavBar /><PaymentPage /></>} />
            <Route path="/customers" element={<><NavBar /><CustomerPage /></>} />
            <Route path="/homepage" element={
                <>
                    <NavBar />
                    <div className="w-full p-4 h-screen flex flex-row justify-evenly">
                        <div className='basis-1/2 h-5/6 flex flex-col justify-evenly'>
                            <h1 className="self-center">Parcels sent</h1>
                            <ParcelSentTable/>
                            <h1 className="self-center">Incoming parcels</h1>
                            <ParcelReceivedTable/>
                        </div>
                        <div className='basis-1/6 h-5/6 flex flex-col justify-evenly'>
                            <h1 className="self-center">Add a new parcel</h1>
                            <ParcelForm/>
                        </div>
                    </div>
                </>} />
      </Routes>
  );
}

export default App;
