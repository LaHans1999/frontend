// src/components/Dropdownselector.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCoins, FaHashtag, FaDollarSign, FaChartLine } from 'react-icons/fa';
import './styles/Dropdownselector.css';

function Dropdownselector({ setSelectedCoin, selectedCoin }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
            },
          }
        );
        setCoins(res.data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="dropdown-container">
      <label htmlFor="coin-select">Selecciona una criptomoneda:</label>
      <select
        id="coin-select"
        onChange={(e) =>
          setSelectedCoin(coins.find((coin) => coin.id === e.target.value))
        }
      >
        <option value="">-- Selecciona --</option>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name} ({coin.symbol.toUpperCase()})
          </option>
        ))}
      </select>

      {/* Mostrar información si hay una moneda seleccionada */}
      {selectedCoin != null && (
        <div className="coin-info-container">
          <div className="coin-info-card">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <FaCoins />
                </div>
                <div className="info-content">
                  <h4>Nombre</h4>
                  <p>{selectedCoin.name}</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaHashtag />
                </div>
                <div className="info-content">
                  <h4>Símbolo</h4>
                  <p>{selectedCoin.symbol.toUpperCase()}</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaDollarSign />
                </div>
                <div className="info-content">
                  <h4>Precio actual</h4>
                  <p className="price">${selectedCoin.current_price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <FaChartLine />
                </div>
                <div className="info-content">
                  <h4>Variación 24h</h4>
                  <p className={selectedCoin.price_change_percentage_24h >= 0 ? 'positive-change' : 'negative-change'}>
                    {selectedCoin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdownselector;
