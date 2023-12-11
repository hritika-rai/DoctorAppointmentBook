// Booking.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './Booking.css';

function Booking(props) {
  const { hospId, docId, name, hospname } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [noSlotsMessage, setNoSlotsMessage] = useState('');
  const [slot, setSlot] = useState('0');
  const data = { hospId: hospId, docId: docId, name: name, date: date, slot: slot, hospname: hospname, time: time };

  const [selected, setSelected] = useState(false);

  const handleGetSlots = async () => {
    try {
      if (!docId || !hospId || !selectedDate) {
        setNoSlotsMessage('Select a date first!.');
        return;
      }

      const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;

      const allSlotsResponse = await axios.get('http://localhost:3001/slot', {
        params: {
          docId,
          hospId,
          date: formattedDate,
        },
      });

      const availableSlotsResponse = await axios.get('http://localhost:3001/availableSlots', {
        params: {
          docId,
          hospId,
          date: formattedDate,
        },
      });

      const availableSlots = Array.isArray(availableSlotsResponse.data.availableSlots)
        ? availableSlotsResponse.data.availableSlots
        : [];

      setSlots(availableSlots);

      if (availableSlots.length === 0) {
        setNoSlotsMessage('No slots available for this day!');
      } else {
        setNoSlotsMessage('');
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setNoSlotsMessage('Error fetching slots. Please try again.');
    }
  };

  useEffect(() => {
    console.log('Slots:', slots);
    console.log(name);
  }, [slots]);

  useEffect(() => {
    console.log('t', time);
    console.log(data);
  }, [time, data]);

  const isSunday = (date) => date.getDay() === 0;
  const isPastDate = (date) => date < new Date();
  const disabledDates = { before: new Date(), daysOfWeek: [0] };

  const handleDateChange = (selectedDate) => {
    if (!selectedDate) {
      console.error('Selected date is undefined.');
      return;
    }

    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);

    if (!isSunday(selectedDateObj) && !isPastDate(selectedDateObj)) {
      const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
      setDate(formattedDate);
      setSelectedDate(selectedDateObj);
    }
  };

  const handle = () => {
    if (!time) {
      alert('Select a Slot first!!');
      return;
    }
  };

  const handleSlotClick = (clickedSlot) => {
    console.log(`Slot ${clickedSlot.slot_id} clicked!`);
    setSlot(clickedSlot.slot_id);
    setTime(clickedSlot.booking_time);
    setSelected(clickedSlot.slot_id); // Update the selected state
  };
  

  const handleBookNowClick = () => {
    if (!time) {
      alert('Select a Slot first!!');
      return;
    }
    // Add logic for handling Book Now click
  };

  return (
    <div className="booking-container">
      <div className="calendar-container">
      <label style={{ display: 'block', marginBottom: '10px', fontSize: '18px' }}>Choose Appointment Date</label>
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', width: '100%', height: '350px' }}>
    <DayPicker
      fixedWeeks
      mode='single'
      selected={selectedDate}
      selectedDates={[selectedDate]}
      onSelect={handleDateChange}
      initialFocus
      disabled={disabledDates}
      modifiers={{ selected: selectedDate }}
    />
  </div>

        <button  className="viewButton center-align-button" onClick={handleGetSlots}>
          View Available Slots
        </button>
        {noSlotsMessage && (
  <p style={{ color: 'red', fontSize: '16px', textAlign: 'center', marginTop: '10px' }}>
    {noSlotsMessage}
  </p>
)}      </div>

      <div className="buttons-container">
        {slots.length > 0 && (
          <div>
            <h2 style={{ fontSize: '20px', color: '#333' }}>Available Slots:</h2>
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {slots.map((slot) => (
                <li key={slot.slot_id} style={{ margin: '10px 0', textAlign: 'center' }}>
                  <button
                    className={`bookButton ${slot.slot_id === selected ? 'selected' : ''}`}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot.booking_time ?? 'N/A'}
                  </button>
                </li>
              ))}
            </ul>
            <div className='confirm' style={{ marginTop: '20px' }}>
              <Link to={time ? '/Patient' : '#' } state={data}>
              <button className={`bookButton center-align-button ${time ? 'active' : ''}`} onClick={handleBookNowClick}>
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;