import React from 'react';
import '../styles/Settings.css';
import { BsCurrencyExchange, BsTranslate, BsBarChart } from 'react-icons/bs';
import { useSettings } from '../../context/SettingsContext';

function Settings() {
    const { settings, updateSettings, t } = useSettings();

    const settingsConfig = [
        {
            section: t('UserPreferences'),
            items: [
                {
                    icon: <BsCurrencyExchange />,
                    title: t('currency'),
                    value: settings.currency,
                    options: [
                        { value: 'USD', label: 'USD (Dolar EUA)' },
                        { value: 'EUR', label: 'EUR (Euro)' },
                        { value: 'MXN', label: 'MXN (Peso MEX)' }
                    ],
                    onChange: (value) => updateSettings({ currency: value })
                },
                {
                    icon: <BsTranslate />,
                    title: t('language'),
                    value: settings.language,
                    options: [
                        { value: 'es', label: 'Español' },
                        { value: 'en', label: 'English' }
                    ],
                    onChange: (value) => updateSettings({ language: value })
                }
            ]
        },
        {
            section: t('ChartSettings'),
            items: [
                {
                    icon: <BsBarChart />,
                    title: t('chartType'),
                    value: settings.chartType,
                    options: [
                        { value: 'line', label: t('line') },
                        { value: 'bar', label: t('bar') }
                    ],
                    onChange: (value) => updateSettings({ chartType: value })
                }
            ]
        }
    ];

    return (
        <div className="settings-container">
            <h2 className="section-title">{t('settings')}</h2>
            
            {settingsConfig.map((config, sectionIndex) => (
                <div key={sectionIndex} className="settings-card">
                    <h3 className="settings-section-title">{config.section}</h3>
                    <div className="settings-grid">
                        {config.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="settings-item">
                                <div className="settings-item-header">
                                    <div className="settings-icon-wrapper">
                                        {item.icon}
                                    </div>
                                    <h4>{item.title}</h4>
                                </div>
                                <select 
                                    value={item.value}
                                    onChange={(e) => item.onChange(e.target.value)}
                                    className="settings-select"
                                >
                                    {item.options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Settings;
