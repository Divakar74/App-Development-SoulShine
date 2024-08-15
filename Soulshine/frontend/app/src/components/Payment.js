import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';

function Payment() {
  const location = useLocation();
  const { price } = location.state || { price: 100 };  // Default amount is 100
  const [amount, setAmount] = useState(price);

  useEffect(() => {
    // Load Razorpay script when the component mounts
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.Razorpay) {
      var options = {
        key: 'rzp_test_AWrlyaXOO9ncih',
        amount: amount * 100, // Convert amount to paise
        currency: 'INR',
        name: 'Book My Appointment',
        description: 'for booking fee',
        handler: function (response) {
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
          // You can include additional logic here, e.g., updating your backend with the payment status
        },
        prefill: {
          name: 'Divakar',
          email: 'divakarr74@gmail.com',
          contact: '98743278',
        },
        notes: {
          address: 'Razorpay Corporate office',
        },
        theme: {
          color: '#3399cc',
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    } else {
      alert('Razorpay SDK not loaded. Make sure to include the Razorpay script.');
    }
  };

  return (
    <div className="App">
      <div className="input-container">
        <Button className="styled-button" onClick={handleSubmit}>
          Pay ₹{amount}
        </Button>
      </div>
    </div>
  );
}

export default Payment;
