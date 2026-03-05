import React, { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import UsersPage from './pages/UsersPage';

const App: FC = () => (
  <BrowserRouter>
    <Navbar />
    <main>
      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/users"    element={<UsersPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
