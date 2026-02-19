import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const isAuthenticated = false
  
  return !isAuthenticated ? children : <Navigate to="/skills" />
}

export default PublicRoute