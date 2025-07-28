import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/CryptoTable.css';
import { BsSearch, BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { useSettings } from '../../context/SettingsContext';

function CryptoTable() {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { formatPrice } = useSettings();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'desc' });
    const itemsPerPage = 10;

    // Función para obtener datos de la API
    const fetchCryptoData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                'https://api.coingecko.com/api/v3/coins/markets',
                {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 100,
                        page: 1,
                        sparkline: false,
                        price_change_percentage: '24h'
                    }
                }
            );
            setCryptoData(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los datos. Por favor, intente más tarde.');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 60000); // Actualizar cada minuto
        return () => clearInterval(interval);
    }, []);

    // Función para ordenar datos
    const sortData = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Función para formatear números grandes
    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
        return num.toFixed(2);
    };

    // Filtrar y ordenar datos
    const filteredData = cryptoData
        .filter(coin =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortConfig.key === 'name') {
                return sortConfig.direction === 'asc' 
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name);
            }
            return sortConfig.direction === 'asc'
                ? a[sortConfig.key] - b[sortConfig.key]
                : b[sortConfig.key] - a[sortConfig.key];
        });

    // Calcular datos paginados
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Componente de Paginación
    const Pagination = () => (
        <div className="pagination">
            <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Anterior
            </button>
            <span className="pagination-info">
                Página {currentPage} de {totalPages}
            </span>
            <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Siguiente
            </button>
        </div>
    );

    // Loading State
    if (loading) {
        return (
            <div className="crypto-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Cargando datos...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="crypto-container">
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={fetchCryptoData} className="retry-button">
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="crypto-container">
            {/* Barra de búsqueda */}
            <div className="search-container">
                <BsSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o símbolo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* Tabla de criptomonedas */}
            <div className="table-container">
                <table className="crypto-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortData('market_cap_rank')}>#</th>
                            <th onClick={() => sortData('name')}>Nombre</th>
                            <th onClick={() => sortData('current_price')}>
                                Precio
                                {sortConfig.key === 'current_price' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => sortData('price_change_percentage_24h')}>
                                24h %
                                {sortConfig.key === 'price_change_percentage_24h' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => sortData('market_cap')}>
                                Cap. de Mercado
                                {sortConfig.key === 'market_cap' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => sortData('total_volume')}>
                                Volumen 24h
                                {sortConfig.key === 'total_volume' && (
                                    <span className="sort-icon">
                                        {sortConfig.direction === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
                                    </span>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {currentItems.map((coin) => (
                                <motion.tr
                                    key={coin.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td>{coin.market_cap_rank}</td>
                                    <td className="coin-info">
                                        <img src={coin.image} alt={coin.name} className="coin-icon" />
                                        <div className="coin-name-container">
                                            <span className="coin-name">{coin.name}</span>
                                            <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                                        </div>
                                    </td>
                                    <td>{formatPrice(coin.current_price)}</td>
                                    <td className={coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}>
                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                    </td>
                                    <td>{formatPrice(coin.market_cap)}</td>
                                    <td>{formatPrice(coin.total_volume)}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <Pagination />
        </div>
    );
}

export default CryptoTable;
