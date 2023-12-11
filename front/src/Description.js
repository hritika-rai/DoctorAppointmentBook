import React, { useState,useEffect } from 'react';

import { Link, useParams ,navigate, useNavigate} from 'react-router-dom';


import Axios from "axios";
import Booking from "./Booking";
import './Description.css';
import image from './imglogo.png';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
 
import AddLocationIcon from '@mui/icons-material/AddLocation';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';


function Description() {
  const [showBooking, setShowBooking] = useState(false);
const [result,setResult]=useState([]);
const [hospitals,setHospitals]=useState([]);
const [hospid,setHospid]=useState(0);
const[hospname,setHospname]=useState("");
const[name,setName]=useState("");
  const {id} = useParams();
  let f=0;
  console.log({id});

  useEffect(() => {
      getInformation();
       getInformation2();
      
     
   }, [hospid]);
   const logout = () => {
    localStorage.removeItem('userlogged');
    localStorage.removeItem('username');
    //navigate('/Login');
  };
  
  const getInformation = () => {
      Axios.get("http://localhost:3001/GetDoctor",{ params: {id } })
        .then((response) => {
      //    setResult(response.data[0][4]);
          setResult(response.data);
          const data = response.data[0];
        setName(data[0]); // Log the entire response object
        console.log('name2', name); // Log the data
          console.log("out",result);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getInformation2 = () => {
      Axios.get("http://localhost:3001/GetHospitals",{ params: {id } })
        .then((response) => {
      //    setResult(response.data[0][4]);
          setHospitals(response.data);
          const data = response.data[0];
        console.log('Response:', data); // Log the entire response object
          console.log('Data:', response.data); // Log the data
          console.log("out",result);
        })
        .catch((error) => {
          console.error(error);
        });
    };




    const displayHospital = () => {
      return hospitals.map((val, key) => {
        const isSelected = hospid === val[0]; // Check if the hospital is selected
    
        return (
          <div key={key} style={{ display: 'flex' }}>
            <div>
              <button
                onClick={() => {
                  setHospid(val[0]);
                  setHospname(val[1]);
                  console.log(hospid);
                  setShowBooking(!showBooking);
                }}
                className='hospbutton'
                style={{
                  backgroundColor: isSelected ? '#071ED9' : '#3498db', // Replace with your colors
                  color: isSelected ? 'white' : 'white', // Replace with your colors
                }}
              >
                {val[1]}
              </button>
            </div>
            <div className='day'>
              <p>Day: {val[2]}</p>
            </div>
          </div>
        );
      });
    };

    const displayAll = () => {
  
     
      return (result.map((val, key) => {
          return (
         <div >
            <div  key={key}>
              <div  className="docContainer">
              <div className="dinfo">
              <div className="rightcolummn">
                <div className="imgname"><div><img src={val[6]} alt="Image" style={{ width: '200px', height: '200px',borderBlock:'solid',borderBlockColor:'black', }} /> </div> <div  classname="docname">
              

              <div className="name" style={{paddingLeft:'18px'}}>{val[0]}</div>
               {/* <div>{val[1]}</div> */}
               <div style={{paddingLeft:'25px'}}>{val[2]}</div>
               
               </div> </div>
              
              </div>
              <div className="reviewContainer">
  <div className="review-value" >
    <strong>Rating:</strong> {val[5]} ⭐️
  </div>
  <div className="review-value">
    Reviews: {val[8]} + 🌟
  </div>
  <div className="review-value">
    Patients treated: {val[9]} + 👨‍⚕️
  </div>
  <div className="review-value">
    Experience: {val[10]} + ⌛️
  </div>
</div>

       <div>
       <div className="description">{val[7]}</div>
       
       <div><strong>🌟 Review: </strong>{val[4]}</div>
       </div>
       
       </div>
             
           
            
              
       <div className="leftcolumn2">   
               <div className='fees' style={{color:'white'}}>Fees:{val[3]}/-</div>
               </div> 
             
              
              
              
               {/* <Link to={`/Cart`} state={data} onClick={handleAddToCart}><button>Add To Cart</button></Link>
               */}
  
   
             
              </div>
            </div>
            
          
            </div>
          )
        })
        

      )
      };

  return (

   
    <div className="dmain">
  <div className="headerSearch">
          <div className="logotop">
            <img src={image} alt="Logo" className="logoimgdocpage" />
          </div>
         
         
        </div>
       
      <div classname="d">
      {displayAll()}
      </div>
      <div className="h">
     
        <div >
        {/* <p className='meet'><strong> Where do you want to meet the doctor?</strong></p> */}
      {displayHospital()}</div>
      <div>
     {showBooking && <Booking docId={id} hospId = {hospid} name={name} hospname={hospname} />}</div>
      </div>
      
    </div>
  );
}

export default Description;
