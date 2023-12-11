import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import image from './imagelogo.jpg';
import './PatientDetails.css';

function Patient() {
  const l = useLocation();
  const data = l.state;
 const hospId=data.hospId;
  const docId=data.docId;
  const name=data.name;
   const slotId=data.slot;
  const date=data.date;

  
const navigate = useNavigate();

  useEffect(() => {
    // Set state values after the component mount
    console.log("here",data);
     console.log("hospId",hospId);
     console.log("docId",docId);
     console.log("name",name);
     console.log("slotId",slotId);
     console.log("date",date);

  }, [data]);


// PatientDetails.js
  const [pname, setPName] = useState('');
  const [age, setAge] = useState(new Date());
  const [gender, setGender] = useState(''); // 'Male', 'Female', 'Others'
  const [mobile, setMobile] = useState(0);
  const [email, setEmail] = useState('');
  const [complain, setComplain] = useState('');

  const isNotEmpty = (value) => value.trim() !== '';

// Validate if a string is a valid email address
const isValidEmail = (value) => /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);

// Validate if a mobile number is 11 digits
const isValidMobile = (value) => /^\d{11}$/.test(value);

// Validate if the age is a valid date
const isValidDate = (value) => !isNaN(new Date(value).getTime());

  const handlePayNow = () => {
    // Validate inputs before navigating
    if (
      !isNotEmpty(pname) ||
      !isNotEmpty(email) ||
      !isNotEmpty(complain) ||
      !isValidEmail(email) ||
      !isValidMobile(mobile) ||
      !isValidDate(age)
    ) {
      alert('Please fill in all the required fields correctly.');
      return; // Do not proceed if validations fail
    }

    // Collect patient details
    const patientDetails = {
      pname,
      age,
      gender,
      mobile,
      email,
      complain,
    };

    // Collect appointment details
    const appointmentDetails = {
      slotId,
      date,
      hospId,
      name,
      docId,
    };

    // Navigate to the Thankyou page with the provided data
    navigate('./Payment', {
      state: {
        patientDetails,
        appointmentDetails,
      },
    });
  };




  const validateMobile = (value) => {
    const isValid = /^\d{11}$/.test(value);
    return isValid ? "" : "Mobile number must be 11 digits";
  };

  return (
    
<div>
<div className="pheader">
          <div className="logotop">
        <img src={image} alt="Logo" className='logoimgaccpage' />
        </div>
        
       </div>

  <div className="patient-details-container" style={{ borderRadius: '8px', padding: '20px', fontSize:'16px' }}>
  <h1
  className="patient"
  style={{
    margin: '0',
    fontSize: '2em',
    marginBottom: '15px',
    textAlign: 'center',  // Align to the center
    fontFamily: 'Times New Roman',  // Set font family to Times New Roman
  }}
>
  PATIENT DETAILS
</h1>
    <form className="patient-form">
      <label htmlFor="name">Patient's Name:</label>
      <input
        type="text"
        id="name"
        className="input-field patient-name-input"
        value={pname}
        onChange={(e) => setPName(e.target.value)}
        required
        style={{ borderRadius: '8px'} }
      />

      <label htmlFor="age">Age:</label>
      <input
        type="date"
        id="age"
        className="input-field patient-age-input"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />

      <label>Gender:</label>
      <div className="gender-radio-container" style={{ fontSize: '0.8em', marginTop: '5px' }}>
        <label htmlFor="male" style={{ marginRight: '10px' }}>Male</label>
        <input
          type="radio"
          id="male"
          name="gender"
          className="gender-radio-input"
          value="Male"
          onChange={(e) => setGender(e.target.value)}
          required
          style={{ marginRight: '20px', fontSize: '0.8em' }}
        />

        <label htmlFor="female" style={{ marginRight: '10px' }}>Female</label>
        <input
          type="radio"
          id="female"
          name="gender"
          className="gender-radio-input"
          value="Female"
          onChange={(e) => setGender(e.target.value)}
          required
          style={{ marginRight: '20px', fontSize: '0.8em' }}
        />

        <label htmlFor="others" style={{ marginRight: '10px' }}>Others</label>
        <input
          type="radio"
          id="others"
          name="gender"
          className="gender-radio-input"
          value="Others"
          onChange={(e) => setGender(e.target.value)}
          required
          style={{ fontSize: '0.8em' }}
        />
      </div>

      <label htmlFor="mobile">Mobile Number: <span style={{ color: '#ff0000', fontSize: '0.7em', marginTop: '5px', display: 'block' }}>{validateMobile(mobile)}</span></label>
      <input
        type="number"
        id="mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        pattern="\d{11}"
        required
        title="Mobile number must be 11 digits"
        style={{ borderRadius: '8px' }}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        className="input-field email-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ borderRadius: '8px' }}
      />

      <label htmlFor="complain">Presenting Complain:</label>
      <textarea
        id="complain"
        className="input-field complain-textarea"
        value={complain}
        onChange={(e) => setComplain(e.target.value)}
        required
        style={{ borderRadius: '8px' }}
      ></textarea>

      <div className="button-container">
        <button className="pay-now-button" onClick={handlePayNow}>
          Pay Now
        </button>
      </div>
    </form>
  </div>
</div>

  );
};



export default Patient;

