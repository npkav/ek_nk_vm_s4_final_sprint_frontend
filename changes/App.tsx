import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import CustomerPage from './pages/CustomerPage';
import FeedbackPage from './pages/FeedbackPage';
import RepPage from './pages/RepPage';
import RolePage from './pages/RolePage';

// Components
import Navbar from './components/Navbar';

// Services
import { customerService } from './services/customerService';
import { issueService } from './services/issueService';

// Types
import type { Customer, Issue } from './types';

// Create a context for dark mode
export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

function App() {
  // Check if user previously set dark mode preference
  const storedDarkMode = localStorage.getItem('darkMode') === 'true';
  const [darkMode, setDarkMode] = useState(storedDarkMode);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [refresh, setRefresh] = useState(0);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    loadInitialData();
  }, [refresh]);

  const loadInitialData = async () => {
    try {
      const [customersData, issuesData] = await Promise.all([
        customerService.getAllCustomers(),
        issueService.getAllIssues()
      ]);
      setCustomers(customersData);
      setIssues(issuesData);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  const refreshData = () => {
    setRefresh(prev => prev + 1);
  };

  const themeContextValue = {
    darkMode,
    toggleDarkMode
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/customers" element={<CustomerPage customers={customers} refreshData={refreshData} />} />
              <Route 
                path="/feedback" 
                element={<FeedbackPage 
                  customers={customers} 
                  issues={issues} 
                  refreshData={refreshData} 
                />} 
              />
              <Route path="/representatives" element={<RepPage />} />
              <Route path="/roles" element={<RolePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;