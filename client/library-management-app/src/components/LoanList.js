// LoanList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './LoanList.css';

const LoanList = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:163/api/loans', {
          headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });
        setLoans(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch loans');
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="loan-list">
      <h3>Loans</h3>
      {loans.map(loan => (
        <div key={loan.id} className="loan-card">
          <p><strong>User:</strong> {loan.User.nom}</p>
          <p><strong>Book:</strong>{loan.Book.titre}</p>
          <p><strong>Date Borrowed:</strong> {loan.dateEmprunt}</p>
          <p><strong>Date Returned:</strong> {loan.dateRetour || 'Not returned yet'}</p>
        </div>
      ))}
    </div>
  );
};

export default LoanList;
