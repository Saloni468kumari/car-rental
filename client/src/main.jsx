import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/AppContext.jsx'
import { MotionConfig } from 'motion/react'

// Entry point of the React app
createRoot(document.getElementById('root')).render(
  // React Router wrapper for navigation
  <BrowserRouter>
    {/* Global app context provider */}
    <AppProvider>
      {/* MotionConfig for animation settings */}
      <MotionConfig viewport={{ once: true }}>
        {/* Main App component */}
        <App />
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>,
)
