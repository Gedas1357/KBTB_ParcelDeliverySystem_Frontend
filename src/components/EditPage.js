import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { checkSessionExpiration } from '../requests/Authentication';
//import "./../App.css";

const UserInfoForm = () => {
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [version, setVersion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showActionButtons, setShowActionButtons] = useState(false);


  useEffect(() => {
      const fetchUserInfo = async () => {
          const authHeader = JSON.parse(localStorage.getItem('authHeader'));
          try {
              const name = localStorage.getItem('username');
              const response = await axios.get(`http://localhost:8080/api/V1/customer/name/${name}`, { headers: authHeader });
              const id  = response.data;
              setId(id);
              try {
                  const response = await axios.get('http://localhost:8080/api/V1/customer/' + id, { headers: authHeader });
                  const { username } = response.data;
                  const { email } = response.data;
                  const { address } = response.data;
                  const {version} = response.data;
                  setUsername(username);
                  setEmail(email);
                  setAddress(address);
                  setVersion(version);
              } catch (error) {
                  console.error('Error fetching user info: ', error);
              }
          } catch (error) {
              console.error('err: ', error);
          }
      };
      fetchUserInfo();
  }, []);

  const handleFormSubmit = async (event) => {
      event.preventDefault();
      const authHeader = JSON.parse(localStorage.getItem('authHeader'));

      try {
          console.log(authHeader);
          await axios.put(`http://localhost:8080/api/V1/customer/${id}`, {
              username,
              email,
              address,
              version
          },  { headers: authHeader });
          window.location.reload();
      } catch (error) {
          if (error.response && error.response.status === 409) {
              setErrorMessage('Conflict occurred while updating user, choose one of the following actions:');
              setShowActionButtons(true);
          } else {
              console.error('Error updating user information:', error);
          }
      }
  };

  const handleReload = () => {
    window.location.reload();
  };


  const handleBlindOverwrite = async(event) => {
    event.preventDefault();
    const authHeader = JSON.parse(localStorage.getItem('authHeader'));

    try {
        const response = await axios.get(`http://localhost:8080/api/V1/customer/${id}`, { headers: authHeader });
        const version = response.data.version;
        try {
            await axios.put(`http://localhost:8080/api/V1/customer/${id}`, {
                username,
                email,
                address,
                version
            },  { headers: authHeader });
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('Conflict occurred while updating user, choose one of the following actions:');
                setShowActionButtons(true);
            }
            else {
                console.error('Error updating user information:', error);
            }
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
    }
  };

  return (
      <div className='flex flex-col justify-evenly h-96'>
          <h1 className='self-center'>Welcome, {username}!</h1>
          {errorMessage && <p className='self-center text-red-600 font-bold'>{errorMessage}</p>}
          {showActionButtons && (
          <div className='flex flex-col basis-1/5 self-center justify-evenly'>
              <button className='w-full self-center' onClick={() => handleReload()}>Reload page to see new information and try again</button>
              <button className='w-full self-center' onClick={handleBlindOverwrite}>Try again with same information</button>
          </div>)}
          <form onSubmit={handleFormSubmit} className='basis-1/5 w-1/5 self-center'>
              <label> Email:</label>
              <input
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
              />
              <br />
              <label>Address:</label>
              <input
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
              />
              <br />
              <button type="submit">Update</button>
          </form>
      </div>
  );
};

export default UserInfoForm;