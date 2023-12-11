import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css'; // Import the CSS file
import image from './imagelogo.jpg'; // Import the image

const Payment = () => {
  const location = useLocation();
  const { patientDetails, appointmentDetails } = location.state || {};
  const hospId=appointmentDetails.hospId;
  const docId=appointmentDetails.docId;
  const name=appointmentDetails.name;
  const slotId=appointmentDetails.slotId;
  const date=appointmentDetails.date;
  const pname = patientDetails.pname;
  const age = patientDetails.age;
  const gender = patientDetails.gender;
  const mobile = patientDetails.mobile;
  const email = patientDetails.email;
  const complain = patientDetails.complain;
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, index) => currentYear + index);


  useEffect(() => {
    // Access the state passed from the previous page


    // Log the state to the console
    console.log('Patient Details:', patientDetails);
    console.log('Appointment Details:', appointmentDetails);
  }, [location.state]);

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [formDisabled, setFormDisabled] = useState(false);

  const isPaymentDataValid = () => {
    // Add your validation logic here
    return (
      cardholderName.trim() !== '' &&
      cardNumber.trim() !== '' &&
      expiryMonth !== '' &&
      expiryYear !== '' &&
      cvc.trim() !== ''
    );
  }; 

  const handleConfirmPayment = async () => {
    if (!isPaymentDataValid()) {
      toast.error('Please fill in all payment details.');
      return;
    }

    if (cvc.length !== 3) {
      toast.error('CVC must be 3 characters long.');
      return;
    }

    setFormDisabled(true);
    const e = localStorage.getItem('email');
   // Handle payment logic here
    await Axios.post('http://localhost:3001/patientdetails', {
      pname,
      age,
      gender,
      mobile,
      email,
      complain,
      hospId,
      docId,
      slotId,
      date,
      name,
      e,
    })
      .then((response) => {

        console.log(response.data);
      })
      .catch((error) => {
        if (Axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error submitting patient details:', error);
        }
  
        // Perform cleanup or connection closure logic here, if needed
        console.log('Connection closed or cleanup logic here');
      });
    // Perform any necessary actions when the user confirms payment
    // You can send this data to your server for processing, handle validations, etc.
    console.log('Payment confirmed:', {
      cardholderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
    });

    const bookingId = generateBookingId(); // You should implement your own logic to generate a booking ID
    // toast.success(`Booking confirmed! Booking ID: ${bookingId}`, {
    //   position: 'top-center',
    //   //autoClose: 5000, // Auto-close the notification after 5 seconds
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    // });
    
    toast.info(
      <div>
        <div>
          Booking confirmed!!!
        </div>
        <div>
         
        </div>
        <button onClick={() => redirectToOtherPage()} className="okay-button">Okay</button>
      </div>,
      {
        position: 'top-center',
        autoClose: false, // Don't auto-close
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      }
    );

    //alert(`Booking confirmed! Booking ID: ${bookingId}`);
  };

  const generateBookingId = () => {
    return Math.floor(Math.random() * 10000); // Dummy logic, replace with actual logic
  };

  const redirectToOtherPage = () => {
    // Replace 'other-page' with the actual route/path you want to redirect to
    // You may use React Router or other navigation methods based on your setup
    window.location.href = '/Home';
  };

  return (
    <div>
        
        <div className="pheader">
          <div className="logotop">
        <img src={image} alt="Logo" className='logoimgaccpage' />
        </div>
        
       </div>
         
      <div className="payment-container" style={{ borderRadius: '8px', padding: '20px', fontSize:'16px' }}>
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
  PAYMENT DETAILS
</h1>
        <label> 
          Cardholder Name:
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="rounded-input"
            disabled={formDisabled}

          />
        </label>
        <br />

        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="input-field rounded-input"
            disabled={formDisabled}

          />
        </label>
        <br />

        <label>
          Expiry Month:
          <select
            value={expiryMonth}
            onChange={(e) => setExpiryMonth(e.target.value)}
            className="dropdown-field rounded-input"
            
            disabled={formDisabled}
          >
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </label>
        <br />

        <label>
        Expiry Year:
        <select
          value={expiryYear}
          onChange={(e) => setExpiryYear(e.target.value)}
          className="dropdown-field rounded-input"
          disabled={formDisabled}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
        <br />

        <label>
          CVC:
          <input
            type="text"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="input-field rounded-input"
            disabled={formDisabled}

          />
        </label>
        <br />

        <button onClick={handleConfirmPayment} className="confirm-button" disabled={formDisabled}>
          Confirm Payment
        </button>
      </div>
      {/* ToastContainer is the container for the notifications */}
      <ToastContainer position="top-center" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Payment;
