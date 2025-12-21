import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface DashboardStats {
    streak: number;
    activeGoals: number;
    logsThisWeek: number;
}

interface Log {
    date: string;
}

interface Goal {
    status: string;
}

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats>({ streak: 0, activeGoals: 0, logsThisWeek: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [logsRes, goalsRes] = await Promise.all([
                    axios.get<Log[]>('http://localhost:3000/daily-logs'),
                    axios.get<Goal[]>('http://localhost:3000/goals')
                ]);

                const logs = logsRes.data;
                const goals = goalsRes.data;

                // Calculate Streak (Simplified: consecutive days ending today or yesterday)
                let streak = 0;
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Sort logs descending
                const sortedLogs = logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                if (sortedLogs.length > 0) {
                    const lastLogDate = new Date(sortedLogs[0].date);
                    lastLogDate.setHours(0, 0, 0, 0);

                    const diffTime = Math.abs(today.getTime() - lastLogDate.getTime());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays <= 1) {
                        streak = 1;
                        // Check previous days
                        for (let i = 1; i < sortedLogs.length; i++) {
                            const prevDate = new Date(sortedLogs[i - 1].date);
                            const currDate = new Date(sortedLogs[i].date);
                            prevDate.setHours(0, 0, 0, 0);
                            currDate.setHours(0, 0, 0, 0);

                            const gap = (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);
                            if (gap === 1) {
                                streak++;
                            } else {
                                break;
                            }
                        }
                    }
                }

                // Active Goals
                const activeGoals = goals.filter(g => g.status === 'Active').length;

                // Logs this week
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
                const logsThisWeek = logs.filter(l => new Date(l.date) >= startOfWeek).length;

                setStats({ streak, activeGoals, logsThisWeek });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="container">Loading...</div>;

    const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="mb-8">
                <h2 className="heading-lg" style={{ color: 'var(--text-secondary)' }}>Today is</h2>
                <h1 className="heading-xl">{todayDate}</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card">
                    <h3 className="text-sm">Current Streak</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '700', color: 'var(--accent-color)' }}>{stats.streak} <span style={{ fontSize: '1rem' }}>days</span></div>
                </div>
                <div className="card">
                    <h3 className="text-sm">Active Goals</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '700' }}>{stats.activeGoals}</div>
                </div>
                <div className="card">
                    <h3 className="text-sm">Logs This Week</h3>
                    <div style={{ fontSize: '3rem', fontWeight: '700' }}>{stats.logsThisWeek}</div>
                </div>
            </div>

            <div className="flex-between">
                <h2 className="heading-lg">Quick Actions</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Link to="/log" className="btn btn-primary" style={{ textAlign: 'center', display: 'block' }}>
                    Log Daily Execution
                </Link>
                <Link to="/goals" className="btn" style={{ textAlign: 'center', display: 'block', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
                    Manage Goals
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
