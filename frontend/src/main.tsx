import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContentProvider } from './context/AuthContext.js'
import { SocketContextProvider } from './context/SocketContext.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContentProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContentProvider>
    </BrowserRouter>
  </StrictMode>,
)
