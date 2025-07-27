// src/components/Home.js
import React, { useState } from 'react';
import Dropdownselector from './Dropdownselector';
import Cryptolinechart from './Cryptolinechart';
import TopGainersTable from './TopGainersTable';
import { BsGear, BsListUl } from 'react-icons/bs';
import { FaTable } from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import { IoIosTrendingUp } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion'; // 🆕 Importamos animaciones

function Home({ setActiveTitle }) {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    { title: 'Dropdownselector', icon: <BsListUl className="card_icon" /> },
    { title: 'CryptoTable', icon: <FaTable className="card_icon" /> },
    { title: 'LineChart', icon: <AiOutlineLineChart className="card_icon" /> },
    { title: 'TopGainersTable', icon: <IoIosTrendingUp className="card_icon" /> },
    { title: 'Alerts', icon: <IoIosTrendingUp className="card_icon" /> },
    { title: 'Settings', icon: <BsGear className="card_icon" /> },
  ];

  const handleCardClick = (index) => {
    setSelectedCard(index);
    setActiveTitle(cards[index].title);
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>CriptoNet</h3>
      </div>

      <div className="main-cards">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${selectedCard === index ? 'card-active' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <h3>{card.title}</h3>
              {card.icon}
            </div>
            <h2>{selectedCard === index ? 'Activo' : 'Seleccionar'}</h2>
          </div>
        ))}
      </div>

      {/* 🎯 Transición de contenido usando AnimatePresence */}
      <AnimatePresence mode="wait">
        {selectedCard !== null && (
          <motion.div
            key={selectedCard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: '20px' }}
          >
            {selectedCard === 0 && <Dropdownselector setSelectedCoin={setSelectedCoin} />}
            {selectedCard === 1 && <p>CryptoTable (próximamente)</p>}
            {selectedCard === 2 && selectedCoin && <Cryptolinechart coinId={selectedCoin.id} />}
            {selectedCard === 3 && <TopGainersTable />}
            {selectedCard === 4 && <p>Alerts (en desarrollo)</p>}
            {selectedCard === 5 && <p>Settings</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Home;
