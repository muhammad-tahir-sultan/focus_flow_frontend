import React from 'react';
import type { TaskLog, TaskDefinition } from './types';

interface ChallengeTaskItemProps {
    task: TaskDefinition;
    log: TaskLog | undefined;
    isExpanded: boolean;
    onExpand: () => void;
    onToggle: () => void;
    onSaveDetails: () => void;
    currentEdit: { value: string; note: string };
    onUpdateEdit: (field: 'value' | 'note', val: string) => void;
}

const ChallengeTaskItem: React.FC<ChallengeTaskItemProps> = ({
    task,
    log,
    isExpanded,
    onExpand,
    onToggle,
    onSaveDetails,
    currentEdit,
    onUpdateEdit
}) => {
    return (
        <div className={`task-wrapper ${isExpanded ? 'expanded' : ''}`}>
            <div className={`task-item ${log?.completed ? 'completed' : ''}`}>
                <div className="task-main" onClick={onToggle}>
                    <div className="checkbox">
                        {log?.completed && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        )}
                    </div>
                    <div className="task-info">
                        <span className="task-text">{task.label}</span>
                        {log?.value && <span className="task-value-badge">{log.value}</span>}
                    </div>
                </div>
                <button
                    className="expand-btn"
                    onClick={onExpand}
                >
                    {isExpanded ? 'Collapse' : 'Log Details'}
                </button>
            </div>

            {isExpanded && (
                <div className="task-details-pane">
                    <div className="input-group">
                        <label>Progress (Reps/Sets/Metric)</label>
                        <input
                            type="text"
                            placeholder={
                                task.code === 'bike' ? "e.g. Saved 10k Rs." :
                                    task.code === 'income' ? "e.g. $50 earned, 2 outreach emails" :
                                        task.code === 'appointment' ? "e.g. 100% free day, no bookings" :
                                            "e.g. 3 sets of 30, 10"
                            }
                            value={currentEdit.value}
                            onChange={(e) => onUpdateEdit('value', e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Quick Note</label>
                        <textarea
                            placeholder="How did it feel? What did you do?"
                            value={currentEdit.note}
                            onChange={(e) => onUpdateEdit('note', e.target.value)}
                        />
                    </div>
                    <button className="save-progress-btn" onClick={onSaveDetails}>
                        Save Daily Progress
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChallengeTaskItem;
