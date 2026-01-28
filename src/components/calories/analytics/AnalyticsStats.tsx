import React from 'react';

interface AnalyticsStatsProps {
    avgCalories: number;
    consistency: number;
    loggedRatio: number;
    weightImpact: number;
    goal: number;
    totalItems: number;
}

const AnalyticsStats: React.FC<AnalyticsStatsProps> = ({
    avgCalories,
    consistency,
    loggedRatio,
    weightImpact,
    goal,
    totalItems
}) => {
    return (
        <div className="ff-grid-4">
            <div className="ff-meal-card group">
                <div className="stats-icon-wrapper mb-4 group-hover:scale-110 transition-transform" style={{ margin: 0, padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Daily Average</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>{Math.round(avgCalories)}</div>
                <div style={{ marginTop: '0.75rem', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: avgCalories > goal ? '#f87171' : '#4ade80' }}>
                    {avgCalories > goal ? 'Above Daily Goal' : 'On Track'}
                </div>
            </div>

            <div className="ff-meal-card group">
                <div className="stats-icon-wrapper mb-4 group-hover:scale-110 transition-transform" style={{ margin: 0, padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Goal Success</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>{Math.round(consistency)}%</div>
                <div style={{ width: '80%', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '10px', marginTop: '1rem', overflow: 'hidden' }}>
                    <div style={{ width: `${consistency}%`, height: '100%', background: '#a78bfa', boxShadow: '0 0 10px rgba(167, 139, 250, 0.4)' }}></div>
                </div>
            </div>

            <div className="ff-meal-card group">
                <div className="stats-icon-wrapper mb-4 group-hover:scale-110 transition-transform" style={{ margin: 0, padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Days Logged</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>{Math.round(loggedRatio)}%</div>
                <div style={{ marginTop: '0.75rem', padding: '4px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '100px', fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
                    {totalItems} Foods Added
                </div>
            </div>

            <div className="ff-meal-card group">
                <div className="stats-icon-wrapper mb-4 group-hover:scale-110 transition-transform" style={{ margin: 0, padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Weight Change</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ color: weightImpact >= 0 ? '#4ade80' : '#f87171' }}>{weightImpact >= 0 ? '+' : ''}{weightImpact.toFixed(2)}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>kg</span>
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, fontStyle: 'italic' }}>
                    Estimated Progress
                </div>
            </div>
        </div>
    );
};

export default AnalyticsStats;
