import React, { useState } from 'react';
import { Link, useLocation , useNavigate,Navigate} from 'react-router-dom';
import Location from './Location';
import Category from './Category';
import Axios from 'axios';
import image from './imagelogo.jpg'; // Import the image
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import './Home.css'; // Import the stylesheet

function Home() {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const data = { location, category };
  const navigate = useNavigate();
  const l = useLocation();
  const { state } = l;

  // Access the username from location.state
  //const username = state ? state.username : null;

  const logout = () => {
    localStorage.removeItem('userlogged');
    localStorage.removeItem('username');
    navigate('/Login');
  };
  
  const handleClick = () => {
    if (!location) {
      // If location is not set, display an error message
      setErrorMessage('Please select your location');
    } else {
      // Location is set, reset error message
      setErrorMessage('');
    }
  };
  
  const handleNotificationClick = () => {
    navigate('/notification');
  };

  return (
    <div className="containerhome">
      <div className="headerhome">
        <div className="header-icons">
        <NotificationsOutlinedIcon
          onClick={handleNotificationClick}
          style={{ cursor: 'pointer' }}
          // Add styles for hover effect
          onMouseEnter={() => { document.body.style.cursor = "pointer"; }}
          onMouseLeave={() => { document.body.style.cursor = "default"; }}
      />          
      <SettingsOutlinedIcon />
          <button onClick={logout}>log out</button>
        </div>
        <div className="logo">
          {/* Your logo content goes here */}
          <div className="welcome-message">WELCOME , {localStorage.getItem("username")}!</div>
          <img src={image} alt="Logo" className='logoimg' />
        </div>
      </div>
      <div className="content">
        <div className="tabs-container">
        <div className="tab location-tab">
            <Location setLocation={setLocation} />
            <AddLocationIcon className="location-icon" />
          </div>
          <div className="tab category-tab">
            <Category setCategory={setCategory} />
          </div>
         
        </div>
        <Link to={location ? '/Search' : '#'} state={data}>
          <button className="homebut" onClick={handleClick}>FIND ME A DOCTOR</button>
        </Link>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Home;