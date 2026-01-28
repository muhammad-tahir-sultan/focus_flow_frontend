import React from 'react';
import type { FoodEntry, MealType } from '../../types/calories';

interface MealGridProps {
    entries: FoodEntry[];
}

const MealGrid: React.FC<MealGridProps> = ({ entries }) => {
    const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

    const mealData = mealTypes.map(type => {
        const mealEntries = entries.filter(e => e.mealType === type);
        const totalCals = mealEntries.reduce((sum, e) => sum + e.calories, 0);
        const count = mealEntries.length;

        return {
            type,
            calories: totalCals,
            count
        };
    });

    const getIcon = (type: MealType) => {
        switch (type) {
            case 'breakfast': return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            );
            case 'lunch': return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 20A7 7 0 0 1 11 6a7 7 0 0 1 0 14Zm0-14v14M4 13h14" />
                </svg>
            );
            case 'dinner': return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            );
            case 'snack': return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h12l3 6-9 12L3 9z" />
                </svg>
            );
            default: return null;
        }
    };

    return (
        <div className="ff-grid-4 ">
            {mealData.map((meal) => (
                <div key={meal.type} className="ff-meal-card group">
                    <div className="absolute top-0 left-0 w-full h-[4px] opacity-40" style={{
                        background: meal.type === 'breakfast' ? '#fb923c' :
                            meal.type === 'lunch' ? '#4ade80' :
                                meal.type === 'dinner' ? '#60a5fa' : '#a78bfa'
                    }}></div>

                    <div className="stats-icon-wrapper mb-4 group-hover:scale-110 transition-transform" style={{
                        margin: 0,
                        padding: '0.75rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'inset 0 0 10px rgba(255,255,255,0.02)'
                    }}>
                        {getIcon(meal.type)}
                    </div>

                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.25em', marginBottom: '0.5rem' }}>
                        {meal.type}
                    </div>

                    <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', display: 'flex', alignItems: 'baseline', gap: '6px', letterSpacing: '-0.02em' }}>
                        {meal.calories.toLocaleString()}
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: 700 }}>kcal</span>
                    </div>

                    <div style={{ marginTop: '0.75rem', padding: '4px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: '100px', fontSize: '10px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {meal.count} {meal.count === 1 ? 'Food' : 'Foods'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MealGrid;
