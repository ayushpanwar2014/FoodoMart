import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import StoreContextProvider from './Context/StoreContext.jsx'
import { ProgressProvider } from './Context/ProgressContext.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <ProgressProvider>
    <StoreContextProvider>
      <StrictMode>
        <App />
      </StrictMode>,
    </StoreContextProvider>
  </ProgressProvider>
  </BrowserRouter>
)
