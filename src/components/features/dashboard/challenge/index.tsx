import { useState } from 'react';
import '../../../../styles/TwoMonthChallenge.css';
import { useChallengeData } from './useChallengeData';
import { useChallengeNotifications } from './useChallengeNotifications';
import type { TaskLog } from './types';
import { TASKS } from './types';
import ChallengeHeader from './ChallengeHeader';
import ChallengeTaskItem from './ChallengeTaskItem';
import ChallengeForecast from './ChallengeForecast';
import ChallengeHistory from './ChallengeHistory';
import ChallengeSkeleton from './ChallengeSkeleton';

const TwoMonthChallenge = () => {
    const {
        data,
        loading,
        editMode,
        handleToggle,
        handleSaveDetails,
        updateEditMode
    } = useChallengeData();

    const {
        notificationsEnabled,
        requestNotificationPermission
    } = useChallengeNotifications(data);

    const [expandedTask, setExpandedTask] = useState<string | null>(null);

    if (loading) return <ChallengeSkeleton />;

    const completedCount = data?.today?.taskLogs?.filter(l => l.completed).length || 0;
    const progressPercent = data?.progress?.consistencyPercentage || 0;
    const perfectPercent = data?.progress?.completionPercentage || 0;
    const activeDays = data?.progress?.activeDays || 0;

    // Forecast calculation for 2 months (approx 8.5 weeks)
    // Formula: 2 sessions/week * 8.5 weeks = ~17 sessions total
    const SESSIONS_IN_CHALLENGE = 17;
    const forecast = {
        pushups: 100 * SESSIONS_IN_CHALLENGE,
        pullups: 10 * SESSIONS_IN_CHALLENGE,
        situps: 100 * SESSIONS_IN_CHALLENGE, // Assuming core with push or legs
        squats: 150 * SESSIONS_IN_CHALLENGE
    };

    const totals = (data?.progress?.history || []).reduce((acc, entry) => {
        entry.taskLogs.forEach((log: TaskLog) => {
            if (log.completed) {
                if (log.taskCode === "pushups") acc.pushups += 100;
                if (log.taskCode === "pullups") acc.pullups += 10;
                if (log.taskCode === "situps") acc.situps += 100;
                if (log.taskCode === "squats") acc.squats += 150;
            }
        });
        return acc;
    }, { pushups: 0, pullups: 0, situps: 0, squats: 0 });

    return (
        <div className="challenge-card">
            <ChallengeHeader
                activeDays={activeDays}
                completedCount={completedCount}
                totalTasks={TASKS.length}
                progressPercent={progressPercent}
                perfectPercent={perfectPercent}
                notificationsEnabled={notificationsEnabled}
                onToggleNotifications={requestNotificationPermission}
            />

            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${(activeDays / 60) * 100}%` }}
                ></div>
            </div>

            <div className="tasks-grid">
                {TASKS.map((task) => (
                    <ChallengeTaskItem
                        key={task.code}
                        task={task}
                        log={data?.today?.taskLogs.find(l => l.taskCode === task.code)}
                        isExpanded={expandedTask === task.code}
                        onExpand={() => setExpandedTask(expandedTask === task.code ? null : task.code)}
                        onToggle={() => handleToggle(task.code)}
                        onSaveDetails={() => handleSaveDetails(task.code, () => setExpandedTask(null))}
                        currentEdit={editMode[task.code] || { value: '', note: '' }}
                        onUpdateEdit={(field, val) => updateEditMode(task.code, field, val)}
                    />
                ))}
            </div>

            <ChallengeForecast totals={totals} forecast={forecast} />
            <div className="outcome-message" style={{ margin: '0 2rem 2rem 2rem' }}>
                Gradual Overload: Following a PPL routine (2x/week each). Moving from multiple sets to achieving target reps in a single set by Day 60. Sunday is a dedicated rest day.
            </div>
            <ChallengeHistory history={data?.progress?.history || []} />
        </div>
    );
};

export default TwoMonthChallenge;
