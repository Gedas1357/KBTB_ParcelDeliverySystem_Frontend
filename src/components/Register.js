import "../App.css"
import {useState} from "react";
import axios from 'axios';
import {postCustomer} from '../requests/Customers';

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const Post = () => {
        postCustomer(username, password, email, address);
    }

    const handleSubmit = event => {
    }

    return (
            <form onSubmit={handleSubmit} className='basis-4/5'>
                <label>Username:</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                />
                <label>Password:</label>
                <input
                    type="text"
                    required
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                <label>Email:</label>
                <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <label>Address</label>
                <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => {setAddress(e.target.value)}}
                    />
                <button onClick={Post}>Add customer</button>
            </form>
    )
}

export default Register;