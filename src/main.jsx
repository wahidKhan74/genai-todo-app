import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

/**
 * Entry point
 *
 * Mounts the React application and wraps it with `BrowserRouter` so `App`
 * can use declarative routing. Keep this file minimal — most app logic
 * should live inside `src/App.jsx` and page/components files.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
