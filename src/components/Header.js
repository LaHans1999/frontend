// src/components/Header.js
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './styles/Header.css';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
} from 'react-icons/bs';

function Header({ OpenSideBar, darkMode, toggleDarkMode, activeTitle }) {
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
