// src/components/TopGainersTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TopGainersTable() {
  const [topGainers, setTopGainers] = useState([]);

  useEffect(() => {
    const fetchTopGainers = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 50, // obtener más para luego filtrar los ganadores
              page: 1,
              price_change_percentage: '24h',
            },
          }
        );

        // Filtrar top 5 con mayor cambio positivo en 24h
        const sorted = response.data
          .filter(coin => coin.price_change_percentage_24h > 0)
          .sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          )
          .slice(0, 5);

        setTopGainers(sorted);
      } catch (error) {
        console.error('Error fetching top gainers:', error);
      }
    };

    fetchTopGainers();
  }, []);

  return (
    <div className="top-gainers-table" style={{ marginTop: '40px' }}>
      <h3 style={{ marginBottom: '10px' }}>Top 5 ganadores del mercado</h3>
      <p style={{ marginBottom: '20px', color: '#888' }}>Tabla que muestre las 5 criptomonedas con mayor variación positiva en las últimas 24h</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #555' }}>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Variación 24h</th>
          </tr>
        </thead>
        <tbody>
          {topGainers.map((coin, index) => (
            <tr key={coin.id} style={{ borderBottom: '1px solid #333' }}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={coin.image}
                  alt={coin.name}
                  style={{ width: 20, verticalAlign: 'middle', marginRight: 8 }}
                />
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td>${coin.current_price.toFixed(2)}</td>
              <td style={{ color: '#4caf50' }}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopGainersTable;
