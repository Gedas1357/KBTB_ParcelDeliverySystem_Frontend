import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
import "../App.css"
import { checkSessionExpiration, login } from '../requests/Authentication';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => { //sitas pasileidzia kiekviena karta uzkrovus /login, patikrina ar sesija dar valid
        
        try {
            checkSessionExpiration(navigate);
            //sicia jau reiktu redirect i koki homepage permest
          } catch (error) {
            console.log(error);
            //reiskia baigesi laikas, nzn ar mest kazkoki pranesima, bet redirect butent cia visgi nereikia
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
        <div className="flex flex-col w-screen h-screen justify-center">
            <div className="flex flex-col justify-evenly self-center basis-2/5 w-1/6">
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                 <input type="submit" value="Log In" />
                </form>
            </div>
        </div>
    )
}

export default LoginPage;