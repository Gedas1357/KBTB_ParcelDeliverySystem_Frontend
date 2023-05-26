import './App.css';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import EditPage from "./components/EditPage";
import CustomerForm from "./components/CustomerForm";
import ParcelForm from "./components/ParcelForm";
import CustomerTable from "./components/CustomerTable";
import ParcelTable from "./components/ParcelTable";
import "./App.css";

function App() {


  return (<Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/edit-info" element={<EditPage />} />
            <Route path="/homepage" element={
                <div className="w-full p-4 h-screen flex flex-row justify-evenly">
                    <div className='basis-1/2 h-5/6 flex flex-col justify-evenly'>
                        <h1>Customers</h1>
                        <CustomerTable/>
                        <h1>Parcels</h1>
                        <ParcelTable/>
                    </div>
                    <div className='basis-1/6 h-5/6 flex flex-col justify-evenly'>
                        <h1>Add a new customer</h1>
                        <CustomerForm/>
                        <h1>Add a new parcel</h1>
                        <ParcelForm/>
                    </div>
                </div>} />
      </Routes>
  );
}

export default App;
