import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './app/routes/AppRouter'  
import { AuthProvider } from './app/providers/AuthProvider'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
)