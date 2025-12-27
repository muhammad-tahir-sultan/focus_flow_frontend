import React, { useState, useEffect } from 'react';
import { formatTimeRemaining } from '../../../utils/dateUtils';
import { CATEGORY_ICONS } from '../../../constants/goals';
import type { Goal } from '../../../types/goals';

interface GoalCardProps {
    goal: Goal;
    index: number;
    onUpdateStatus: (id: string, status: string) => void;
}

const TimeRemaining = ({ endDate }: { endDate: string }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        setTimeLeft(formatTimeRemaining(endDate));
        const timer = setInterval(() => setTimeLeft(formatTimeRemaining(endDate)), 1000);
        return () => clearInterval(timer);
    }, [endDate]);

    return <span className="time-remaining-value">{timeLeft}</span>;
};

const GoalCard: React.FC<GoalCardProps> = ({ goal, index, onUpdateStatus }) => {
    return (
        <div className="goal-card-premium" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="goal-card-top">
                <div className="goal-card-category">
                    {CATEGORY_ICONS[goal.category] || '🎯'} {goal.category}
                </div>
                <h3 className="goal-card-title">{goal.title}</h3>
                {goal.status === 'Active' && (
                    <div className="mission-timer">
                        <span className="timer-label">TIME REMAINING:</span>
                        <TimeRemaining endDate={goal.endDate} />
                    </div>
                )}
                {goal.status !== 'Active' && (
                    <span className={`status-badge status-${goal.status.toLowerCase()}`}>
                        {goal.status}
                    </span>
                )}
                {goal.status === 'Dropped' && (
                    <div className="drop-reason-box">
                        <strong>ABORT REASON:</strong> {goal.dropReason || 'Strategic redirection (no additional details recorded).'}
                    </div>
                )}
            </div>

            <div className="goal-card-footer">
                <div className="goal-horizon">
                    ⏳ {goal.horizon} • {new Date(goal.endDate).toLocaleDateString()}
                </div>

                {goal.status === 'Active' && (
                    <div className="goal-actions">
                        <button
                            onClick={() => onUpdateStatus(goal._id, 'Completed')}
                            className="btn-goal-action btn-complete"
                            title="Complete Mission"
                        >
                            ✅ Done
                        </button>
                        <button
                            onClick={() => onUpdateStatus(goal._id, 'Dropped')}
                            className="btn-goal-action btn-drop"
                            title="Drop Mission"
                        >
                            ❌ Drop
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoalCard;
