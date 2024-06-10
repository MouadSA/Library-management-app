import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateBookForm.css'; // Import the CSS file

const UpdateBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    titre: '',
    auteur: '',
    anneePublication: '',
    genre: '',
    resume: '',
    disponible: false
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:163/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
        setError('Failed to fetch book details');
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:163/api/books/${id}`, book);
      navigate('/admin');
    } catch (error) {
      console.error('Error updating book:', error);
      setError('Failed to update book');
    }
  };

  return (
    <div className="update-book-form">
      <h2>Update Book</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="titre" value={book.titre} onChange={handleChange} required />
        </label>
        <label>
          Author:
          <input type="text" name="auteur" value={book.auteur} onChange={handleChange} required />
        </label>
        <label>
          Year of Publication:
          <input type="number" name="anneePublication" value={book.anneePublication} onChange={handleChange} required />
        </label>
        <label>
          Genre:
          <input type="text" name="genre" value={book.genre} onChange={handleChange} required />
        </label>
        <label>
          Summary:
          <textarea name="resume" value={book.resume} onChange={handleChange} required />
        </label>
        <label>
          Available:
          <input type="checkbox" name="disponible" checked={book.disponible} onChange={() => setBook({ ...book, disponible: !book.disponible })} />
        </label>
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBookForm;
