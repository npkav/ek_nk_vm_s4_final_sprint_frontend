import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

// Pages
import HomePage from './pages/HomePage'
import CustomerPage from './pages/CustomerPage'
import FeedbackPage from './pages/FeedbackPage'
import RepPage from './pages/RepPage'
import RolePage from './pages/RolePage'

// Components
import Navbar from './components/Navbar'

// Create a context for dark mode
import { createContext } from 'react'

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
})

function App() {
  // Check if user previously set dark mode preference
  const storedDarkMode = localStorage.getItem('darkMode') === 'true'
  const [darkMode, setDarkMode] = useState(storedDarkMode)

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode
      localStorage.setItem('darkMode', newMode.toString())
      return newMode
    })
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const themeContextValue = {
    darkMode,
    toggleDarkMode
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/customers" element={<CustomerPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/representatives" element={<RepPage />} />
              <Route path="/roles" element={<RolePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  )
}

export default App
