import React from 'react';
import { TASKS } from './types';
import type { TaskLog } from './types';

interface ChallengeHistoryProps {
    history: any[];
}

const ChallengeHistory: React.FC<ChallengeHistoryProps> = ({ history }) => {
    return (
        <div className="history-section">
            <h3 className="forecast-title">Recent Movement</h3>
            <div className="history-timeline">
                {(history || []).slice(-7).reverse().map((entry: any) => (
                    <div key={entry.date} className="history-day">
                        <span className="history-date">
                            {new Date(entry.date).toLocaleDateString([], { weekday: 'short', day: 'numeric' })}
                        </span>
                        <div className="history-dots">
                            {TASKS.map(task => {
                                const log = entry.taskLogs.find((l: TaskLog) => l.taskCode === task.code);
                                return (
                                    <div
                                        key={task.code}
                                        className={`history-dot ${log?.completed ? 'active' : ''}`}
                                        title={`${task.label}: ${log?.value || 'No details'}`}
                                    ></div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChallengeHistory;
