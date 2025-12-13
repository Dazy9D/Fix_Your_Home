import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordForm({ token, emailFromLink }) {
  const [form, setForm] = useState({
    email: emailFromLink || '',
    password: '',
    password_confirmation: '',
  });
  const [msg, setMsg] = useState('');

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('/api/reset-password', {
        ...form,
        token,
      });
      setMsg('Password reset successful');
    } catch {
      setMsg('Password reset failed');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Reset Password</h2>
      {msg && <p>{msg}</p>}
      <div>
        <label>Email</label>
        <input name="email" value={form.email} onChange={onChange} type="email" required />
      </div>
      <div>
        <label>New Password</label>
        <input
          name="password"
          value={form.password}
          onChange={onChange}
          type="password"
          required
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={onChange}
          type="password"
          required
        />
      </div>
      <button type="submit">Reset</button>
    </form>
  );
}
