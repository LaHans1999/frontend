// src/components/Dropdownselector.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dropdownselector({ setSelectedCoin }) {
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
      {coins.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <p>
            <strong>Nombre:</strong> {coins[0].name}
          </p>
          <p>
            <strong>Símbolo:</strong> {coins[0].symbol.toUpperCase()}
          </p>
          <p>
            <strong>Precio actual:</strong> ${coins[0].current_price}
          </p>
          <p>
            <strong>Variación 24h:</strong>{' '}
            {coins[0].price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default Dropdownselector;
