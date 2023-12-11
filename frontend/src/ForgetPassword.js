import React, { useState } from 'react';
import Axios from 'axios';
import './ForgetPassword.css'; // Import your CSS file

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const sendOtp = () => {
    Axios.post('http://localhost:3001/send-otp', {
      email: email,
    })
      .then((response) => {
        console.log(response.data);
        setErrorMessage('');
        setOtpSent(true);
      })
      .catch((error) => {
        setErrorMessage('Error sending OTP. Please check your email and try again.');
        setOtpSent(false);
      });
  };

  const verifyOtp = () => {
    Axios.post('http://localhost:3001/verify-otp', {
      email: email,
      otp: otp,
    })
      .then((response) => {
        console.log(response.data);
        setErrorMessage('');
        if (response.data.success) {
          setOtpVerified(true);
        } else {
          setErrorMessage('Incorrect OTP or OTP expired. Please try again.');
        }
      })
      .catch((error) => {
        setErrorMessage('Error verifying OTP. Please try again.');
      });
  };

  const updatePassword = () => {
    if (otpVerified) {
      if (newPassword === confirmPassword) {
        Axios.post('http://localhost:3001/update-password', {
          email: email,
          newPassword: newPassword,
        })
          .then((response) => {
            console.log(response.data);
            setErrorMessage('Password updated successfully!');
          })
          .catch((error) => {
            setErrorMessage('Error updating password. Please try again.');
          });
      } else {
        setErrorMessage('Passwords do not match. Please enter them again.');
      }
    } else {
      setErrorMessage('Please verify OTP before updating the password.');
    }
  };

  return (
    <div className="forget-password-container">
      <h2>Forget Password</h2>
      {!otpSent ? (
        <div className="input-box">
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      ) : (
        <div className="input-box">
          <label>Enter OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      {otpVerified && (
        <div className="input-box">
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button onClick={updatePassword}>Update Password</button>
        </div>
      )}
      {errorMessage && <p className="err">{errorMessage}</p>}
    </div>
  );
};

export default ForgetPassword;
