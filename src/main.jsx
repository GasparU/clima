import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/css/index.css'
import { ThemeContextProvider } from './context/ThemeContext'
// if (!navigator.geolocation) {
//   alert("Tu navegador no tiene opcion de geolocation")
//   throw new error("Tu navegador no tiene opcion de geolocation")
// }

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
)
