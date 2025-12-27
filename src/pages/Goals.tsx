import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { backendUrl } from '../main';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import '../styles/goals.css';

interface Goal {
    _id: string;
    title: string;
    category: string;
    horizon: string;
    endDate: string;
    status: string;
    dropReason?: string;
}

const CATEGORY_ICONS: Record<string, string> = {
    'Career': '💼',
    'Health': '🏃',
    'Finance': '💰',
    'Skills': '🛠️',
    'Personal': '🧘'
};

const TimeRemaining = ({ endDate }: { endDate: string }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date().getTime();
            const target = new Date(endDate).getTime();
            const diff = target - now;

            if (diff <= 0) return 'ELAPSED';

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (days > 0) return `${days}d ${hours}h ${minutes}m`;
            if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
            return `${minutes}m ${seconds}s`;
        };

        setTimeLeft(calculateTime());
        const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
        return () => clearInterval(timer);
    }, [endDate]);

    return <span className="time-remaining-value">{timeLeft}</span>;
};

const Goals = () => {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Career',
        horizon: '30 Days',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDropModal, setShowDropModal] = useState(false);
    const [droppingGoalId, setDroppingGoalId] = useState<string | null>(null);
    const [tempDropReason, setTempDropReason] = useState('');

    const calculateExpectedDate = (horizon: string) => {
        const date = new Date();
        switch (horizon) {
            case 'Daily': date.setDate(date.getDate() + 1); break;
            case '30 Days': date.setDate(date.getDate() + 30); break;
            case '3 Months': date.setMonth(date.getMonth() + 3); break;
            case '6 Months': date.setMonth(date.getMonth() + 6); break;
            case '1 Year': date.setFullYear(date.getFullYear() + 1); break;
            case '2 Years': date.setFullYear(date.getFullYear() + 2); break;
            case '3 Years': date.setFullYear(date.getFullYear() + 3); break;
            case '5 Years': date.setFullYear(date.getFullYear() + 5); break;
            default: date.setDate(date.getDate() + 30);
        }
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const fetchGoals = async () => {
        try {
            const res = await axios.get<Goal[]>(`${backendUrl}/goals`);
            // Sort newest first using _id timestamp or slice().reverse()
            const sortedGoals = res.data.sort((a, b) => b._id.localeCompare(a._id));
            setGoals(sortedGoals);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${backendUrl}/goals`, formData);
            toast.success('Mission Initialized: Objectives set and logged.', {
                style: {
                    background: '#0f0f11',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                icon: '🚀',
            });
            setFormData({ title: '', category: 'Career', horizon: '30 Days' });
            fetchGoals();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create goal');
            toast.error('Initialization Failed: Critical System Error.');
        }
    };

    const updateStatus = async (id: string, status: string, reason?: string) => {
        // Only trigger modal if we are dropping AND reason is strictly undefined (initial call)
        if (status === 'Dropped' && reason === undefined) {
            setDroppingGoalId(id);
            setTempDropReason('');
            setShowDropModal(true);
            return;
        }

        try {
            await axios.patch(`${backendUrl}/goals/${id}/status`, {
                status,
                dropReason: reason || ''
            });

            if (status === 'Completed') {
                toast.success('Mission Accomplished: Honor Gained.', {
                    style: {
                        background: '#0f0f11',
                        color: '#fff',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                    },
                    icon: '✅',
                });
            } else if (status === 'Dropped') {
                toast.error('Mission Aborted: Logged for Archive.', {
                    style: {
                        background: '#0f0f11',
                        color: '#fff',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                    },
                    icon: '🚨',
                });
            }

            setShowDropModal(false);
            setDroppingGoalId(null);
            setTempDropReason('');
            fetchGoals();
        } catch (err) {
            console.error('Failed to update mission status:', err);
            toast.error('Protocol Update Failed.');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="goals-page">
            <div className="bg-gradient"></div>
            <header className="goals-header">
                <h1>MISSION TRACKER</h1>
                <p>Define your horizons. Execute with precision. Master your life.</p>
            </header>

            <div className="goal-form-container">
                <h2 className="form-title"><span>🎯</span> New Objective</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-banner">{error}</div>}

                    <div className="input-group">
                        <label>Target Objective</label>
                        <input
                            type="text"
                            className="premium-input"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="Identify your next target..."
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label>Domain</label>
                            <select
                                className="premium-select"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {Object.keys(CATEGORY_ICONS).map(c => (
                                    <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Time Horizon</label>
                            <select
                                className="premium-select"
                                value={formData.horizon}
                                onChange={(e) => setFormData({ ...formData, horizon: e.target.value })}
                            >
                                {['Daily', '30 Days', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '5 Years'].map(h => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="deadline-preview">
                        🏁 Expected Mission Completion: <strong>{calculateExpectedDate(formData.horizon)}</strong>
                    </div>

                    <button type="submit" className="create-goal-btn">
                        INITIALIZE MISSION
                    </button>
                </form>
            </div>

            <div className="goals-grid">
                {goals.map((goal, index) => (
                    <div key={goal._id} className="goal-card-premium" style={{ animationDelay: `${index * 0.1}s` }}>
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
                                        onClick={() => updateStatus(goal._id, 'Completed')}
                                        className="btn-goal-action btn-complete"
                                        title="Complete Mission"
                                    >
                                        ✅ Done
                                    </button>
                                    <button
                                        onClick={() => updateStatus(goal._id, 'Dropped')}
                                        className="btn-goal-action btn-drop"
                                        title="Drop Mission"
                                    >
                                        ❌ Drop
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Premium Abort Modal */}
            {showDropModal && (
                <div className="modal-overlay">
                    <div className="premium-modal">
                        <div className="modal-header">
                            <h3>🚨 MISSION ABORTION</h3>
                            <button className="close-btn" onClick={() => setShowDropModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to terminate this objective? Document your reasoning for the technical debt archive.</p>
                            <textarea
                                className="premium-input"
                                placeholder="State reason for abortion..."
                                value={tempDropReason}
                                onChange={(e) => setTempDropReason(e.target.value)}
                                rows={4}
                                autoFocus
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn-cancel" onClick={() => setShowDropModal(false)}>CANCEL</button>
                            <button
                                className="btn-confirm-abort"
                                onClick={() => droppingGoalId && updateStatus(droppingGoalId, 'Dropped', tempDropReason)}
                            >
                                CONFIRM TERMINATION
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Goals;

