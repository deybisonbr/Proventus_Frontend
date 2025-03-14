import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/reset.css'
import App from './App.jsx'
import Toast from './components/FlashMessages/Toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toast />
    <App />
  </StrictMode>,
)
