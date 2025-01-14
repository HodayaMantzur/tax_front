import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // שמירת רשימת המשתמשים
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token'); // שליפת הטוקן מה-localStorage
        if (!token) {
          setError('Unauthorized. Please login first.');
          navigate('/login');
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/transactions/admin_dashboard/', {
          headers: {
            Authorization: `Bearer ${token}`, // שליחת הטוקן בכותרת הבקשה
          },
        });

        setUsers(response.data.users); // שמירת המשתמשים ב-state
      } catch (err) {
        console.error(err);
        setError('Failed to fetch users. Make sure you are logged in as an admin.');
      }
    };

    fetchUsers();
  }, [navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} (ID: {user.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;