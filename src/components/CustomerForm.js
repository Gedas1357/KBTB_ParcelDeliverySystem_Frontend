import "../App.css"
import {useState} from "react";
import axios from 'axios';

const CustomerForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const Post = () => {
        axios.post('http://localhost:8080/api/V1/customer', {
            username: username,
            password: password,
            email: email,
            address: address
        })
            .then(res => {
                console.log(res.data)
            }).catch(err => {
            console.log(err)
        })
    }

    const handleSubmit = event => {
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
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
        </div>
    )
}

export default CustomerForm;