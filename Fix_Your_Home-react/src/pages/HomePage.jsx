import React, { useState } from 'react';
import UserRegisterForm from '../components/UserRegisterForm.jsx';
import WorkerRegisterForm from '../components/WorkerRegisterForm.jsx';
import LoginForm from '../components/LoginForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function HomePage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('user');

  if (user) {
    return (
      <div style={styles.page}>
        <div style={styles.cardWide}>
          <header style={styles.headerRow}>
            <div>
              <h1 style={styles.brand}>Fix Your Home</h1>
              <p style={styles.subtitle}>
                Welcome back, <strong>{user.email}</strong> ({user.type}).
              </p>
            </div>
            <button style={styles.logoutButton} onClick={logout}>
              Log out
            </button>
          </header>

          <section style={{ marginTop: '24px' }}>
            {user.type === 'admin' && (
              <p style={styles.text}>
                You are logged in as <strong>Admin</strong>. You can manage all
                users, workers, and services from the admin section (to be built).
              </p>
            )}
            {user.type === 'worker' && (
              <p style={styles.text}>
                You are logged in as a <strong>Worker</strong>. Soon you can
                manage your services, bookings, and profile here.
              </p>
            )}
            {user.type === 'user' && (
              <p style={styles.text}>
                You are logged in as a <strong>User</strong>. Soon you can
                browse workers and book services from this dashboard.
              </p>
            )}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.brand}>Fix Your Home</h1>
        <p style={styles.subtitle}>
          Sign up as a user, sign up as a worker, or log in to your account.
        </p>

        {/* Modern tab row */}
        <div style={styles.tabRow}>
          <button
            type="button"
            onClick={() => setActiveTab('user')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'user' ? styles.tabButtonActive : {}),
            }}
          >
            User Sign Up
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('worker')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'worker' ? styles.tabButtonActive : {}),
            }}
          >
            Worker Sign Up
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            style={{
              ...styles.tabButton,
              ...(activeTab === 'login' ? styles.tabButtonActive : {}),
            }}
          >
            Login
          </button>
        </div>

        {/* Form area */}
        <div style={styles.formArea}>
          {activeTab === 'user' && <UserRegisterForm />}
          {activeTab === 'worker' && <WorkerRegisterForm />}
          {activeTab === 'login' && <LoginForm />}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a, #1f2937)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 16px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#0f172a',
  },
  card: {
    width: '100%',
    maxWidth: '960px',
    backgroundColor: '#f9fafb',
    borderRadius: '18px',
    padding: '24px 28px 28px',
    boxShadow:
      '0 18px 40px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(148, 163, 184, 0.3)',
  },
  cardWide: {
    width: '100%',
    maxWidth: '960px',
    backgroundColor: '#f9fafb',
    borderRadius: '18px',
    padding: '24px 28px 28px',
    boxShadow:
      '0 18px 40px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(148, 163, 184, 0.3)',
  },
  brand: {
    margin: 0,
    fontSize: '32px',
    fontWeight: 800,
    letterSpacing: '0.04em',
  },
  subtitle: {
    marginTop: '8px',
    marginBottom: '18px',
    fontSize: '14px',
    color: '#6b7280',
  },
  tabRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '18px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '10px',
    overflowX: 'auto',
  },
  tabButton: {
    border: 'none',
    backgroundColor: 'transparent',
    padding: '8px 18px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
  },
  tabButtonActive: {
    backgroundImage: 'linear-gradient(135deg, #2563eb, #4f46e5)',
    color: '#f9fafb',
    boxShadow: '0 8px 18px rgba(37, 99, 235, 0.4)',
    transform: 'translateY(-1px)',
  },
  formArea: {
    marginTop: '4px',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },
  logoutButton: {
    border: 'none',
    backgroundImage: 'linear-gradient(135deg, #ef4444, #f97316)',
    color: '#f9fafb',
    padding: '8px 18px',
    borderRadius: '999px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 10px 22px rgba(239, 68, 68, 0.55)',
    transition: 'transform 0.1s ease, box-shadow 0.1s ease',
  },
  text: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: 1.6,
  },
};
