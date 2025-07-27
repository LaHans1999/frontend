import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';

function Header({ OpenSideBar, darkMode, toggleDarkMode }) {
  return(
   <header className='header'>
    <div className='menu-icon'>
      <BsJustify className='icon'/>

    </div>
    <div className='header-left'>
      <BsSearch className='icon' onClick={OpenSideBar}  />
    </div>
    <div className='header-right'>
      <button className='icon dark-mode-btn' onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />} 
        </button>
      <BsFillEnvelopeFill className='icon'/>
      <BsFillBellFill className='icon'/>
      <BsPersonCircle className='icon'/>
      

    </div>
    
    
    </header>
  )
}

export default Header;
