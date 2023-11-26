import React,{useEffect, useState} from 'react';
import './App.css';
import Axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate, useLocation} from 'react-router-dom';
import image from './imagelogo.jpg';
import './Login.css';

function Login() {
  const [userlogged, setUserLogged] = useState(localStorage.getItem('userlogged'));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const location = useLocation();

  const navigate = useNavigate();
  useEffect(() => {
    console.log(userlogged);
    const storedData = localStorage.getItem('userlogged');
    console.log('localStorage content in useEffect:', storedData);
    if (storedData) {
      setUserLogged(true);
    }
  }, [userlogged]);

  const handleLogin = () => {
    // Assuming your backend API endpoint for login is http://localhost:3001/login
    Axios.post("http://localhost:3001/login", {
      email: email,
      pass: password,
    })
    .then((response) => {
      // Successful login logic on the frontend
      console.log(response.data);
      localStorage.setItem('userlogged', true);
      console.log('After localStorage update:', localStorage.getItem('userlogged'));
      setUserLogged(true);
      try {
        Axios.post('http://localhost:3001/getUsername', {
          email: email,
        })
        .then((response) => {
        setUsername(response.data[0]);
        setErrorMessage('');
        console.log('val',response.data[0]);
        console.log(username);
        //navigate('/Homepage');
        
        navigate('/Home');
        localStorage.setItem('username', response.data[0]);
        setErrorMessage('Succesful Login');
        } )
      }
      catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error fetching username. Please try again.');
      }

      
    })
    .catch((error) => {
      // Display error message
      setErrorMessage('Incorrect email or password');
    });
  };

  const getUser = async () => {
    
  };


  return (
    <div>
      <div className="headerLogin">
      <div className="logotop">
        <img src={image} className='logoimgaccpage' />
        <h2 style={{ color: 'white' }}>HEALTH HUB</h2>

        </div>
        </div>
        <div className='logForm'>
      <h2>Login Form</h2>
      <div>
      <label>Email:</label>
        <input
          type="text"
          value={email}
          className="i1"
          placeholder="abc@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      
      
        <label>Password: </label>
        <input
          type="password"
          value={password}
          className="i1"
          placeholder="****"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin} className="Logbutton">Login</button>
      {errorMessage && <p>{errorMessage}</p>}
      <Link to="/ForgetPassword">Forget Password</Link>
      <Link to="/CreateAccount">Create Account</Link>
    </div>
    </div>
  );
};


export default Login;