import React from 'react';
import { BsBarChartLine, BsGear, BsListUl } from 'react-icons/bs';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaTable } from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import { IoIosTrendingUp } from 'react-icons/io';
import { IoMdNotificationsOutline } from 'react-icons/io';

function Sidebar() {
  return (
    <aside className='sidebar'>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <MdOutlineDashboard className='icon_header' /> CryptoNet
        </div>
        <span className='icon close_icon'>-X-</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="">
            <MdOutlineDashboard className='icon' /> Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsListUl className='icon' /> DropdownSelector
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <FaTable className='icon' /> CryptoTable
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <AiOutlineLineChart className='icon' /> LineChart
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <IoIosTrendingUp className='icon' /> TopGainersTable
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <IoMdNotificationsOutline className='icon' /> Alerts
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            <BsGear className='icon' /> Settings
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
