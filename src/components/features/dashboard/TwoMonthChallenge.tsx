import { useEffect, useState } from 'react';
import '../../../styles/TwoMonthChallenge.css';
import { challengeApi } from '../../../api/challenge';
import toast from 'react-hot-toast';

const TASKS = [
    "100 Push ups",
    "10 Pull Ups",
    "100 Sit Ups",
    "150 Squats",
    "1 Minute Plank Hold - 3x Set",
    "Bike",
    "Must Have Second Source of Income",
    "No Appointment",
];

interface ChallengeData {
    today: {
        userId: string;
        date: string;
        completedTasks: string[];
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

    const fetchData = async () => {
        try {
            const result = await challengeApi.getProgress();
            setData(result);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load challenge data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleToggle = async (task: string) => {
        if (!data || !data.today) return;

        const isCompleted = data.today.completedTasks.includes(task);
        const newCompleted = !isCompleted;

        // Optimistic update
        const updatedTasks = newCompleted
            ? [...data.today.completedTasks, task]
            : data.today.completedTasks.filter(t => t !== task);

        const updatedToday = {
            ...data.today,
            completedTasks: updatedTasks,
            isFullyCompleted: updatedTasks.length === TASKS.length
        };

        setData({
            ...data,
            today: updatedToday
        });

        try {
            await challengeApi.toggleTask(task, newCompleted);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task");
            // Revert on error
            fetchData();
        }
    };

    if (loading) return <div className="challenge-card animate-pulse">Loading Challenge...</div>;

    const completedCount = data?.today?.completedTasks?.length || 0;
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
        if (entry.completedTasks.includes("100 Push ups")) acc.pushups += 100;
        if (entry.completedTasks.includes("10 Pull Ups")) acc.pullups += 10;
        if (entry.completedTasks.includes("100 Sit Ups")) acc.situps += 100;
        if (entry.completedTasks.includes("150 Squats")) acc.squats += 150;
        return acc;
    }, { pushups: 0, pullups: 0, situps: 0, squats: 0 });

    return (
        <div className="challenge-card">
            <div className="challenge-header">
                <div>
                    <h2 className="challenge-title">Last Wish Come Back (2 Months)</h2>
                    <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem' }}>
                        Transform yourself in 60 days. Day {activeDays} / 60
                    </p>
                </div>

                <div className="challenge-stats">
                    <div className="stat-item">
                        <div className="stat-value">{completedCount}/{TASKS.length}</div>
                        <div className="stat-label">Today</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{Math.round(progressPercent)}%</div>
                        <div className="stat-label">Consistency</div>
                    </div>
                    <div className="stat-item" title="Percent of days fully completed">
                        <div className="stat-value">{Math.round(perfectPercent)}%</div>
                        <div className="stat-label">Perfect</div>
                    </div>
                </div>
            </div>

            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${(activeDays / 60) * 100}%` }}
                    title={`Progress: ${activeDays}/60 Days`}
                ></div>
            </div>

            <div className="tasks-grid">
                {TASKS.map((task) => {
                    const isCompleted = data?.today?.completedTasks.includes(task);
                    return (
                        <div
                            key={task}
                            className={`task-item ${isCompleted ? 'completed' : ''}`}
                            onClick={() => handleToggle(task)}
                        >
                            <div className="checkbox">
                                {isCompleted && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <span className="task-text">{task}</span>
                        </div>
                    );
                })}
            </div>

            <div className="forecast-section">
                <h3 className="forecast-title">60-Day Transformation Goal</h3>
                <div className="forecast-grid">
                    <div className="forecast-item">
                        <span className="forecast-val">{totals.pushups.toLocaleString()} / {forecast.pushups.toLocaleString()}</span>
                        <span className="forecast-lab">Push Ups</span>
                    </div>
                    <div className="forecast-item">
                        <span className="forecast-val">{totals.situps.toLocaleString()} / {forecast.situps.toLocaleString()}</span>
                        <span className="forecast-lab">Sit Ups</span>
                    </div>
                    <div className="forecast-item">
                        <span className="forecast-val">{totals.squats.toLocaleString()} / {forecast.squats.toLocaleString()}</span>
                        <span className="forecast-lab">Squats</span>
                    </div>
                    <div className="forecast-item">
                        <span className="forecast-val">{totals.pullups.toLocaleString()} / {forecast.pullups.toLocaleString()}</span>
                        <span className="forecast-lab">Pull Ups</span>
                    </div>
                </div>
                <div className="outcome-message">
                    Objective: Build a resilient body, establish a 2nd income stream, and achieve complete lifestyle autonomy.
                </div>
            </div>
        </div>
    );
};

export default TwoMonthChallenge;
