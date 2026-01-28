import React from 'react';
import type { MealType } from '../../../types/calories';

interface AnalyticsMacrosProps {
    p: number;
    c: number;
    f: number;
    calories: number;
    loggedRatio: number;
    days: number;
    mealTypeData: Record<MealType, number>;
}

const AnalyticsMacros: React.FC<AnalyticsMacrosProps> = ({
    p,
    c,
    f,
    calories,
    loggedRatio,
    days,
    mealTypeData
}) => {
    const loggedDays = (loggedRatio * days) / 100 || 1;

    return (
        <div className="ff-grid-4 analytics-section-gap">
            {/* Protein Card */}
            <div className="ff-meal-card group">
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '1.5rem' }}>Protein</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    {Math.round(p)}<span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>g</span>
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '13px', fontWeight: 900, color: '#60a5fa' }}>
                    {Math.round((p * 4 / (calories || 1)) * 100)}% <span style={{ fontSize: '9px', opacity: 0.5, color: 'white' }}>of total</span>
                </div>
                <div style={{ width: '80%', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.round((p * 4 / (calories || 1)) * 100)}%`, height: '100%', background: '#60a5fa', boxShadow: '0 0 10px rgba(96, 165, 250, 0.4)' }}></div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>Avg: {Math.round(p / loggedDays)}g / day</div>
            </div>

            {/* Carbs Card */}
            <div className="ff-meal-card group">
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '1.5rem' }}>Carbs</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    {Math.round(c)}<span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>g</span>
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '13px', fontWeight: 900, color: '#facc15' }}>
                    {Math.round((c * 4 / (calories || 1)) * 100)}% <span style={{ fontSize: '9px', opacity: 0.5, color: 'white' }}>of total</span>
                </div>
                <div style={{ width: '80%', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.round((c * 4 / (calories || 1)) * 100)}%`, height: '100%', background: '#facc15', boxShadow: '0 0 10px rgba(250, 204, 21, 0.4)' }}></div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>Avg: {Math.round(c / loggedDays)}g / day</div>
            </div>

            {/* Fat Card */}
            <div className="ff-meal-card group">
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '1.5rem' }}>Fat</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    {Math.round(f)}<span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>g</span>
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '13px', fontWeight: 900, color: '#a78bfa' }}>
                    {Math.round((f * 9 / (calories || 1)) * 100)}% <span style={{ fontSize: '9px', opacity: 0.5, color: 'white' }}>of total</span>
                </div>
                <div style={{ width: '80%', background: 'rgba(255,255,255,0.05)', height: '4px', borderRadius: '10px', marginTop: '1.5rem', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.round((f * 9 / (calories || 1)) * 100)}%`, height: '100%', background: '#a78bfa', boxShadow: '0 0 10px rgba(167, 139, 250, 0.4)' }}></div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '9px', color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>Avg: {Math.round(f / loggedDays)}g / day</div>
            </div>

            {/* Meal Distribution Card */}
            <div className="ff-meal-card group">
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '1rem' }}>Distribution</div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
                    {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map(meal => {
                        const val = mealTypeData[meal] || 0;
                        const pct = Math.round((val / (calories || 1)) * 100);
                        return (
                            <div key={meal} className="flex flex-col gap-1">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>{meal}</span>
                                    <span style={{ color: 'white' }}>{pct}%</span>
                                </div>
                                <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '3px', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${pct}%`,
                                        height: '100%',
                                        background: meal === 'breakfast' ? '#fb923c' :
                                            meal === 'lunch' ? '#4ade80' :
                                                meal === 'dinner' ? '#60a5fa' : '#a78bfa'
                                    }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsMacros;
