import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';

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
            const res = await axios.get<Goal[]>('http://localhost:3000/goals');
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
            await axios.post('http://localhost:3000/goals', formData);
            setFormData({ title: '', category: 'Career', horizon: '30 Days' });
            fetchGoals();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create goal');
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await axios.patch(`http://localhost:3000/goals/${id}/status`, { status });
            fetchGoals();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="heading-xl mb-8">Manage Goals</h2>

            <form onSubmit={handleSubmit} className="card mb-8">
                {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}
                <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Goal Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="e.g., Learn NestJS"
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                {['Career', 'Health', 'Finance', 'Skills', 'Personal'].map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Time Horizon</label>
                            <select
                                value={formData.horizon}
                                onChange={(e) => setFormData({ ...formData, horizon: e.target.value })}
                            >
                                {['Daily', '30 Days', '3 Months', '6 Months', '1 Year', '2 Years', '3 Years', '5 Years'].map(h => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Goal</button>
                </div>
            </form>

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
