import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { backendUrl } from '../main';
import Loader from '../components/Loader';

interface Goal {
    _id: string;
    title: string;
    category: string;
    horizon: string;
    endDate: string;
    status: string;
}

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
        <div style={{ width: '100%' }}>
            <h2 className="heading-xl mb-8" style={{ textAlign: 'center' }}>Manage Goals</h2>

            <div style={{ maxWidth: '700px', margin: '0 auto 3rem' }}>
                <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
                    {error && (
                        <div style={{
                            color: 'var(--error-color)',
                            marginBottom: '1.5rem',
                            padding: '0.75rem 1rem',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid var(--error-color)',
                            borderRadius: '8px',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'grid', gap: '1.25rem' }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.75rem',
                                fontWeight: '600',
                                fontSize: '0.95rem'
                            }}>
                                Goal Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                placeholder="e.g., Learn NestJS"
                                style={{ fontSize: '1rem', padding: '0.875rem 1rem' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    style={{ fontSize: '1rem', padding: '0.875rem 1rem' }}
                                >
                                    {['Career', 'Health', 'Finance', 'Skills', 'Personal'].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.75rem',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    Time Horizon
                                </label>
                                <select
                                    value={formData.horizon}
                                    onChange={(e) => setFormData({ ...formData, horizon: e.target.value })}
                                    style={{ fontSize: '1rem', padding: '0.875rem 1rem' }}
                                >
                                    {['Daily', '30 Days', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '5 Years'].map(h => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                padding: '1rem',
                                fontSize: '1.05rem',
                                fontWeight: '600'
                            }}
                        >
                            Create Goal
                        </button>
                    </div>
                </form>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {goals.map(goal => (
                    <div key={goal._id} className="card flex-between">
                        <div>
                            <h3 className="heading-lg" style={{ marginBottom: '0.25rem' }}>{goal.title}</h3>
                            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                {goal.category} • Ends: {new Date(goal.endDate).toLocaleDateString()}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <span style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                backgroundColor: goal.status === 'Active' ? 'var(--accent-color)' : 'var(--surface-color)',
                                color: goal.status === 'Active' ? '#000' : 'var(--text-secondary)'
                            }}>
                                {goal.status}
                            </span>
                            {goal.status === 'Active' && (
                                <>
                                    <button onClick={() => updateStatus(goal._id, 'Completed')} className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Done</button>
                                    <button onClick={() => updateStatus(goal._id, 'Dropped')} className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', backgroundColor: 'transparent', border: '1px solid var(--error-color)', color: 'var(--error-color)' }}>Drop</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Goals;
