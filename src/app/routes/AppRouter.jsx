import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from '../../features/auth/AuthPage'
import GraphPage from '../../features/graph/GraphPage'
import ProfilePage from '../../features/profile/ProfilePage'  
import MainLayout from '../layouts/MainLayout'
import PrivateRoute from './ui/PrivateRoute'
import PublicRoute from './ui/PublicRoute'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <PublicRoute>
                <GraphPage />
            </PublicRoute>
          } />
          
          <Route path="/skills" element={
            <PrivateRoute>
      
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter  
// <AuthPage /> <ProfilePage /> - закинул сюда свои работы для того чтобы свичится пока так :D