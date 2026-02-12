import React, { memo } from 'react';

interface ChallengeHeaderProps {
    activeDays: number;
    completedCount: number;
    totalTasks: number;
    progressPercent: number;
    perfectPercent: number;
    notificationsEnabled: boolean;
    onToggleNotifications: () => void;
}

const ChallengeHeader: React.FC<ChallengeHeaderProps> = memo(({
    activeDays,
    completedCount,
    totalTasks,
    progressPercent,
    perfectPercent,
    notificationsEnabled,
    onToggleNotifications
}) => {
    return (
        <div className="challenge-header">
            <div className="challenge-title-row">
                <div>
                    <h2 className="challenge-title">The 2-Month Transformation</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
                        Gradual Progress Tracker • Day {activeDays} / 60
                    </p>
                </div>
                <button
                    className={`notification-toggle ${notificationsEnabled ? 'active' : ''}`}
                    onClick={onToggleNotifications}
                    title={notificationsEnabled ? "Reminders active" : "Enable daily reminders"}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    {notificationsEnabled && <span className="notif-dot"></span>}
                </button>
            </div>

            <div className="challenge-stats">
                <div className="stat-item">
                    <div className="stat-value">{completedCount}/{totalTasks}</div>
                    <div className="stat-label">Today</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{Math.round(progressPercent)}%</div>
                    <div className="stat-label">Streak</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{Math.round(perfectPercent)}%</div>
                    <div className="stat-label">Perfect</div>
                </div>
            </div>
        </div>
    );
});

export default ChallengeHeader;
