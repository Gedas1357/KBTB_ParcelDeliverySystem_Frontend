import axios from 'axios';

export const getParcels = async () => {
    const authHeader = JSON.parse(localStorage.getItem('authHeader'));
    const expTime = localStorage.getItem('expTime');
    try {
        const response = await axios.get('http://localhost:8080/api/V1/parcel', {
            params: { expirationTime: expTime },
            headers: authHeader
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postParcel = async (sender, receiver, deliveryMethod, address, size, navigate) => {
    const authHeader = JSON.parse(localStorage.getItem('authHeader'));
    const expTime = localStorage.getItem('expTime');
    axios.post('http://localhost:8080/api/V1/parcel', {
            senderId: parseInt(sender),
            receiverId: parseInt(receiver),
            deliveryMethod: deliveryMethod,
            deliveryAddress: address,
            size: size},
        {
            params: { expirationTime: expTime },
            headers: authHeader})
        .then(res => {
            navigate('/payment');
        }).catch(err => {
        console.log(err)
    })
}