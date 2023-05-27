import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
import "../App.css"
import { checkSessionExpiration, login } from '../requests/Authentication';
import Register from "./Register";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        try {
            checkSessionExpiration(navigate);
          } catch (error) {
            console.log(error);
          }
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const auth = btoa(`${username}:${password}`);
        const headers = {
            'Authorization': `Basic ${auth}`
        };

        try {
            localStorage.setItem('authHeader', JSON.stringify(headers));
            const authResponse = login(headers, navigate);
        } catch (error) {
            console.error('An error occurred:', error.response);
        }
    };

    return (
        <div className="flex flex-row w-screen h-screen justify-evenly">
            <div className="flex flex-col justify-evenly self-center h-2/5 basis-1/5">
                <h1 className="self-center">Login</h1>
                <div className="flex flex-col justify-evenly self-center basis-4/5 w-full">
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <input type="submit" value="Log In" />
                    </form>
                </div>
            </div>
                <div className="flex flex-col justify-evenly self-center h-3/5 basis-1/5">
                <h1 className="self-center">Register</h1>
            <Register className='basis-4/5'/>
            </div>
        </div>
    )
}

export default LoginPage;