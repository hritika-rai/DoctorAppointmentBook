import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from "axios";
import Slider from 'rc-slider';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import 'rc-slider/assets/index.css';
import image from './imagelogo.jpg';
import './Search.css';


function Search(props) {
  const l = useLocation();
  const data = l.state;
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [displayList, setDisplayList] = useState([]);
  const [priceRange,setPriceRange]=useState(0);
 // const Range = Slider.Range;
 const [value, setValue] = useState(0);
 const [feesValue, setFeesValue ]=useState(5000);

  useEffect(() => {
    // Set state values after the component mount
    setCategory(data.category[0]);
    setLocation(data.location[0]);
    getDoctors(data.location[0], data.category[0]);

    // Add event listener for unload to handle logout when the page is closed
    window.addEventListener('unload', handleUnload);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener('unload', handleUnload);
    };

  }, [data]); // Include location and category in the dependency array

  const handleUnload = () => {
    // Perform logout actions when the page is unloaded (closing the application)
    localStorage.removeItem('userlogged');
  };

  const getDoctors = async (location, category) => {
    try {
      console.log("in", location);
      console.log("in", category);

      const response = await Axios.get("http://localhost:3001/doctors", { params: { location, category } });

      console.log("response", response.data);
      console.log("r", response.data[0]);

      setDisplayList(response.data);
      
      console.log("list", response.data); // Log the updated data directly

    } catch (error) {
      console.error("Error fetching doctors:", error);
      // Handle the error or set an error state if needed
    }
  };

  const OnChangeEventTriggerd = (newValue) => {
    console.log("new Value", newValue);
    setValue(newValue);
  };

  const handleClick = () => {
     setFeesValue(value);
    console.log("fees Value", feesValue);
    
  };
  
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userlogged');
    navigate('/Login');
  };
  
  const displayAll = () => {
    return displayList.filter((val)=>{
      if (search == '' && feesValue==5000) {
        console.log("1");
         return val;}
       else  if (search == '' && val[2]<=feesValue) {
        console.log("2");
          return val;}
         else if (val[0].replace(/\s/g, "").toUpperCase().includes(search.replace(/\s/g, "").toUpperCase()) && val[2]<=feesValue)
                   {
                 return val;
                }
                else if (val[1].replace(/\s/g, "").toUpperCase().includes(search.replace(/\s/g, "").toUpperCase()) && val[2]<=feesValue )
                   {
                 return val;
                }
         
                 // Return an empty array if no match found
                 
              }) .map((val, key) => {
                return(
                  <div >
      <div className="doctor" key={key}>
        <div className="left-column" >
          <div className="imagedoc">
        <img src={val[5]} alt="Image"  className="docimg" style={{ width: '100px', height: 'auto' }} />
        </div>
        <div className="doctorInfo">
         <div className="docname"><h1>{val[0]}</h1> </div>
         <div className="docspeciality"><h3>{val[1]}</h3></div>
          <div>Fees: {val[2]}</div>
          {/* <div>Reviews: {val[3]}</div>  */}
           <div>Rating: {val[4]}</div>
          </div>
        
          </div>
          <div className="right-column">
          <button className='docbutton'>VIEW PROFILE</button>
          </div>
        </div>
      </div>);
  });
  };
 
  return (
    <div>
      <div className="containerSearch">
        <div className="headerSearch">
          <div className="logotop">
            <img src={image} alt="Logo" className="logoimgdocpage" />
          </div>
          <div className="bar">
            <input
              className="searchBar"
              type="text"
              placeholder="Search here"
              onChange={(e) => setSearch(e.target.value)}
            />
            <PersonSearchIcon className="searchIcon" />
          </div>
          <div className="header-icons">
            <button onClick={logout}>Log out</button>
          </div>
        </div>
        <div className="priceFilter">
          <h2 style={{ marginLeft: '20px' }}>Filter By Fees</h2>
          <Slider value={value} min={0} max={5000} onChange={OnChangeEventTriggerd} />
          <p style={{ marginLeft: '20px' }}>Fees Less than: <strong>{value}</strong></p>
          <button className="appbutt" onClick={handleClick} style={{ marginLeft: '20px' }}>Apply</button>
        </div>
      </div>
      {displayAll()}
    </div>
  );

}

export default Search;