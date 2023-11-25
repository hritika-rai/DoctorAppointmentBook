import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import image from './imagelogo.jpg';
import './CreateAccount.css';


const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [val, setVal] = useState('');
  const navigate = useNavigate();

  const sendOtp = () => {
    console.log('Sending otp');
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please enter them again.');
    } else {
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
    }
  };

  const verifyOtp = () => {
    Axios.post('http://localhost:3001/verify-otp', {
      email: email,
      otp: otp,
    })
      .then((response) => {
        console.log(response.data);
        setErrorMessage('');
        console.log('verifying');
        if (response.data.success) {
          setOtpVerified(true);
          // Call addBook to add user details after successful OTP verification
          addUser();
        } else {
          setErrorMessage('Incorrect OTP or OTP expired. Please try again.');
        }
      })
      .catch((error) => {
        setErrorMessage('Incorrect OTP or OTP expired. Please try again.');
      });
  };
  
const getInformation = async () => {
  try {
    const response = await Axios.post("http://localhost:3001/checkEmail", {
      email: email,
    });

    console.log('Response:', response);
    console.log('Data:', response.data);
    console.log('hi');

    if (response.data === 'yes') {
      setErrorMessage('Email already in use. Please use a different email.');
      console.log('if');
    } else {
      console.log('else');
      // If the email doesn't exist, proceed to send OTP
      sendOtp();
      setDetailsSubmitted(true); // Set the flag to indicate details form submission
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if the email already exists
  try {
    await getInformation();
  } catch (error) {
    console.error('Error checking email:', error);
    // Handle any additional error handling if needed
  }
};

// ... (remaining code)


  const addUser= () => {
    // If the email doesn't exist, proceed to add the user
    Axios.post("http://localhost:3001/adddetails", {
      username: username,
      email: email,
      password: password,
    })
      .then(() => {
        
        // Navigate to /Login after successful user addition
        navigate('/Login');
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <div>
       <div className="headerCreate">
          <div className="logotop">
        <img src={image} alt="Logo" className='logoimgaccpage' />
        </div>
        
        <h1 className="Sign">HEALTH HUB</h1>
       </div>
       
      <form onSubmit={handleSubmit}>
        <div classNmae="bubble" style={{ marginBottom:'5px',marginTop:'-40px' }}>
        <h1 className="SignUp" style={{ margin: '0', fontSize: '2em' ,marginBottom:'15px'}}>CREATE ACCOUNT</h1>
  <h2 className="SignUp" style={{ margin: '0', fontSize: '1.5em' }}>We are here to help you</h2>
      </div>
        <div>
          <label>Username:</label>
          <input type="text" value={username}  required onChange={(e) => setUsername(e.target.value)} className="i1"/>
          <label>Email: (Google Account)</label>
          <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} className="i1" />
          <label>Password:</label>
          <input type="password" value={password} required  pattern=".{8,}" className="i1" onChange={(event) => {
                      const pass = event.target;
                      const value = pass.value.trim();
                
                      setPassword(value);
                
                      if (value.length < 8) {
                        pass.setCustomValidity("Please enter a 8 characters password");
                        pass.classList.add("error"); // Add a CSS class for styling errors
                      } else {
                        pass.setCustomValidity("");
                        pass.classList.remove("error"); // Remove the error class
                      }
                    }}/>
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} className="i1" required onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {otpSent && !errorMessage && (
          <div className="OTPscene">
            <h3>Enter OTP sent on your provided email address:</h3>
            <label>OTP:</label>
            <input type="text" value={otp} className="i2" onChange={(e) => setOtp(e.target.value)} />
            <button onClick={verifyOtp}>Verify OTP</button>
          </div>
        )}
        <div>
        <button type="submit" className="Subbutton">{'SUBMIT'}</button>
        <p className="existigacc">Already have an account? <Link to="/Login">Login</Link></p>
        {errorMessage && <p style={{ color: '#ff0000', fontSize: '1.2em', marginTop: '10px' , textAlign: 'center'}}>{errorMessage}</p>}
      </div>
      </form>
     
      
        
    </div>
  );
};

export default CreateAccount;


