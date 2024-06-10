// AdminDashboard.js
import React from 'react';
import BookList from './BookList.js';
import LoanList from './LoanList.js';
import UserList from './UserList.js';
import './AdminDashboard.css'; // Import CSS for styling

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2>Admin Dashboard</h2>
      </header>
      <main>
        <section>
          <h3>Books</h3>
          <BookList />
        </section>
        <section>
          <h3>Loans</h3>
          <LoanList />
        </section>
        <section>
          <h3>Users</h3>
          <UserList />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
