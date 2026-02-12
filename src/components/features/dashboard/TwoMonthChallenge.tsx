import { useEffect, useState } from 'react';
import '../../../styles/TwoMonthChallenge.css';
import { challengeApi } from '../../../api/challenge';
import toast from 'react-hot-toast';

const TASKS = [
    { code: "pushups", label: "100 Push ups" },
    { code: "pullups", label: "10 Pull Ups" },
    { code: "situps", label: "100 Sit Ups" },
    { code: "squats", label: "150 Squats" },
    { code: "plank", label: "1 Minute Plank Hold - 3x Set" },
    { code: "bike", label: "Bike" },
    { code: "income", label: "Second Source of Income" },
    { code: "appointment", label: "No Appointment" },
];

interface TaskLog {
    taskCode: string;
    value: string;
    note: string;
    completed: boolean;
}

interface ChallengeData {
    today: {
        userId: string;
        date: string;
        taskLogs: TaskLog[];
        isFullyCompleted: boolean;
    } | null;
    progress: {
        history: any[];
        totalDays: number;
        activeDays: number;
        perfectDays: number;
        consistencyPercentage: number;
        completionPercentage: number;
    } | null;
}

const TwoMonthChallenge = () => {
    const [data, setData] = useState<ChallengeData | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedTask, setExpandedTask] = useState<string | null>(null);
    const [editMode, setEditMode] = useState<{ [key: string]: { value: string, note: string } }>({});
    const [notificationsEnabled, setNotificationsEnabled] = useState(Notification.permission === 'granted');

    const fetchData = async () => {
        try {
            const result = await challengeApi.getProgress();
            setData(result);

            // Initialize edit mode with current values
            const initialEditMode: { [key: string]: { value: string, note: string } } = {};
            result.today?.taskLogs.forEach((log: TaskLog) => {
                initialEditMode[log.taskCode] = { value: log.value, note: log.note };
            });
            setEditMode(initialEditMode);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load challenge data");
        } finally {
            setLoading(false);
        }
    };

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            setNotificationsEnabled(true);
            toast.success("Notifications enabled for daily reminders!");
            // Send a welcome notification
            new Notification("Transformation Tracker", {
                body: "You'll receive daily reminders to complete your tasks!",
                icon: "/favicon.ico"
            });
        } else {
            setNotificationsEnabled(false);
            toast.error("Notification permission denied.");
        }
    };

    const [lastNotified, setLastNotified] = useState<string | null>(null);

    const checkAndNotify = () => {
        if (Notification.permission !== 'granted' || !data || data.today?.isFullyCompleted) return;

        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const todayStr = now.toDateString();
        const combinedKey = `${todayStr}-${hour}`;

        // Notify at 10:00 AM, 2:00 PM (14), and 8:00 PM (20)
        // Ensure we only notify once per scheduled hour
        if ([10, 14, 20].includes(hour) && minute === 0 && lastNotified !== combinedKey) {
            new Notification("Transformation Tracker", {
                body: `You still have ${TASKS.length - (data.today?.taskLogs.filter(l => l.completed).length || 0)} tasks remaining today. Stay consistent!`,
                icon: "/favicon.ico",
                badge: "/favicon.ico"
            });
            setLastNotified(combinedKey);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(checkAndNotify, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const handleToggle = async (taskCode: string) => {
        if (!data || !data.today) return;

        const currentLog = data.today.taskLogs.find(l => l.taskCode === taskCode);
        const newCompleted = !currentLog?.completed;
        const currentEdit = editMode[taskCode] || { value: '', note: '' };

        try {
            const result = await challengeApi.toggleTask(taskCode, newCompleted, currentEdit.value, currentEdit.note);
            setData({ ...data, today: result });
            toast.success(newCompleted ? "Task marked complete!" : "Task reset.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task");
        }
    };

    const handleSaveDetails = async (taskCode: string) => {
        if (!data || !data.today) return;

        const currentLog = data.today.taskLogs.find(l => l.taskCode === taskCode);
        const currentEdit = editMode[taskCode] || { value: '', note: '' };

        try {
            const result = await challengeApi.toggleTask(taskCode, currentLog?.completed || false, currentEdit.value, currentEdit.note);
            setData({ ...data, today: result });
            toast.success("Progress saved!");
            setExpandedTask(null);
        } catch (error) {
            console.error(error);
            toast.error("Failed to save progress");
        }
    };

    if (loading) return <div className="challenge-card animate-pulse">Loading Challenge...</div>;

    const completedCount = data?.today?.taskLogs?.filter(l => l.completed).length || 0;
    const progressPercent = data?.progress?.consistencyPercentage || 0;
    const perfectPercent = data?.progress?.completionPercentage || 0;
    const activeDays = data?.progress?.activeDays || 0;

    // Forecast calculation for 60 days
    const forecast = {
        pushups: 100 * 60,
        pullups: 10 * 60,
        situps: 100 * 60,
        squats: 150 * 60
    };

    // Calculate current totals from history
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
                        onClick={requestNotificationPermission}
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
                        <div className="stat-value">{completedCount}/{TASKS.length}</div>
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

            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${(activeDays / 60) * 100}%` }}
                ></div>
            </div>

            <div className="tasks-grid">
                {TASKS.map((task) => {
                    const log = data?.today?.taskLogs.find(l => l.taskCode === task.code);
                    const isExpanded = expandedTask === task.code;
                    const currentEdit = editMode[task.code] || { value: '', note: '' };

                    return (
                        <div
                            key={task.code}
                            className={`task-wrapper ${isExpanded ? 'expanded' : ''}`}
                        >
                            <div className={`task-item ${log?.completed ? 'completed' : ''}`}>
                                <div className="task-main" onClick={() => handleToggle(task.code)}>
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
                                    onClick={() => setExpandedTask(isExpanded ? null : task.code)}
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
                                            onChange={(e) => setEditMode({
                                                ...editMode,
                                                [task.code]: { ...currentEdit, value: e.target.value }
                                            })}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label>Quick Note</label>
                                        <textarea
                                            placeholder="How did it feel? What did you do?"
                                            value={currentEdit.note}
                                            onChange={(e) => setEditMode({
                                                ...editMode,
                                                [task.code]: { ...currentEdit, note: e.target.value }
                                            })}
                                        />
                                    </div>
                                    <button className="save-progress-btn" onClick={() => handleSaveDetails(task.code)}>
                                        Save Daily Progress
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="forecast-section">
                <h3 className="forecast-title">60-Day Transformation Forecast</h3>
                <div className="forecast-grid">
                    <div className="forecast-item">
                        <span className="forecast-val">{totals.pushups.toLocaleString()} / {forecast.pushups.toLocaleString()}</span>
                        <span className="forecast-lab">Push Ups Total</span>
                    </div>
                    <div className="forecast-item">
                        <span className="forecast-val">{totals.situps.toLocaleString()} / {forecast.situps.toLocaleString()}</span>
                        <span className="forecast-lab">Sit Ups Total</span>
                    </div>
                    <div className="forecast-item">
                        <span className="forecast-val">{totals.squats.toLocaleString()} / {forecast.squats.toLocaleString()}</span>
                        <span className="forecast-lab">Squats Total</span>
                    </div>
                    <div className="forecast-item">
                        <span className="forecast-val">{totals.pullups.toLocaleString()} / {forecast.pullups.toLocaleString()}</span>
                        <span className="forecast-lab">Pull Ups Total</span>
                    </div>
                </div>
                <div className="outcome-message">
                    Gradual overload: Moving from multiple sets to achieving target reps in a single set by Day 60.
                </div>
            </div>

            <div className="history-section">
                <h3 className="forecast-title">Recent Movement</h3>
                <div className="history-timeline">
                    {(data?.progress?.history || []).slice(-7).reverse().map((entry: any) => (
                        <div key={entry.date} className="history-day">
                            <span className="history-date">
                                {new Date(entry.date).toLocaleDateString([], { weekday: 'short', day: 'numeric' })}
                            </span>
                            <div className="history-dots">
                                {TASKS.map(task => {
                                    const log = entry.taskLogs.find((l: any) => l.taskCode === task.code);
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
                    {(!data?.progress?.history || data.progress.history.length === 0) && (
                        <p className="no-history">Consistency starts today. Log your first session!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TwoMonthChallenge;
