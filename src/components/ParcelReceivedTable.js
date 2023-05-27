import "../App.css"
import {useEffect, useState} from "react";
import axios from 'axios';
import {getCustomerById} from '../requests/Customers';

const ParcelReceivedTable = () => {

    const [parcels, setParcels] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                console.log("works");
                const data = await getCustomerById();
                setParcels(data.incomingParcels);
            } catch (error) {}
        };
        fetchCustomers();
    }, [])

    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <div className='basis-5/12 border-2 border-black overflow-y-scroll'>
            <table>
                <tr className='tableHeader'>
                    <th>Id</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Delivery Method</th>
                    <th>Address</th>
                    <th>Size</th>
                </tr>
                {parcels.map(parcel => (
                    <tr key={parcel.id}>
                        <td>{parcel.id}</td>
                        <td>{parcel.senderId}</td>
                        <td>{parcel.receiverId}</td>
                        <td>{parcel.deliveryMethod}</td>
                        <td>{parcel.deliveryAddress}</td>
                        <td>{parcel.size}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default ParcelReceivedTable;