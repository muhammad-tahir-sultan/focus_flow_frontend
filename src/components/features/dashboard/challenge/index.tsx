import { useState, useMemo, useCallback, useOptimistic, useTransition } from 'react';
import '../../../../styles/TwoMonthChallenge.css';
import { useChallengeData } from './useChallengeData';
import { useChallengeNotifications } from './useChallengeNotifications';
import type { TaskLog, ChallengeData } from './types';
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

    // Optimistic state for the entire challenge data to ensure stats update too
    const [optimisticData, addOptimisticToggle] = useOptimistic(
        data,
        (state: ChallengeData | null, { taskCode, completed }: { taskCode: string, completed: boolean }) => {
            if (!state || !state.today) return state;

            // Update today's logs
            const updatedToday = {
                ...state.today,
                taskLogs: state.today.taskLogs.map(log =>
                    log.taskCode === taskCode ? { ...log, completed } : log
                )
            };

            // Update history to keep stats in sync optimistically
            const updatedHistory = state.progress?.history.map(h =>
                new Date(h.date).toDateString() === new Date(state.today!.date).toDateString()
                    ? updatedToday
                    : h
            ) || [];

            return {
                ...state,
                today: updatedToday,
                progress: state.progress ? { ...state.progress, history: updatedHistory } : null
            };
        }
    );

    const [isPending, startTransition] = useTransition();

    const {
        notificationsEnabled,
        requestNotificationPermission
    } = useChallengeNotifications(optimisticData);

    const [expandedTask, setExpandedTask] = useState<string | null>(null);

    const handleExpandToggle = useCallback((taskCode: string) => {
        setExpandedTask(prev => prev === taskCode ? null : taskCode);
    }, []);

    const handleOptimisticToggle = useCallback((taskCode: string) => {
        const currentLog = optimisticData?.today?.taskLogs.find(l => l.taskCode === taskCode);
        const newCompleted = !currentLog?.completed;

        startTransition(async () => {
            addOptimisticToggle({ taskCode, completed: newCompleted });
            await handleToggle(taskCode);
        });
    }, [optimisticData, addOptimisticToggle, handleToggle]);

    const stats = useMemo(() => {
        const completedCount = optimisticData?.today?.taskLogs?.filter(l => l.completed).length || 0;
        const progressPercent = optimisticData?.progress?.consistencyPercentage || 0;
        const perfectPercent = optimisticData?.progress?.completionPercentage || 0;
        const activeDays = optimisticData?.progress?.activeDays || 0;
        return { completedCount, progressPercent, perfectPercent, activeDays };
    }, [optimisticData]);

    const forecast = useMemo(() => {
        const SESSIONS_IN_CHALLENGE = 17;
        return {
            pushups: 100 * SESSIONS_IN_CHALLENGE,
            pullups: 10 * SESSIONS_IN_CHALLENGE,
            situps: 100 * SESSIONS_IN_CHALLENGE,
            squats: 150 * SESSIONS_IN_CHALLENGE
        };
    }, []);

    const totals = useMemo(() => {
        return (optimisticData?.progress?.history || []).reduce((acc, entry) => {
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
    }, [optimisticData?.progress?.history]);

    if (loading) return <ChallengeSkeleton />;

    return (
        <div className={`challenge-card ${isPending ? 'opac-pending' : ''}`}>
            <ChallengeHeader
                activeDays={stats.activeDays}
                completedCount={stats.completedCount}
                totalTasks={TASKS.length}
                progressPercent={stats.progressPercent}
                perfectPercent={stats.perfectPercent}
                notificationsEnabled={notificationsEnabled}
                onToggleNotifications={requestNotificationPermission}
            />

            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${(stats.activeDays / 60) * 100}%` }}
                ></div>
            </div>

            <div className="tasks-grid">
                {TASKS.map((task) => (
                    <ChallengeTaskItem
                        key={task.code}
                        task={task}
                        log={optimisticData?.today?.taskLogs.find(l => l.taskCode === task.code)}
                        isExpanded={expandedTask === task.code}
                        onExpand={() => handleExpandToggle(task.code)}
                        onToggle={() => handleOptimisticToggle(task.code)}
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
            <ChallengeHistory history={optimisticData?.progress?.history || []} />
        </div>
    );
};

export default TwoMonthChallenge;
