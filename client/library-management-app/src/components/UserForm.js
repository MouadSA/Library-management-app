// UserForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './UserForm.css';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    role: 'utilisateur' // Default role
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:163/api/users/${id}`, {
            headers: {
              'Authorization': `Bearer ${Cookies.get('token')}`
            }
          });
          setFormData(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch user');
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:163/api/users/${id}`, formData, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
      } else {
        await axios.post(`http://localhost:163/api/users`, formData, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
      }
      navigate('/admin'); // Navigate back to the admin dashboard
    } catch (error) {
      console.error('Error saving user:', error);
      setError('Failed to save user');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-form-container">
      <h2>{id ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="utilisateur">User</option>
            <option value="administrateur">Admin</option>
          </select>
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
