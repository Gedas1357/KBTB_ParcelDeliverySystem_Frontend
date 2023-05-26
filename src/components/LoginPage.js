import {useEffect, useState} from "react";
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
import "../App.css"
import { checkSessionExpiration } from '../AuthCheck';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => { //sitas pasileidzia kiekviena karta uzkrovus /login, patikrina ar sesija dar valid
        
        try {
            console.log('boop');
            navigate('/homepage');
            checkSessionExpiration();
            //sicia jau reiktu redirect i koki homepage permest
          } catch (error) {
            console.log('boop');
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
            console.log(headers);
       
/* gal net nereikia nzn kodel palikau
            //biski cringe bet ant greicio darau sorry, tereikia kad praeitu requestas koks nors, ir jau skaitosi kad tipo ok authorized xD 
            //aisku butu geriau i koki login controller kreiptis 
            const response = await axios.get('http://localhost:8080/api/V1/parcel', { headers });
*/

            localStorage.setItem('authHeader', JSON.stringify(headers));
            
           // console.log(response.data);
            console.log(JSON.parse(localStorage.getItem('authHeader')));
            //const header = localStorage.getItem('authHeader');
            const authResponse = await axios.get('http://localhost:8080/api/V1/login', { headers }); //jei big success, grazinamas username ir exp date
            console.log(authResponse);
            console.log(authResponse.data);
            //const { username, expTime } = authResponse.data;
            const  username  = authResponse.data.username;
            const  expTime  = authResponse.data.expTime;
            //console.log(expTime);
            //console.log(username);
            localStorage.setItem('expTime', expTime);
            localStorage.setItem('username', username);
        } catch (error) {

            console.error('An error occurred:', error.response);
        }
    };

    return (
        <div className="flex flex-col w-screen h-screen justify-center">
            <div className="flex flex-col justify-evenly self-center basis-2/5 w-1/6 border-2 border-black">
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