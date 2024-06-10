import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BookList.css'; // Import the CSS file

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:163/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:163/api/books/${bookId}`);
      setBooks(books.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUpdate = (bookId) => {
    navigate(`/admin/edit-book/${bookId}`);
  };

  return (
    <div className="book-list-container">
      <h2>Books</h2>
      <ul className="book-list">
        {books.map(book => (
          <li key={book.id} className="book-item">
            <div className="book-details">
              <h3>{book.titre}</h3>
              <p><strong>Author:</strong> {book.auteur}</p>
              <p><strong>Year of Publication:</strong> {book.anneePublication}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Summary:</strong> {book.resume}</p>
              <p><strong>Available:</strong> {book.disponible ? 'Yes' : 'No'}</p>
            </div>
            <div className="book-buttons">
              <button className="update-button" onClick={() => handleUpdate(book.id)}>Update</button>
              <button className="delete-button" onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
