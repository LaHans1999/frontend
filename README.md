
Hannia Ortega Samaniego
Reto CriptoMonedas
25/07/2025

                                Arquitectura del Proyecto

├── components/
│   ├── CryptoDropdown.jsx
│   ├── GeneralInfo.jsx
│   ├── PriceChart.jsx
│   ├── WinnersTable.jsx
│   └── ThemeToggle.jsx
│
├── pages/
│   └── Dashboard.jsx
│
├── services/
│   └── coingecko.js
│
├── App.jsx
└── main.jsx

                                        REQUISITOS                                      
                                                         SI/NO

DropDown de CriptoMonedas
|
Datos Generales
|
Grafica de linea
|
Tabla
|
DarkMode
|
Extras

                                        EVALUACION                                     
                                                         SI/NO

Uso correcto
Peticiones HTTP
HOOKS
Diseño responsivo basico
Graficos
Tabla funcional
Codigo Limpio



                                        
                                        Notas
    Head Font : Orbitron
    Body Font : anton
    text: Poppins


Para mostrar informacion de CARDS

Obtendre primero en tiempo real de las 10 crp.mon.
Mostrare nombres, e info
usare useEffect para hacer la peticion y useState para guardar
datos
-modificare Home.js  e importare axios
