import React, { useState } from 'react';
import Razorpay from 'razorpay';

const PaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const razorpay = new Razorpay({
    key_id: 'YOUR_API_KEY',
    key_secret: 'YOUR_SECRET_KEY',
  });

  const handlePayment = () => {
    razorpay.on('payment.success', function (paymentId) {
      alert('Payment successful');
    });

    razorpay.on('payment.error', function (error) {
      alert('Payment failed');
    });

    const options = {
      amount: amount * 100,
      currency: 'INR',
      name: name,
      description: 'Payment for your order',
      image: 'https://example.com/your_logo.jpg',
      email: email,
      contact: '9999999999',
      callback_url: 'https://example.com/payment_callback',
      redirect_url: 'https://example.com/payment_redirect',
      notes: {
        address: 'Razorpay Corporate Office',
      },
    };

    razorpay.open(options);
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentForm;
