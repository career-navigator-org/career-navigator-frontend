import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from '../../features/auth/AuthPage';
import GraphPage from '../../features/graph/GraphPage';
import ProfilePage from '../../features/profile/ProfilePage';
import MainLayout from '../layouts/MainLayout';
import PrivateRoute from './ui/PrivateRoute';
import PublicRoute from './ui/PublicRoute';

const AppRouter = () => {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });

  const handleUserData = (data) => {
    console.log('Данные из онбординга:', data); 
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <AuthPage onComplete={handleUserData} />
              </PublicRoute>
            } 
          />

          <Route 
            path="/skills" 
            element={
              <PrivateRoute>
                <GraphPage userData={userData} />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <ProfilePage userData={userData} />
              </PrivateRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;