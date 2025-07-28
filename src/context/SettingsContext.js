import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

const translations = {
    es: {
        lastPrice: "Precio últimos 7 días",
        settings: "Configuración",
        currency: "Moneda",
        language: "Idioma",
        chartType: "Tipo de gráfica",
        line: "Línea",
        bar: "Barras",
        price: "Precio",
        change24h: "Cambio 24h",
        marketCap: "Cap. de Mercado",
        topGainers: "Mejores Ganancias",
        alerts: "Alertas",
        createAlert: "Crear Alerta",
        noAlerts: "No hay alertas configuradas",
        search: "Buscar por nombre o símbolo...",
        searchCrypto: "Buscar criptomoneda...",
        retry: "Reintentar",
        loading: "Cargando...",
        error: "Error al cargar los datos",
        rank: "Posición",
        name: "Nombre",
        volume: "Volumen",
        page: "Página",
        of: "de",
        next: "Siguiente",
        previous: "Anterior",
        dashboard: "Panel de Control",
        selector: "Selector",
        market: "Mercado",
        charts: "Gráficas",
        ranking: "Ranking",
        active: "Activo",
        select: "Seleccionar",
        cryptonet: "CriptoNet",
        topGainersTitle: "Top 5 ganadores del mercado",
        topGainersDescription: "Tabla que muestre las 5 criptomonedas con mayor variación positiva en las últimas 24h"
    },
    en: {
        lastPrice: "Last 7 Days Price",
        settings: "Settings",
        currency: "Currency",
        language: "Language",
        chartType: "Chart Type",
        line: "Line",
        bar: "Bar",
        price: "Price",
        change24h: "24h Change",
        marketCap: "Market Cap",
        topGainers: "Top Gainers",
        alerts: "Alerts",
        createAlert: "Create Alert",
        noAlerts: "No alerts configured",
        search: "Search by name or symbol...",
        searchCrypto: "Search cryptocurrency...",
        retry: "Retry",
        loading: "Loading...",
        error: "Error loading data",
        rank: "Rank",
        name: "Name",
        volume: "Volume",
        page: "Page",
        of: "of",
        next: "Next",
        previous: "Previous",
        dashboard: "Dashboard",
        selector: "Selector",
        market: "Market",
        charts: "Charts",
        ranking: "Ranking",
        active: "Active",
        select: "Select",
        cryptonet: "CryptoNet",
        topGainersTitle: "Top 5 Market Winners",
        topGainersDescription: "Table showing the 5 cryptocurrencies with the highest positive change in the last 24h"
    }
};

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        currency: 'USD',
        language: 'es',
        chartType: 'line'
    });

    // valor por el momento
    const exchangeRates = {
        USD: 1,
        EUR: 0.91,
        MXN: 16.75
    };

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const formatPrice = (priceUSD) => {
        if (!priceUSD) return '0';
        
        const rate = exchangeRates[settings.currency];
        const converted = priceUSD * rate;
        
        const symbols = {
            USD: '$',
            EUR: '€',
            MXN: 'MX$'
        };

        return `${symbols[settings.currency]}${converted.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const t = (key) => {
        return translations[settings.language][key] || key;
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, formatPrice, t }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
};
