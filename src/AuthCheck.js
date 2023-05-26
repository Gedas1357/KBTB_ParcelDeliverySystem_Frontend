import axios from 'axios';
import React, { useEffect } from 'react';

// Global function to send local storage item to API
/*export const sendLocalStorageItemToAPI = async (localStorageItem) => {
  try {
    const response = await axios.post('http://example.com/api', localStorageItem);
    // Handle the API response
    console.log(response.data);
  } catch (error) {
    // Handle error
    console.error('Error sending local storage item to API:', error);
  }
};*/

export const checkSessionExpiration = async () => {
    try {
      //const currentTime = new Date().toISOString();
      const authHeader = JSON.parse(localStorage.getItem('authHeader'));
      const expTime = localStorage.getItem('expTime');
      const response = await axios.get('http://localhost:8080/api/V1/auth', {
        params: { expirationTime: expTime },
         headers: authHeader 
      });
      console.log('ok');
      // Handle the response accordingly
    } catch (error) { //jeigu baigesi sesija, isvalomi reikalai
        localStorage.removeItem('authHeader');
        localStorage.removeItem('expTime');
      console.error('Error checking session expiration:', error);

    }
  };