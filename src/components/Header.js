import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './styles/Header.css';
// iconos de notificaciones y perfil
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
} from 'react-icons/bs';
// - darkMode: booleano que indica si está activado el modo oscuro
// - toggleDarkMode: función que cambia entre light y dark
// - activeTitle: título dinámico para mostrar en el header
function Header({ darkMode, toggleDarkMode, activeTitle }) {
  return (
    <header className="header">
      <div className="header-left">
        <h3>{activeTitle || 'CriptoNet'}</h3>
      </div>
      <div className="header-right">
        <button className="icon dark-mode-btn" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <BsFillEnvelopeFill className="icon" />
        <BsFillBellFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}

export default Header;
