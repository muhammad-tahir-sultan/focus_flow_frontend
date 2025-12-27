import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => {
    return (
        <div className="stats-card-main">
            <h3 className="text-sm">{label}</h3>
            <div style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                lineHeight: 1,
                margin: '1rem 0 0.5rem',
                color: color || 'inherit'
            }}>
                {value}
            </div>
        </div>
    );
};

export default StatCard;
