
import React, { useState } from 'react';
//componentes del dash
import Dropdownselector from './pages/Dropdownselector';
import Cryptolinechart from './pages/Cryptolinechart';
import CryptoTable from './pages/CryptoTable';
import Alerts from './pages/Alerts';
import { BsGear, BsListUl } from 'react-icons/bs';
import { FaTable } from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import { IoIosTrendingUp } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import CoinCarousel from './pages/CoinCarousel';
import './styles/DarkMode.css';
import './styles/MainContainer.css';
import TopGainersTable from './pages/TopGainersTable';

function Home({ setActiveTitle }) {
//al seleccionar una moneda del dropdown, se guarda en el estado
  const [selectedCoin, setSelectedCoin] = useState(null);
//saber que tarjeta esta seleccionada
  const [selectedCard, setSelectedCard] = useState(null);
//tarjetas de navegacion
  const cards = [
    { title: 'Selector', icon: <BsListUl className="card_icon" /> },
    { title: 'Mercado', icon: <FaTable className="card_icon" /> },
    { title: 'Gráficos', icon: <AiOutlineLineChart className="card_icon" /> },
    { title: 'Ranking', icon: <IoIosTrendingUp className="card_icon" /> },
    { title: 'Alertas', icon: <IoIosTrendingUp className="card_icon" /> },
    { title: 'Ajustes', icon: <BsGear className="card_icon" /> },
  ];

//click de cualquier tarjeta, actualiza el estado global
  const handleCardClick = (index) => {
    setSelectedCard(index);
    setActiveTitle(cards[index].title);
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>CriptoNet</h3>
      </div>
      <CoinCarousel />
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
            {selectedCard === 0 && <Dropdownselector setSelectedCoin={setSelectedCoin} selectedCoin={selectedCoin} />}
            {selectedCard === 1 && <CryptoTable />}
            {selectedCard === 2 && selectedCoin && <Cryptolinechart coinId={selectedCoin.id} />}
            {selectedCard === 3 && <TopGainersTable/>}
            {selectedCard === 4 && <Alerts />}
            {selectedCard === 5 && <p>Settings</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default Home;
