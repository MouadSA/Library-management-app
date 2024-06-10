import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import './UserDashboard.css'; // Import the CSS file

const UserDashboard = ({ handleSignOut, userName }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:163/api/books', {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch books');
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('userName');
    handleSignOut();
    navigate('/');
  };

  const reserveBook = async (bookId) => {
    try {
      const response = await axios.post(`http://localhost:163/api/books/${bookId}/reserve`, {}, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        }
      });
      if (response.status !== 201) {
        throw new Error('Failed to reserve book');
      }
      const updatedBooks = books.map(book =>
        book.id === bookId ? { ...book, disponible: false } : book
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error reserving book:', error);
    }
  };

  if (!userName) {
    navigate('/');
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>User Dashboard</h2>
        <p>Hey {userName}, welcome to your dashboard!</p>
        <button className="logout-button" onClick={handleLogout}>Sign Out</button>
      </header>
      <main>
        <h3>List of Books:</h3>
        <div className="books-list">
          {books.map(book => (
            <div key={book.id} className="book-card">
              <h4>{book.titre}</h4>
              <p><strong>Auteur:</strong> {book.auteur}</p>
              <p><strong>Année de Publication:</strong> {book.anneePublication}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Résumé:</strong> {book.resume}</p>
              <p><strong>Disponible:</strong> {book.disponible ? 'Oui' : 'Non'}</p>
              {book.disponible && (
                <button className="reserve-button" onClick={() => reserveBook(book.id)}>Reserve</button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

