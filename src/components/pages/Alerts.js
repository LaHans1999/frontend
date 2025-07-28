import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BsExclamationTriangleFill, BsArrowUpCircleFill, BsArrowDownCircleFill, BsGraphUp } from 'react-icons/bs';
import '../styles/Alerts.css';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [volumeAlerts, setVolumeAlerts] = useState([]);
    const [systemStatus, setSystemStatus] = useState({ status: 'ok', message: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingStates, setLoadingStates] = useState({
        significantChanges: true,
        volume: true
    });

    const fetchCryptoData = async () => {
        try {
            setIsLoading(true);
            setLoadingStates({
                significantChanges: true,
                volume: true
            });
            
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    order: 'price_change_percentage_24h_desc',
                    per_page: 100,
                    sparkline: true,
                    price_change_percentage: '1h,24h'
                }
            });

            // Procesar cambios significativos (>5% en 1h o >10% en 24h)
            const significantChanges = response.data.filter(coin => 
                Math.abs(coin.price_change_percentage_1h_in_currency) > 5 ||
                Math.abs(coin.price_change_percentage_24h) > 10
            ).map(coin => ({
                id: coin.id,
                symbol: coin.symbol.toUpperCase(),
                name: coin.name,
                image: coin.image,
                change_1h: coin.price_change_percentage_1h_in_currency,
                change_24h: coin.price_change_percentage_24h,
                timestamp: Date.now(),
                type: coin.price_change_percentage_24h > 0 ? 'gain' : 'loss'
            }));

            // Detectar volumen inusual (>100% sobre el promedio)
            const volumeSpikes = response.data
                .filter(coin => coin.total_volume > coin.market_cap * 0.1)
                .map(coin => ({
                    id: coin.id,
                    symbol: coin.symbol.toUpperCase(),
                    name: coin.name,
                    volume: coin.total_volume,
                    timestamp: Date.now()
                }));

            setAlerts(significantChanges);
            setVolumeAlerts(volumeSpikes);
            setSystemStatus({ status: 'ok', message: 'Datos actualizados correctamente' });
            setLoadingStates({
                significantChanges: false,
                volume: false
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setSystemStatus({
                status: 'error',
                message: 'Error al cargar los datos. Por favor, intente más tarde.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 300000); // Actualizar cada 5 minutos
        return () => clearInterval(interval);
    }, []);



    const LoadingCard = () => (
        <div className="loading-card">
            <div className="loading-card-header">
                <div className="loading-pulse" style={{ width: '40%' }} />
            </div>
            <div className="loading-pulse" />
            <div className="loading-pulse" />
            <div className="loading-pulse" />
        </div>
    );

    const AlertCard = ({ title, children, icon }) => (
        <motion.div
            className="alert-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="alert-card-header">
                {icon}
                <h3>{title}</h3>
            </div>
            <div className="alert-card-content">
                {children}
            </div>
        </motion.div>
    );

    if (isLoading) {
        return (
            <div className="alerts-container">
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
            </div>
        );
    }

    const filterBySearch = (items) => {
        if (!searchTerm) return items;
        const search = searchTerm.toLowerCase();
        return items.filter(item => 
            item.name.toLowerCase().includes(search) || 
            item.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <div className="alerts-container">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar criptomoneda..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {systemStatus.status === 'error' && (
                <div className="system-error">
                    <BsExclamationTriangleFill />
                    <p>{systemStatus.message}</p>
                </div>
            )}

            <AlertCard title="Alertas" icon={<BsExclamationTriangleFill className="alert-icon warning" />}>
                {loadingStates.significantChanges ? (
                    <>
                        <div className="loading-pulse" />
                        <div className="loading-pulse" />
                        <div className="loading-pulse" />
                    </>
                ) : (
                    <AnimatePresence>
                        {filterBySearch(alerts).map(alert => (
                            <motion.div
                                key={`${alert.id}-${alert.timestamp}`}
                                className={`alert-item ${alert.type}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                            >
                                <img src={alert.image} alt={alert.name} className="coin-icon" />
                                <span className="coin-name">{alert.symbol}</span>
                                <span className={`change-value ${alert.change_24h > 0 ? 'positive' : 'negative'}`}>
                                    {alert.change_24h > 0 ? '▲' : '▼'} {Math.abs(alert.change_24h).toFixed(2)}% (24h)
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </AlertCard>



            <AlertCard title="Volumen Inusual" icon={<BsGraphUp className="alert-icon info" />}>
                {loadingStates.volume ? (
                    <>
                        <div className="loading-pulse" />
                        <div className="loading-pulse" />
                        <div className="loading-pulse" />
                    </>
                ) : (
                    filterBySearch(volumeAlerts).map(alert => (
                        <div key={`${alert.id}-${alert.timestamp}`} className="volume-alert-item">
                            <span className="coin-name">{alert.symbol}</span>
                            <span className="volume-value">
                                Vol: ${(alert.volume / 1000000).toFixed(2)}M
                            </span>
                        </div>
                    ))
                )}
            </AlertCard>
        </div>
    );
};

export default Alerts;
