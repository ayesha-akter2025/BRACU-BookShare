import React, { useState } from 'react';

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  // Step 1: Send OTP
  const sendOtp = async () => {
    if (!email.endsWith('@g.bracu.ac.bd')) {
      setMessage('Please use your BRACU email.');
      return;
    }
    if (!name || !password) {
      setMessage('Please fill all fields.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/otp/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setStep(2); // move to OTP input
      } else {
        setMessage(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      setMessage('Server error. Please try again.');
    }
  };

  // Step 2: Register user with OTP
  const registerWithOtp = async () => {
    if (!otp) {
      setMessage('Please enter the OTP.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        alert('Registration successful! Please login now.');
        window.location.href = '/login';
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Server error. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      {step === 1 && (
        <>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          />
          <input
            type="email"
            placeholder="BRACU Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          />
          <button onClick={sendOtp} style={{ width: '100%', padding: 10 }}>
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Verify OTP & Register</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            style={{ width: '100%', padding: 8, margin: '8px 0' }}
          />
          <button onClick={registerWithOtp} style={{ width: '100%', padding: 10 }}>
            Register
          </button>
        </>
      )}

      {message && (
        <p
          style={{
            marginTop: 15,
            color:
              message.toLowerCase().includes('failed') || message.toLowerCase().includes('invalid')
                ? 'red'
                : 'green',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
