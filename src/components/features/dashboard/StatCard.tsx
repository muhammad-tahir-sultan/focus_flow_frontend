import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    color?: string;
    icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color, icon }) => {
    return (
        <div className="stats-card-main" style={{
            background: 'rgba(255,255,255,0.03)',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.025em',
                    textTransform: 'uppercase',
                    margin: 0
                }}>{label}</h3>
                {icon && <div style={{
                    color: color || 'var(--text-secondary)',
                    background: color ? `${color}15` : 'rgba(255,255,255,0.05)',
                    padding: '8px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>{icon}</div>}
            </div>
            <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                lineHeight: 1,
                color: '#f8fafc',
                letterSpacing: '-0.025em'
            }}>
                {value}
            </div>
            {color && <div style={{
                height: '4px',
                width: '100%',
                background: `linear-gradient(90deg, ${color}, transparent)`,
                marginTop: '1rem',
                borderRadius: '2px',
                opacity: 0.5
            }}></div>}
        </div>
    );
};

export default StatCard;
