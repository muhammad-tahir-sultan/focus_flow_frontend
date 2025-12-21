import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../main';

const DailyLog = () => {
    const [formData, setFormData] = useState({
        description: '',
        timeSpent: '',
        reflection: '',
    });
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const nonNegotiables = [
        'Career: 10 Client Outreach + 1 LinkedIn Post',
        'Physique: Workout (45 mins) + Reduce Tea (2x)',
        'Degree: Study Degree Subjects (1 hour)',
        'Communication: Practice English (30 mins)',
        'Skills: Learn/Code New Tech (1 hour)',
        'Mindset: Control List Review + Daily Reflection'
    ];

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

            await axios.post(`${backendUrl}/daily-logs`, {
                ...formData,
                description: finalDescription,
                timeSpent: Number(formData.timeSpent),
            });
            navigate('/history');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit log');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="heading-xl" style={{ textAlign: 'center' }}>Log Daily Execution</h2>
            <p className="text-sm" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                "Consistency is the key to success."
            </p>

            <form onSubmit={handleSubmit} className="card">
                {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem', padding: '0.5rem', border: '1px solid var(--error-color)', borderRadius: '4px' }}>{error}</div>}

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

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Submit Log
                </button>
                <p className="text-sm" style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Note: You can only submit one log per day. It cannot be edited.
                </p>
            </form>
        </div>
    );
};

export default DailyLog;
