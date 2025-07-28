// src/App.js
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTitle, setActiveTitle] = useState(''); // 🆕 título actual del card

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <SettingsProvider>
      <div className={`grid-container ${darkMode ? 'dark' : 'light'}`}>
        <Header 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          activeTitle={activeTitle}
        />
        <Home setActiveTitle={setActiveTitle} />
      </div>
    </SettingsProvider>
  );
}

export default App;
