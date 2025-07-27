import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  // Dark / Light mode
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // NUEVO: sección activa para mostrar en el header
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className={`grid-container ${darkMode ? 'dark' : 'light'}`}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection} // 👈 pasamos aquí la sección activa
      />
      <Home setActiveSection={setActiveSection} /> {/* 👈 y también la función para actualizar */}
    </div>
  );
}

export default App;
