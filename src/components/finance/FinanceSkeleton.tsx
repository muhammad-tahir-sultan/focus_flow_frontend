import React from 'react';
import '../../styles/skeleton.css';

const FinanceSkeleton: React.FC = () => {
    return (
        <div className="expenses-page">
            <div className="bg-gradient"></div>

            <header className="expenses-header">
                <div className="skeleton skeleton-title" style={{ width: '400px', height: '48px', margin: '0 auto 16px' }}></div>
                <div className="skeleton skeleton-text" style={{ width: '500px', height: '20px', margin: '0 auto' }}></div>
            </header>

            {/* Dashboard Stats Skeleton */}
            <div className="stats-dashboard">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="stat-card">
                        <div className="skeleton skeleton-icon" style={{ width: '60px', height: '60px', borderRadius: '50%' }}></div>
                        <div className="stat-content" style={{ flex: 1 }}>
                            <div className="skeleton skeleton-text" style={{ width: '120px', height: '16px', marginBottom: '12px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '150px', height: '32px' }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section Skeleton */}
            <div className="charts-section">
                <div className="skeleton skeleton-text" style={{ width: '300px', height: '32px', marginBottom: '24px' }}></div>
                <div className="charts-grid">
                    <div className="chart-card">
                        <div className="skeleton skeleton-text" style={{ width: '200px', height: '24px', marginBottom: '16px' }}></div>
                        <div className="skeleton skeleton-chart" style={{ width: '100%', height: '300px', borderRadius: '12px' }}></div>
                    </div>
                    <div className="chart-card">
                        <div className="skeleton skeleton-text" style={{ width: '200px', height: '24px', marginBottom: '16px' }}></div>
                        <div className="skeleton skeleton-chart" style={{ width: '100%', height: '300px', borderRadius: '12px' }}></div>
                    </div>
                    <div className="chart-card chart-card-wide">
                        <div className="skeleton skeleton-text" style={{ width: '300px', height: '24px', marginBottom: '16px' }}></div>
                        <div className="skeleton skeleton-chart" style={{ width: '100%', height: '300px', borderRadius: '12px' }}></div>
                    </div>
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="finance-tabs">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="skeleton skeleton-tab" style={{ width: '150px', height: '48px', borderRadius: '12px' }}></div>
                ))}
            </div>

            {/* Form Skeleton */}
            <div className="expense-form-container">
                <div className="skeleton skeleton-text" style={{ width: '250px', height: '28px', marginBottom: '24px' }}></div>
                <div className="expense-form">
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <div className="skeleton skeleton-text" style={{ width: '80px', height: '16px', marginBottom: '8px' }}></div>
                            <div className="skeleton skeleton-input" style={{ width: '100%', height: '48px', borderRadius: '8px' }}></div>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <div className="skeleton skeleton-text" style={{ width: '80px', height: '16px', marginBottom: '8px' }}></div>
                            <div className="skeleton skeleton-input" style={{ width: '100%', height: '48px', borderRadius: '8px' }}></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <div className="skeleton skeleton-text" style={{ width: '80px', height: '16px', marginBottom: '8px' }}></div>
                            <div className="skeleton skeleton-input" style={{ width: '100%', height: '48px', borderRadius: '8px' }}></div>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <div className="skeleton skeleton-text" style={{ width: '80px', height: '16px', marginBottom: '8px' }}></div>
                            <div className="skeleton skeleton-input" style={{ width: '100%', height: '48px', borderRadius: '8px' }}></div>
                        </div>
                    </div>
                    <div className="skeleton skeleton-button" style={{ width: '200px', height: '48px', borderRadius: '12px', marginTop: '16px' }}></div>
                </div>
            </div>

            {/* List Skeleton */}
            <div className="expenses-list">
                <div className="skeleton skeleton-text" style={{ width: '250px', height: '28px', marginBottom: '24px' }}></div>
                <div className="expenses-grid">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="expense-card" style={{ padding: '24px' }}>
                            <div className="skeleton skeleton-text" style={{ width: '120px', height: '20px', marginBottom: '12px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '180px', height: '24px', marginBottom: '8px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '100px', height: '32px', marginBottom: '16px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '150px', height: '16px', marginBottom: '8px' }}></div>
                            <div className="skeleton skeleton-text" style={{ width: '130px', height: '16px', marginBottom: '16px' }}></div>
                            <div className="skeleton skeleton-button" style={{ width: '100px', height: '40px', borderRadius: '8px' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinanceSkeleton;
