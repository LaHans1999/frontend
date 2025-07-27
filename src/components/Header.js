import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsJustify } from 'react-icons/bs';

function Header({ OpenSideBar, darkMode, toggleDarkMode, activeSection }) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' />
      </div>

      <div className='header-left'>
        {/* Mostrar nombre de la sección seleccionada */}
        <h4 style={{ marginLeft: '10px', fontWeight: '500' }}>
          {activeSection || 'Dashboard'}
        </h4>
      </div>

      <div className='header-right'>
        <button className='icon dark-mode-btn' onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <BsFillEnvelopeFill className='icon' />
        <BsFillBellFill className='icon' />
        <BsPersonCircle className='icon' />
      </div>
    </header>
  );
}

export default Header;
