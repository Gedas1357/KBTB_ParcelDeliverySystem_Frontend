import "../App.css"
import {useEffect, useState} from "react";
import axios from 'axios';
import {getCustomers} from '../requests/Customers';
import {postParcel} from '../requests/Parcels';

const ParcelForm = () => {

    const [sender, setSender] = useState(0);
    const [receiver, setReceiver] = useState(0);
    const [deliveryMethod, setDeliveryMethod] = useState('TERMINAL_TERMINAL');
    const [address, setAddress] = useState('');
    const [size, setSize] = useState('SMALL');

    const Post = () => {
        postParcel(sender, receiver, deliveryMethod, address, size);
    }

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data);
                setSender(data[0].id);
            } catch (error) {}
        };
        fetchCustomers();
    }, []);

    const handleSubmit = event => {
        //event.preventDefault();
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <label>Parcel sender:</label>
                <select
                    value={sender}
                    onChange={(e) => {setSender(e.target.value)}}
                >
                    {customers.map(customer => (
                        <option value={customer.id}>{customer.username}</option>
                    ))}
                </select>
                <label>Parcel receiver:</label>
                <select
                    value={receiver}
                    onChange={(e) => {setReceiver(e.target.value)}}
                >
                    <option value="0">NONE</option>
                    {customers.map(customer => (
                        sender != customer.id &&
                        <option value={customer.id}>{customer.username}</option>
                    ))}
                </select>
                { receiver==0 &&
                    <label>Address:</label>}
                { receiver==0 &&
                    <input
                    type="text"
                    value={address}
                    onChange={(e) => {setAddress(e.target.value)}}
                />}
                <label>Delivery method:</label>
                <select
                    value={deliveryMethod}
                    onChange={(e) => {setDeliveryMethod(e.target.value)}}
                >
                    <option value="TERMINAL_TERMINAL">TERMINAL_TERMINAL</option>
                    <option value="COURIER_TERMINAL">COURIER_TERMINAL</option>
                    <option value="COURIER_COURIER">COURIER_COURIER</option>
                    <option value="TERMINAL_COURIER">TERMINAL_COURIER</option>
                </select>
                <label>Parcel size:</label>
                <select
                    value={size}
                    onChange={(e) => {setSize(e.target.value)}}
                >
                    <option value="SMALL">SMALL</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LARGE">LARGE</option>
                </select>
                <button onClick={Post}>Add parcel</button>
            </form>
        </div>
    )
}

export default ParcelForm;