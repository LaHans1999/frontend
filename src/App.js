// src/App.js
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTitle, setActiveTitle] = useState(''); // 🆕 título actual del card

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`grid-container ${darkMode ? 'dark' : 'light'}`}>
      <Header 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeTitle={activeTitle} // 🆕 se lo pasamos al Header
      />
      <Home setActiveTitle={setActiveTitle} /> {/* 🆕 pasamos setActiveTitle */}
    </div>
  );
}

export default App;
