import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Sidebar from './components/Sidebar';

function App() {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
//funcionalidad del side bar
  const OpenSideBar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
    };
//funcionalidad de Dark-Light MODE
    const [darkMode, setDarkMode] = useState(true);
    const toggleDarkMode = () => { 
      setDarkMode(!darkMode);
    };
    
  return (
    <div className={`grid-container ${darkMode ? 'dark' : 'light'}`}>
      <Header OpenSideBar={OpenSideBar}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
      />
      <Sidebar openSidebarToggle={openSidebarToggle} 
      OpenSideBar={OpenSideBar}
      />
      <Home />
    </div>
  )
}

export default App;
