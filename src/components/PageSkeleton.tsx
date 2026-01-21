import React from 'react';
import '../styles/skeleton.css';

interface PageSkeletonProps {
    hasHeader?: boolean;
    hasStats?: boolean;
    statsCount?: number;
    hasForm?: boolean;
    hasCards?: boolean;
    cardsCount?: number;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({
    hasHeader = true,
    hasStats = false,
    statsCount = 4,
    hasForm = false,
    hasCards = true,
    cardsCount = 6,
}) => {
    return (
        <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
            {hasHeader && (
                <div style={{ marginBottom: '2rem' }}>
                    <div className="skeleton" style={{ width: '300px', height: '40px', marginBottom: '12px' }}></div>
                    <div className="skeleton" style={{ width: '450px', height: '20px' }}></div>
                </div>
            )}

            {hasStats && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(statsCount, 4)}, 1fr)`,
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    {Array.from({ length: statsCount }).map((_, i) => (
                        <div key={i} style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%' }}></div>
                            <div style={{ flex: 1 }}>
                                <div className="skeleton" style={{ width: '80%', height: '16px', marginBottom: '12px' }}></div>
                                <div className="skeleton" style={{ width: '60%', height: '28px' }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {hasForm && (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem'
                }}>
                    <div className="skeleton" style={{ width: '200px', height: '24px', marginBottom: '1.5rem' }}></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <div className="skeleton" style={{ width: '80px', height: '16px', marginBottom: '8px' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '48px', borderRadius: '8px' }}></div>
                        </div>
                        <div>
                            <div className="skeleton" style={{ width: '80px', height: '16px', marginBottom: '8px' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '48px', borderRadius: '8px' }}></div>
                        </div>
                    </div>
                    <div className="skeleton" style={{ width: '180px', height: '48px', borderRadius: '12px', marginTop: '1rem' }}></div>
                </div>
            )}

            {hasCards && (
                <div>
                    <div className="skeleton" style={{ width: '250px', height: '28px', marginBottom: '1.5rem' }}></div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {Array.from({ length: cardsCount }).map((_, i) => (
                            <div key={i} style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '16px',
                                padding: '1.5rem'
                            }}>
                                <div className="skeleton" style={{ width: '120px', height: '20px', marginBottom: '12px' }}></div>
                                <div className="skeleton" style={{ width: '80%', height: '24px', marginBottom: '8px' }}></div>
                                <div className="skeleton" style={{ width: '60%', height: '32px', marginBottom: '16px' }}></div>
                                <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '8px' }}></div>
                                <div className="skeleton" style={{ width: '90%', height: '16px', marginBottom: '16px' }}></div>
                                <div className="skeleton" style={{ width: '100px', height: '40px', borderRadius: '8px' }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageSkeleton;
