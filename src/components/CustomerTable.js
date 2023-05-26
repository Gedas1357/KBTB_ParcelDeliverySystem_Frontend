import "../App.css"
import {useEffect, useState} from "react";
import axios from 'axios';

const CustomerTable = () => {

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/api/V1/customer')
            .then(res => {
                setCustomers(res.data)
            }).catch(err => {
            console.log(err)
        })
    }, [])

    const handleSubmit = event => {
        event.preventDefault();
    }

    return (
        <div className='basis-5/12 border-2 border-black overflow-y-scroll'>
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