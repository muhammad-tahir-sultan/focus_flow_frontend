import React from 'react';
import '../styles/skeleton.css';

const AppLoadingSkeleton: React.FC = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f0f11 0%, #1a1a1f 100%)',
        }}>
            <div style={{ textAlign: 'center' }}>
                <div className="skeleton" style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    margin: '0 auto 24px'
                }}></div>
                <div className="skeleton" style={{
                    width: '200px',
                    height: '32px',
                    margin: '0 auto 12px',
                    borderRadius: '8px'
                }}></div>
                <div className="skeleton" style={{
                    width: '300px',
                    height: '20px',
                    margin: '0 auto',
                    borderRadius: '6px'
                }}></div>
            </div>
        </div>
    );
};

export default AppLoadingSkeleton;
