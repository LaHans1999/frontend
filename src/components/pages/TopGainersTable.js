import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSettings } from '../../context/SettingsContext';

function TopGainersTable() {
  const [topGainers, setTopGainers] = useState([]);
  const { t } = useSettings();

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
    <div className="top-gainers-table">
      <h3 className="section-title">{t('topGainersTitle')}</h3>
      <p className="section-description">{t('topGainersDescription')}</p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>{t('name')}</th>
              <th>{t('price')}</th>
              <th>{t('change24h')}</th>
            </tr>
          </thead>
          <tbody>
            {topGainers.map((coin, index) => (
              <tr key={coin.id}>
                <td>{index + 1}</td>
                <td className="coin-info">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="coin-icon"
                  />
                  <div className="coin-name-container">
                    <span className="coin-name">{coin.name}</span>
                    <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                  </div>
                </td>
                <td>${coin.current_price.toFixed(2)}</td>
                <td className="positive">
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopGainersTable;
