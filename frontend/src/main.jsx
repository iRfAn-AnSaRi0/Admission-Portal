import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'
// import { AuthProvider } from './context/AuthContext.js'

createRoot(document.getElementById('root')).render(
 
  <StrictMode>
    <App />
  </StrictMode>,
)
