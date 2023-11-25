import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import { React, useState } from "react";
import Axios from "axios";
import Login from './Login';
//import Homepage from './Homepage';
import ForgetPassword from './ForgetPassword';
import CreateAccount from './CreateAccount';
import Home from './Home';
import Search from './Search';
import Location from './Location';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = localStorage.getItem('userlogged');
  return isLoggedIn ? <Element {...rest} /> : <Navigate to="/CreateAccount" />;
};

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/CreateAccount" element={<CreateAccount/>} />
         {/* Protected routes under /Home */}
        <Route path="/Home" element={<PrivateRoute element={Home} />} />
        <Route path="/Search" element={<PrivateRoute element={Search} />} />
        <Route path="/Location" element={<PrivateRoute element={Location} />} />
        <Route path="/" element={<Navigate to = "/CreateAccount" />}/>
      </Routes>
    </Router>
  );
}

export default App;