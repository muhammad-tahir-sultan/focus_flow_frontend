import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../main';
import Loader from '../components/Loader';

const DailyLog = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        description: '',
        timeSpent: '',
        reflection: '',
        date: new Date().toISOString().split('T')[0],
    });
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const nonNegotiables = [
        'Career: 10 Client Outreach + 1 LinkedIn Post',
        'Physique: Workout (45 mins) + Reduce Tea (2x)',
        'Degree: Study Degree Subjects (1 hour)',
        'Communication: Practice English (30 mins)',
        'Skills: Learn/Code New Tech (1 hour)',
        'Mindset: Control List Review + Daily Reflection'
    ];

    useEffect(() => {
        if (id) {
            const fetchLog = async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get(`${backendUrl}/daily-logs/${id}`);
                    const log = res.data;

                    // Parse description for checked items
                    const newCheckedItems: Record<string, boolean> = {};
                    nonNegotiables.forEach(item => {
                        if (log.description.includes(`[x] ${item}`)) {
                            newCheckedItems[item] = true;
                        }
                    });

                    // Clean up description (remove the non-negotiables section for editing)
                    const descriptionParts = log.description.split('\n\n**Completed Non-Negotiables:**');

                    setFormData({
                        description: descriptionParts[0],
                        timeSpent: log.timeSpent.toString(),
                        reflection: log.reflection,
                        date: new Date(log.date).toISOString().split('T')[0],
                    });
                    setCheckedItems(newCheckedItems);
                } catch (err) {
                    console.error('Failed to fetch log', err);
                    setError('Failed to load log data');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchLog();
        }
    }, [id]);

    const handleCheckChange = (item: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const completedItems = Object.entries(checkedItems)
                .filter(([_, isChecked]) => isChecked)
                .map(([item]) => `- [x] ${item}`)
                .join('\n');

            const finalDescription = `${formData.description}\n\n**Completed Non-Negotiables:**\n${completedItems}`;

            if (id) {
                await axios.patch(`${backendUrl}/daily-logs/${id}`, {
                    ...formData,
                    description: finalDescription,
                    timeSpent: Number(formData.timeSpent),
                });
            } else {
                await axios.post(`${backendUrl}/daily-logs`, {
                    ...formData,
                    description: finalDescription,
                    timeSpent: Number(formData.timeSpent),
                });
            }
            navigate('/history');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit log');
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div style={{ maxWidth: '700px', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 className="heading-xl" style={{ marginBottom: '0.5rem' }}>
                        {id ? 'Edit Daily Execution' : 'Log Daily Execution'}
                    </h2>
                    <p className="text-sm" style={{ fontSize: '1rem' }}>
                        "Consistency is the key to success."
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem' }}>
                    {error && (
                        <div style={{
                            color: 'var(--error-color)',
                            marginBottom: '1.5rem',
                            padding: '0.75rem 1rem',
                            border: '1px solid var(--error-color)',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            fontSize: '0.9rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className="mb-8" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '600', color: 'var(--accent-color)' }}>✅ Daily Non-Negotiables Checklist</label>
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {nonNegotiables.map((item) => (
                                <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={!!checkedItems[item]}
                                        onChange={() => handleCheckChange(item)}
                                        style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--accent-color)' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', color: checkedItems[item] ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                        {item}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>What else did you execute today?</label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            placeholder="Describe your key actions..."
                        />
                    </div>

                    <div className="mb-4">
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Time Spent (Hours)</label>
                        <input
                            type="number"
                            step="0.5"
                            min="0"
                            value={formData.timeSpent}
                            onChange={(e) => setFormData({ ...formData, timeSpent: e.target.value })}
                            required
                            placeholder="e.g., 2.5"
                        />
                    </div>

                    <div className="mb-8">
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>One Learning / Reflection</label>
                        <textarea
                            rows={2}
                            value={formData.reflection}
                            onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
                            required
                            placeholder="What did you learn? What can be improved?"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: '600' }}>
                        {id ? 'Update Log' : 'Submit Log'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DailyLog;
