import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import HomePage from './pages/HomePage';
import ProfileDetailPage from './pages/ProfileDetailPage';
import ProfilesListPage from './pages/ProfilesListPage';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ProfileProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profiles" element={<ProfilesListPage />} />
            <Route path="/profile/:id" element={<ProfileDetailPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ProfileProvider>
  );
}

export default App;