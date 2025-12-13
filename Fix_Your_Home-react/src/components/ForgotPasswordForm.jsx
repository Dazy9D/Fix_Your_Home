import { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('/api/forgot-password', { email });
      setMsg('Reset link sent if email exists');
    } catch {
      setMsg('Unable to send reset link');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Forgot Password</h2>
      {msg && <p>{msg}</p>}
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      </div>
      <button type="submit">Send reset link</button>
    </form>
  );
}
