// src/components/Header.js
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from 'react-icons/bs';

function Header({ OpenSideBar, darkMode, toggleDarkMode, activeTitle }) {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" />
      </div>
      <div className="header-left">
        <BsSearch className="icon" onClick={OpenSideBar} />
        <h3 style={{ marginLeft: '10px' }}>{activeTitle || 'CriptoNet'}</h3> {/* 🆕 */}
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
