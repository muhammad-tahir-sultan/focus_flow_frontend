import React, { useMemo } from 'react';
import '../../styles/calories.css';

interface CalorieDashboardProps {
    consumed: number;
    goal: number;
    streak: number;
    onEditGoal: () => void;
}

const CalorieDashboard: React.FC<CalorieDashboardProps> = ({ consumed, goal, streak, onEditGoal }) => {
    const remaining = goal - consumed;
    const percentage = Math.min(100, Math.max(0, (consumed / goal) * 100));

    // Determine color state
    let statusColor = 'var(--success-color)'; // Green
    if (percentage > 85) statusColor = '#EAB308'; // Yellow/Warning
    if (consumed > goal) statusColor = 'var(--error-color)'; // Red

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const remainingText = useMemo(() => {
        if (remaining >= 0) return `${remaining} kcal remaining`;
        return `${Math.abs(remaining)} kcal over limit`;
    }, [remaining]);

    return (
        <div className="card-premium" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            {streak > 0 && (
                <div className="streak-badge" title="Current logging streak">
                    🔥 {streak}
                </div>
            )}

            <h3 className="heading-lg" style={{ marginBottom: '2rem' }}>Daily Summary</h3>

            <div className="calorie-ring-container">
                <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Background Circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
                        stroke={statusColor}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="calorie-ring-circle"
                    />
                </svg>

                <div className="calorie-stats">
                    <span className="calorie-value" style={{ color: statusColor }}>
                        {consumed}
                    </span>
                    <span className="calorie-label">
                        / {goal} kcal
                    </span>
                </div>
            </div>
            <div className="mt-4 text-center">
                <p className="text-lg font-medium" style={{
                    color: remaining < 0 ? 'var(--error-color)' : 'var(--text-primary)',
                    marginTop: '1rem',
                    fontSize: '1.2rem',
                    fontWeight: 600
                }}>
                    {remainingText}
                </p>

                <div className="mt-2 text-xs text-white/40 font-medium tracking-wide">
                    {remaining < 0 ? (
                        <span className="text-red-400">
                            Estimated Gain: +{Math.abs(remaining / 7700).toFixed(3)} kg
                        </span>
                    ) : (
                        <span className="text-green-400">
                            Potential Progress: -{Math.abs(remaining / 7700).toFixed(3)} kg
                        </span>
                    )}
                </div>

                <button
                    onClick={onEditGoal}
                    className="btn-premium-ghost mt-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Adjust Goal
                </button>
            </div>
        </div>
    );
};

export default CalorieDashboard;
