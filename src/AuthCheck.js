import axios from 'axios';
import React, { useEffect } from 'react';


export const checkSessionExpiration = async () => {
    try {

      const authHeader = JSON.parse(localStorage.getItem('authHeader'));
      const expTime = localStorage.getItem('expTime');
      const response = await axios.get('http://localhost:8080/api/V1/auth', {
        params: { expirationTime: expTime },
         headers: authHeader 
      });
      console.log('ok');

    } catch (error) { //jeigu baigesi sesija, isvalomi reikalai
        localStorage.removeItem('authHeader');
        localStorage.removeItem('expTime');
      console.error('Error checking session expiration:', error);

    }
  };