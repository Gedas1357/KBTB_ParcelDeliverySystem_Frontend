import axios from 'axios';
import React from 'react';


export const checkSessionExpiration = async (navigate: typeof useNavigate) => {
    try {
        const authHeader = JSON.parse(localStorage.getItem('authHeader'));
        const expTime = localStorage.getItem('expTime');
        const response = await axios.get('http://localhost:8080/api/V1/auth', {
            params: { expirationTime: expTime },
            headers: authHeader
        });
        console.log('ok');
        navigate('/homepage');

    } catch (error) { //jeigu baigesi sesija, isvalomi reikalai
        localStorage.removeItem('authHeader');
        localStorage.removeItem('expTime');
      console.error('Error checking session expiration:', error);

    }
  };

export const login = async (headers, navigate: typeof useNavigate) => {
    const authResponse = await axios.get('http://localhost:8080/api/V1/login', { headers });
    try {
        const response = await axios.get('http://localhost:8080/api/V1/login', { headers })
        console.log('ok');
        const  username  = response.data.username;
        const  expTime  = response.data.expTime;
        localStorage.setItem('expTime', expTime);
        localStorage.setItem('username', username);
        navigate('/homepage');
    } catch (error) { //jeigu baigesi sesija, isvalomi reikalai
        localStorage.removeItem('authHeader');
        localStorage.removeItem('expTime');
        console.error('Error checking session expiration:', error);

    }
};
