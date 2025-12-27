import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/navigation.css'
import App from './App'

// export const backendUrl = 'http://localhost:3000'; 
export const backendUrl = 'https://focus-flow-backend-omega.vercel.app';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
