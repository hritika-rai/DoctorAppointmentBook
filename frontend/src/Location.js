import React, { useState,useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Axios from "axios";

function Location({setLocation}) {
  const [clocation, setcLocation] = useState('');
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
        console.log("here!!");
    Axios.get("http://localhost:3001/Location")
      .then((response) => {
          setLocationList(response.data);
        console.log('Response:', response); // Log the entire response object
     console.log('Data:', response.data); // Log the data
  
  })
      .catch((error) => {
        console.error(error);
      });

     

  };

  const handleChange = (event) => {
    setLocation(event.target.value);
    setcLocation(event.target.value);
  };
     
  return (
    <FormControl fullWidth>
      <InputLabel id="location-id">Location</InputLabel>
      <Select
        labelId="location-id"
        id="location"
        value={clocation}
        label="Location"
        onChange={handleChange}
      >
        {locationList.map((location) => (
          <MenuItem key={location} value={location}>
            {location}
          </MenuItem>
        ))}
      </Select>
      
    </FormControl>
    
  );
}

export default Location;
