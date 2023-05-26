import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('Card');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [mm, setMm] = useState('');
    const [yy, setYy] = useState('');
    const [cvv, setCvv] = useState('');
    const [email, setEmail] = useState('');

    const handleConfirm = () => {
        if(paymentMethod === 'Card') {
            if(!firstName || !lastName || !cardNumber || !mm || !yy || !cvv) {
                alert("Please fill all fields.");
            } else {
                alert("Your payment was successful");
            }
        } else if(paymentMethod === 'PayPal') {
            if(!firstName || !lastName || !email) {
                alert("Please fill all fields.");
            } else {
                alert("Your payment was successful");
            }
        } else if(paymentMethod === 'Crypto') {
            if(!email) {
                alert("Please fill all fields.");
            } else {
                alert("Your payment was successful");
            }
        } else {
            alert("Unsupported payment method.");
        }
    };

    const handleCancel = () => {
        navigate('/homepage');
    };

    const handleMethod = (method) => {
        setPaymentMethod(method);
    };

    return (
        <div className="payment-page">
            <div className="payment-box">
                <h2>{paymentMethod === 'Card' ? 'Card Details' : paymentMethod === 'PayPal' ? 'PayPal Details' : 'Crypto Details'}</h2>
                {
                    paymentMethod === 'Card'
                        ?
                        <div className="card-details">
                            <div>
                                <input onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                                <input onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                            </div>
                            <input onChange={(e) => setCardNumber(e.target.value)} placeholder="Card Number" maxLength="16" />
                            <div>
                                <input onChange={(e) => setMm(e.target.value)} placeholder="MM" maxLength="2" style={{width: '20%'}} />
                                <span> / </span>
                                <input onChange={(e) => setYy(e.target.value)} placeholder="YY" maxLength="2" style={{width: '20%'}} />
                                <input onChange={(e) => setCvv(e.target.value)} placeholder="CVV/CVD" maxLength="3" style={{width: '30%', marginLeft: '20%'}} />
                            </div>
                        </div>
                        :
                        paymentMethod === 'PayPal'
                            ?
                            <div className="paypal-details">
                                <input onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                                <input onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                                <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </div>
                            :
                            <div className="crypto-details">
                                <input onChange={(e) => setEmail(e.target.value)} placeholder="Your E-mail for payment receipt" />
                            </div>
                }
                <h2>Choose Your Payment Method</h2>
                <div className="payment-methods">
                    <button onClick={() => handleMethod('Card')}>MasterCard</button>
                    <button onClick={() => handleMethod('Card')}>VISA</button>
                    <button onClick={() => handleMethod('PayPal')}>PayPal</button>
                    <button onClick={() => handleMethod('Crypto')}>Crypto</button>
                </div>
            </div>
            <div className="action-buttons">
                <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default PaymentPage;
