// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* both / and /login show the same HomePage with tabs */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
