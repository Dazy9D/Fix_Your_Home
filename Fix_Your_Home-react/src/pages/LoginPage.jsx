import React from 'react';
import LoginForm from '../components/LoginForm.jsx';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div style={{ maxWidth: '500px', margin: '40px auto' }}>
      <LoginForm />
      <p style={{ marginTop: '10px' }}>
        New here? <Link to="/">Go to homepage to sign up</Link>
      </p>
    </div>
  );
}
