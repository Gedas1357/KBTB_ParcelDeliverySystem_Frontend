import "../App.css"
import {useEffect, useState} from "react";
import axios from 'axios';
import {getCustomers} from '../requests/Customers';

const CustomerTable = () => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data);
            } catch (error) {}
        };
        fetchCustomers();
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <div className='basis-7/12 max-h-6/12 border-2 border-black overflow-y-scroll self-center'>
            <table>
                <tr className='tableHeader'>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Address</th>
                </tr>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.username}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default CustomerTable;