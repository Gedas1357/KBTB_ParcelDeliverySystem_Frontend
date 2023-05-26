import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { checkSessionExpiration } from '../AuthCheck';

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
            console.log('checky');
            checkSessionExpiration();
            console.log('big success here is yor aydy sir:');

        } catch (error) {
        console.error('session over bye:', error);
        
        }
        
        //console.log(localStorage.getItem('username'));
        try {
            const name = localStorage.getItem('username');
            console.log(name);
            const response = await axios.get(`http://localhost:8080/api/V1/customer/name/${name}`, { headers: authHeader }); 
            console.log(response);
            const id  = response.data;
            setId(id);
            console.log(id);

            if (authHeader ) {
                        console.log('Authorization Header:', authHeader);
                        try {
                            console.log('aidi',id);
                            const response = await axios.get('http://localhost:8080/api/V1/customer/' + id, { headers: authHeader }); 
                            console.log(response);
                            const { username } = response.data;
                            const { email } = response.data;
                            const { address } = response.data;
                            const {version} = response.data;
                            setUsername(username);
                            setEmail(email);
                            setAddress(address);
                            setVersion(version);
                    } catch (error) {
                    console.error('Error fetching user info:', error);
                }
                    } else {
                        console.log('User not authenticated');
                    }

        } catch (error) {
        console.error('err:', error);
        
        }   
    };

    fetchUserInfo();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const authHeader = JSON.parse(localStorage.getItem('authHeader'));

    try {
        console.log(authHeader );
      await axios.put(`http://localhost:8080/api/V1/customer/${id}`, {
        username,
        email,
        address,
        version
      },  { headers: authHeader });

     // const response = await axios.get(`http://localhost:8080/api/V1/customer/${id}`);
      
    //  setUsername(response.data.username);
      //setEmail(response.data.email);
      //setId(response.data.id);
      window.location.reload();
      console.log('User information updated successfully');
      
    } catch (error) {
        if (error.response && error.response.status === 409) {
            setErrorMessage('Conflict occurred while updating user, choose one of the following actions:');
            setShowActionButtons(true); 
      //console.error('Error updating user information:', error);
    }
    else {
        console.error('Error updating user information:', error);
      }
    }
  };

  //cia viskas ok
  const handleReload = () => {
    window.location.reload();
  };

  ///dar reiks implementuot
  const handleCompareAndTryAgain = () => {
    window.location.reload();
  };

  //dar nzn ar veiks 
  const handleBlindOverwrite = async(event) => {
    event.preventDefault();
    const authHeader = JSON.parse(localStorage.getItem('authHeader'));

    try {
        const response = await axios.get(`http://localhost:8080/api/V1/customer/${id}`, { headers: authHeader });
        const version = response.data.version;
        try {
            //console.log('ver:', version);
            await axios.put(`http://localhost:8080/api/V1/customer/${id}`, {
                username,
                email,
                address,
                version
            },  { headers: authHeader });

            window.location.reload();
            console.log('User information updated successfully');
        
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrorMessage('Conflict occurred while updating user, choose one of the following actions:');
                setShowActionButtons(true); 
        //console.error('Error updating user information:', error);
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
    <div>
    <h2>Welcome, {username}!</h2>
    {errorMessage && <p>{errorMessage}</p>}
      {showActionButtons && (
        <div>
         <button onClick={() => handleReload()}>Reload page</button>
          <button onClick={() => handleCompareAndTryAgain()}>Compare with new information and try again</button>
          <button  onClick={handleBlindOverwrite}>Try again with same information</button>
        </div>
      )}
    <form onSubmit={handleFormSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Update</button>
    </form>
  </div>
  );
};

export default UserInfoForm;