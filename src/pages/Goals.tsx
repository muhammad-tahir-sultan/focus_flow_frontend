import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { backendUrl } from '../main';
import Loader from '../components/Loader';
import '../styles/goals.css';

interface Goal {
    _id: string;
    title: string;
    category: string;
    horizon: string;
    endDate: string;
    status: string;
}

const CATEGORY_ICONS: Record<string, string> = {
    'Career': '💼',
    'Health': '🏃',
    'Finance': '💰',
    'Skills': '🛠️',
    'Personal': '🧘'
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

    const fetchGoals = async () => {
        try {
            const res = await axios.get<Goal[]>(`${backendUrl}/goals`);
            setGoals(res.data);
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
            setFormData({ title: '', category: 'Career', horizon: '30 Days' });
            fetchGoals();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create goal');
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await axios.patch(`${backendUrl}/goals/${id}/status`, { status });
            fetchGoals();
        } catch (err) {
            console.error(err);
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
                            {goal.status !== 'Active' && (
                                <span className={`status-badge status-${goal.status.toLowerCase()}`}>
                                    {goal.status}
                                </span>
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
        </div>
    );
};

export default Goals;

