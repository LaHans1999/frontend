
Idea principal =

Un dashboard moderno y elegante para visualizar información en tiempo real sobre criptomonedas, desarrollado con React y la API de CoinGecko.

Requisitos funcionales =

Dropdown de criptomonedas
- Se muestra un select/dropwdown con las principales 10 criptomonedas
- Se actualiza el dashboard con los datos

Datos generales
- Se muestran nombre, simbolo, precio actual y actu.24h

Grafica 
- Se muestran graficas de linea y barra de los ult. 7 dias

Tabla Ganadores
- Se muestra tablas de 5 ganadores del mercado en las ultimas 24hrs.

Tabla Mercado
- Informacion completa del mercado, busqueda y ordenamiento

Uso de Hooks 
- UseState para las selecciones del dropdown, los datos de las cripto, dark y light, tablas y el orden y alertas.

useEffect 
- Obtenemos datos de API  
- Act. tiempo real

Diseño Responsivo

Implementaciones de Gráficos

Tablas funcionales

Codigo limpio

        Bonus

Sistema de Alertas como cambios grandes de precio
Dark Light Mode
Multilenguaje (esp, ingl)
Diseño responsivo
Carrusel en tiempo real
Selección de moneda base
Cambio de idioma
Preferencias de gráficos
Mensaje de errores
Animaciones



Herramientas que utilice

React
Axios para peticiones http
Rechart
Framer Motion para animaciones
React Icons
Api de coingecko

                Estructura de Proyecto
frontend/
├── src/
│   ├── components/
│   │   ├── pages/
│   │   │   ├── Alerts.js
│   │   │   ├── CoinCarousel.js
│   │   │   ├── CryptoTable.js
│   │   │   ├── Cryptolinechart.js
│   │   │   ├── Dropdownselector.js
│   │   │   ├── Settings.js
│   │   │   └── TopGainersTable.js
│   │   ├── Header.js
│   │   ├── Home.js
│   │   └── Sidebar.js
│   ├── context/
│   │   └── SettingsContext.js
│   ├── styles/
│   │   ├── Alerts.css
│   │   ├── CryptoTable.css
│   │   ├── DarkMode.css
│   │   ├── Dropdownselector.css
│   │   ├── Header.css
│   │   ├── MainContainer.css
│   │   └── Settings.css
│   ├── App.js
│   └── index.js
```


 Paleta de Colores
- **Modo Oscuro**: 
  - Fondo Principal: #1d2634
  - Elementos Secundarios: #2d3748
  - Acentos: #1e3799, #3498db
- **Modo Claro**: 
  - Fondo Principal: #ffffff
  - Elementos Secundarios: #f8f9fa
  - Acentos: #1e3799

 Tipografía
- **Títulos**: Poppins
- **Texto**: Montserrat, Segoe UI


- **Hannia Ortega Samaniego**
- Fecha: 26/07/2025
