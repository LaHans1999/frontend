import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useSettings } from '../../context/SettingsContext';

function Cryptolinechart({ coinId }) {
  const [chartData, setChartData] = useState([]);
  const { settings, formatPrice } = useSettings();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: 'usd',
              days: 7,
            },
          }
        );

 // Formatear los datos para el gráfico
        const formattedData = res.data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString('en-US', {
            weekday: 'short',
          }),
          price: parseFloat(price.toFixed(2)),
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error en conseguir informacion:', error);
      }
    };

    fetchChartData();
  }, [coinId]);

  const renderChart = () => {
    const chartContent = settings.chartType === 'bar' ? (
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Bar
          dataKey="price"
          fill="#8884d8"
        />
      </BarChart>
    ) : (
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    );

    return chartContent;
  };

  return (
    <div style={{ width: '100%', height: 300, marginTop: '30px' }}>
      <h3 style={{ marginBottom: '10px' }}>Precio últimos 7 días</h3>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

export default Cryptolinechart;
