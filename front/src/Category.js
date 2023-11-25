import React, { useState,useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Axios from "axios";

function Category({setCategory}) {
  const [ccategory, setCcategory] = useState('');
const [CategoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = () => {
        
    Axios.get("http://localhost:3001/Category")
      .then((response) => {
          setCategoryList(response.data);
        console.log('Response:', response); // Log the entire response object
     console.log('Data:', response.data); // Log the data
  
  })
      .catch((error) => {
        console.error(error);
      });
    };


  const handleChange = (event) => {
    setCategory(event.target.value);
    setCcategory(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="category-id">Speciality</InputLabel>
      <Select
        labelId="category-id"
        id="category"
        value={ccategory}
        label="Category"
        onChange={handleChange}
      >
        {CategoryList.map((category)=>(<MenuItem key={category} value={category}>
            {category}
          </MenuItem>))}
      </Select>
      
    </FormControl>
    
  );
}

export default Category;
