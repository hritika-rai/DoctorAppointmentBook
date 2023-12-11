import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    console.log('userEmail in useEffect:', userEmail);

    Axios.get(`http://localhost:3001/notifications?email=${userEmail}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  }, [userEmail]);

  const handleDelete = async (index, notificationId) => {
    try {
      console.log('Deleting notification with ID:', notificationId);

      await Axios.delete(`http://localhost:3001/notifications/${notificationId}`);

      const updatedNotifications = [...notifications];
      updatedNotifications.splice(index, 1);

      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  // ...

return (
  <div>
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(to bottom, #071ED9, #007AD9)',
        padding: '20px',
        textAlign: 'center',
        width: '100vw',
        boxSizing: 'border-box',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <h1 style={{ color: '#fff' }}>Notifications</h1>
    </div>
    <div>
      {notifications.map(([notificationId, message], index) => (
        <div
          key={index}
          style={{
            background: '#a0d1f2',
            padding: '10px',
            margin: '10px',
            position: 'relative',
            borderRadius: '10px'
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              cursor: 'pointer',
              color: '#888',
            }}
            onClick={() => handleDelete(index, notificationId)}
          >
            &#x2715;
          </span>
          <p>{message}</p>
        </div>
      ))}
    </div>
  </div>
);

// ...

};

export default Notification;
