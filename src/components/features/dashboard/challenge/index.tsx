import { useState, useMemo, useCallback, useOptimistic, useTransition, useEffect } from 'react';
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

    // The user's current toggled state for today (local-only, for instant UI)
    const [localTodayLogs, setLocalTodayLogs] = useState<{ [taskCode: string]: boolean }>({});

    // Synchronize localTodayLogs with incoming data (when DB reflects changes)
    useEffect(() => {
        if (data?.today?.taskLogs) {
            const newLogs: { [taskCode: string]: boolean } = {};
            data.today.taskLogs.forEach(log => {
                newLogs[log.taskCode] = log.completed;
            });
            setLocalTodayLogs(newLogs);
        }
    }, [data]);

    // 2. Optimistic state using React 19 hook
    const [optimisticData, addOptimisticToggle] = useOptimistic(
        data,
        (state: ChallengeData | null, { taskCode, completed }: { taskCode: string, completed: boolean }) => {
            if (!state || !state.today) return state;
            const updatedToday = {
                ...state.today,
                taskLogs: state.today.taskLogs.map(log =>
                    log.taskCode === taskCode ? { ...log, completed } : log
                )
            };
            const updatedHistory = state.progress?.history.map(h =>
                new Date(h.date).toDateString() === new Date(state.today!.date).toDateString() ? updatedToday : h
            ) || [];
            return { ...state, today: updatedToday, progress: state.progress ? { ...state.progress, history: updatedHistory } : null };
        }
    );

    const [isPending, startTransition] = useTransition();

    // 3. Effect to sync with DB when deferredLogs settle
    // This effectively "drops" intermediate states if the user clicks 10 times quickly
    const syncWithDB = useCallback(async (taskCode: string) => {
        await handleToggle(taskCode);
    }, [handleToggle]);

    const handleCheckToggle = useCallback((taskCode: string) => {
        const currentComplete = localTodayLogs[taskCode] || false;
        const newComplete = !currentComplete;

        // Instant UI Update
        setLocalTodayLogs(prev => ({ ...prev, [taskCode]: newComplete }));

        startTransition(() => {
            addOptimisticToggle({ taskCode, completed: newComplete });
            // The actual API call is now handled by AbortController in useChallengeData
            syncWithDB(taskCode);
        });
    }, [localTodayLogs, addOptimisticToggle, syncWithDB]);

    const {
        notificationsEnabled,
        requestNotificationPermission
    } = useChallengeNotifications(optimisticData);

    const [expandedTask, setExpandedTask] = useState<string | null>(null);

    const handleExpandToggle = useCallback((taskCode: string) => {
        setExpandedTask(prev => prev === taskCode ? null : taskCode);
    }, []);

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
                        onToggle={() => handleCheckToggle(task.code)}
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
