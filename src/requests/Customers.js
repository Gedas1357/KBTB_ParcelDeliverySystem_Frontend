import axios from 'axios';

export const getCustomers = async () => {
    const authHeader = JSON.parse(localStorage.getItem('authHeader'));
    const expTime = localStorage.getItem('expTime');
    try {
        const response = await axios.get('http://localhost:8080/api/V1/customer', {
            params: { expirationTime: expTime },
            headers: authHeader
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCustomerById = async () => {
    const authHeader = JSON.parse(localStorage.getItem('authHeader'));
    const expTime = localStorage.getItem('expTime');
    try {
        const name = localStorage.getItem('username');
        let response = await axios.get(`http://localhost:8080/api/V1/customer/name/${name}`, { headers: authHeader });
        const id  = response.data;
        response = await axios.get('http://localhost:8080/api/V1/customer/' + id, { headers: authHeader });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postCustomer = async (username, password, email, address) => {
    const authHeader = JSON.parse(localStorage.getItem('authHeader'));
    const expTime = localStorage.getItem('expTime');
    axios.post('http://localhost:8080/api/V1/customer', {
        username: username,
        password: password,
        email: email,
        address: address
    })
        .then(res => {
        }).catch(err => {
        console.log(err)
    })
}