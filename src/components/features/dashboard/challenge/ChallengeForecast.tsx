import React from 'react';

interface ChallengeForecastProps {
    totals: {
        pushups: number;
        pullups: number;
        situps: number;
        squats: number;
    };
    forecast: {
        pushups: number;
        pullups: number;
        situps: number;
        squats: number;
    };
}

const ChallengeForecast: React.FC<ChallengeForecastProps> = ({ totals, forecast }) => {
    return (
        <div className="forecast-section">
            <h3 className="forecast-title">60-Day Transformation Forecast</h3>
            <div className="forecast-grid">
                <div className="forecast-item">
                    <span className="forecast-val">{totals.pushups.toLocaleString()} / {forecast.pushups.toLocaleString()}</span>
                    <span className="forecast-lab">Push Ups Total</span>
                </div>
                <div className="forecast-item">
                    <span className="forecast-val">{totals.situps.toLocaleString()} / {forecast.situps.toLocaleString()}</span>
                    <span className="forecast-lab">Sit Ups Total</span>
                </div>
                <div className="forecast-item">
                    <span className="forecast-val">{totals.squats.toLocaleString()} / {forecast.squats.toLocaleString()}</span>
                    <span className="forecast-lab">Squats Total</span>
                </div>
                <div className="forecast-item">
                    <span className="forecast-val">{totals.pullups.toLocaleString()} / {forecast.pullups.toLocaleString()}</span>
                    <span className="forecast-lab">Pull Ups Total</span>
                </div>
            </div>
        </div>
    );
};

export default ChallengeForecast;
