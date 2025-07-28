import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import '../styles/CoinCarousel.css';

const CoinCarousel = () => {
//Guardamos las 10 principales monedas
    const [coins, setCoins] = useState([]);
    useEffect(() => {
// Función para obtener las monedas desde la API
        const fetchCoins = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/coins/markets',
                    {
                        params: {
                            vs_currency: 'usd',
                            order: 'market_cap_desc',
                            per_page: 10,
                            page: 1,
                            sparkline: true,
                            price_change_percentage: '24h'
                        }
                    }
                );
                setCoins(response.data); //guardar datos
            } catch (error) {
                console.error('Error fetching coins:', error);
            }
        };

//llamada inicial actualizacin cada min<
        fetchCoins();
        const interval = setInterval(fetchCoins, 60000); // Actualizar cada minuto
        return () => clearInterval(interval);
    }, []);



    if (coins.length === 0) return <div>Cargando...</div>;

    return (
        <div className="coin-carousel">
            <div className="ticker-wrapper">
                <motion.div 
                    className="ticker-container"
                    animate={{
                        x: [0, -2000]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                    style={{
                        display: 'flex',
                        gap: '20px'
                    }}
                >
                    {[...coins, ...coins, ...coins].map((coin, index) => {
                        const sparklineData = coin.sparkline_in_7d?.price?.map((price, i) => ({
                            value: price
                        })) || [];
                        //lista x3 para que el scroll sea largo
                        return (
                            <motion.div
                                key={`${coin.id}-${index}`}
                                className="ticker-item"
                                whileHover={{ scale: 1.05 }}
                            >
                                <img 
                                    src={coin.image} 
                                    alt={coin.name} 
                                    style={{
                                        width: '14px',
                                        height: '14px',
                                        objectFit: 'contain',
                                        marginRight: '4px'
                                    }} 
                                />
                                <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                                <span className={`coin-price ${coin.price_change_percentage_24h > 0 ? 'price-up' : 'price-down'}`}>
                                    ${coin.current_price.toLocaleString()}
                                </span>
                                <div className="chart-container">
                                    <ResponsiveContainer width={30} height={14}>
                                        <AreaChart data={sparklineData}>
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke={`var(${coin.price_change_percentage_24h > 0 ? '--success-color' : '--danger-color'})`}
                                                fill={`var(${coin.price_change_percentage_24h > 0 ? '--success-color' : '--danger-color'})`}
                                                fillOpacity={0.1}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <span className={`percentage-change ${coin.price_change_percentage_24h > 0 ? 'price-up' : 'price-down'}`}>
                                    {coin.price_change_percentage_24h > 0 ? '▲' : '▼'}{Math.abs(coin.price_change_percentage_24h).toFixed(1)}%
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default CoinCarousel;
