import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/Login.jsx';
import Register from './components/Register.js';
import AdminDashboard from './components/AdminDashboard.js';
import UserDashboard from './components/UserDashboard.js';
import UserForm from './components/UserForm.js';
import BookEditForm from './components/UpdateBookForm.js'; // Import BookEditForm
import UpdateBookForm from './components/UpdateBookForm.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUserName = Cookies.get('userName');
    const storedUserRole = Cookies.get('userRole');

    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);

      if (storedUserRole === 'administrateur') {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleSignIn = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const handleSignOut = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
    Cookies.remove('userRole');
    Cookies.remove('userId');
    
    setIsLoggedIn(false);
    setUserName('');
    setIsAdmin(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleSignIn={handleSignIn} />} />
        <Route path="/register" element={<Register />} />

        {isAdmin ? (
          <>
            <Route path="/admin" element={<AdminDashboard handleSignOut={handleSignOut} userName={userName} />} />
            <Route path="/admin/edit-user/:id" element={<UserForm />} />
            <Route path="/admin/edit-book/:id" element={<UpdateBookForm />} /> // Add this line
          </>
        ) : (
          <>
            <Route
              path="/dashboard"
              element={
                isLoggedIn ? (
                  <UserDashboard handleSignOut={handleSignOut} userName={userName} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/user/edit/:id" element={<UserForm />} /> // Add this line
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
