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
        mood: 'neutral' as 'high' | 'neutral' | 'good' | 'low',
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
                        mood: log.mood || 'neutral',
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
        <div className="daily-log-page">
            <div className="container" style={{ maxWidth: '800px' }}>
                <header className="page-header center-text mb-8">
                    <h2 className="heading-xl gradient-text">
                        {id ? 'Edit Daily Execution' : 'Log Daily Execution'}
                    </h2>
                    <p className="text-secondary quote-text">
                        "Consistency is the key to success."
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="card-premium animate-fade-in">
                    {error && (
                        <div className="error-banner">
                            {error}
                        </div>
                    )}

                    <div className="non-negotiables-section mb-8">
                        <label className="section-label accent-color">
                            ✅ Daily Non-Negotiables Checklist
                        </label>
                        <div className="checklist-grid">
                            {nonNegotiables.map((item) => (
                                <label key={item} className={`checklist-item ${checkedItems[item] ? 'checked' : ''}`}>
                                    <div className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            checked={!!checkedItems[item]}
                                            onChange={() => handleCheckChange(item)}
                                        />
                                        <div className="custom-checkbox-display"></div>
                                    </div>
                                    <span className="checklist-text">
                                        {item}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group mb-6">
                        <label className="input-label">Date</label>
                        <input
                            type="date"
                            className="input-field"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group mb-6">
                        <label className="input-label">What else did you execute today?</label>
                        <textarea
                            rows={4}
                            className="input-field textarea-field"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            placeholder="Describe your key actions..."
                        />
                    </div>

                    <div className="form-group mb-6">
                        <label className="input-label">Time Spent (Hours)</label>
                        <input
                            type="number"
                            step="0.5"
                            min="0"
                            className="input-field"
                            value={formData.timeSpent}
                            onChange={(e) => setFormData({ ...formData, timeSpent: e.target.value })}
                            required
                            placeholder="e.g., 2.5"
                        />
                    </div>

                    <div className="form-group mb-6">
                        <label className="input-label">Mood / Focus Quality</label>
                        <div className="mood-grid">
                            {[
                                { val: 'high', label: '⚡ High', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
                                { val: 'neutral', label: '💡 Neutral', color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)' },
                                { val: 'good', label: '✓ Good', color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
                                { val: 'low', label: '📉 Low', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' }
                            ].map(m => (
                                <button
                                    key={m.val}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, mood: m.val as any })}
                                    className={`mood-btn ${formData.mood === m.val ? 'active' : ''}`}
                                    style={{
                                        '--mood-color': m.color,
                                        '--mood-bg': m.bg
                                    } as any}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group mb-8">
                        <label className="input-label">One Learning / Reflection</label>
                        <textarea
                            rows={3}
                            className="input-field textarea-field"
                            value={formData.reflection}
                            onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
                            required
                            placeholder="What did you learn? What can be improved?"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                        {id ? 'Update Log' : 'Submit Log'}
                    </button>
                </form>
            </div>

            <style>{`
                .daily-log-page {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem 1rem;
                }

                .center-text { text-align: center; }
                .text-secondary { color: var(--text-secondary); }
                .gradient-text {
                    background: linear-gradient(to right, #fff, #94a3b8);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .quote-text {
                    font-style: italic;
                    opacity: 0.8;
                    margin-top: 0.5rem;
                }

                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .error-banner {
                    color: var(--error-color);
                    margin-bottom: 1.5rem;
                    padding: 0.75rem 1rem;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 8px;
                    background-color: rgba(239, 68, 68, 0.1);
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .non-negotiables-section {
                    background-color: rgba(255, 255, 255, 0.02);
                    padding: 1.5rem;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .section-label {
                    display: block;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    font-size: 0.95rem;
                    letter-spacing: 0.02em;
                }
                .accent-color { color: var(--accent-color); }

                .checklist-grid {
                    display: grid;
                    gap: 0.75rem;
                }

                .checklist-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    cursor: pointer;
                    padding: 0.75rem;
                    border-radius: 8px;
                    background: rgba(255, 255, 255, 0.01);
                    border: 1px solid transparent;
                    transition: all 0.2s;
                }

                .checklist-item:hover {
                    background: rgba(255, 255, 255, 0.04);
                }

                .checklist-item.checked {
                    background: rgba(59, 130, 246, 0.08); /* slight blue tint */
                    border-color: rgba(59, 130, 246, 0.2);
                }

                .checkbox-wrapper {
                    position: relative;
                    width: 1.25rem;
                    height: 1.25rem;
                    flex-shrink: 0;
                    margin-top: 0.1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .checkbox-wrapper input {
                    opacity: 0;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    z-index: 2;
                }

                .custom-checkbox-display {
                    width: 100%;
                    height: 100%;
                    border: 2px solid var(--text-secondary);
                    border-radius: 4px;
                    transition: all 0.2s;
                }

                .checklist-item.checked .custom-checkbox-display {
                    background-color: var(--accent-color);
                    border-color: var(--accent-color);
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='18px' height='18px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E");
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .checklist-text {
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                    transition: color 0.2s;
                    line-height: 1.5;
                }

                .checklist-item.checked .checklist-text {
                    color: var(--text-primary);
                    text-decoration: line-through;
                    opacity: 0.7;
                }

                .form-group { position: relative; }
                
                .input-label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: var(--text-primary);
                    font-size: 0.95rem;
                }

                .input-field {
                    width: 100%;
                    background-color: rgba(0, 0, 0, 0.2);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    padding: 0.875rem 1rem;
                    border-radius: 8px;
                    transition: all 0.2s;
                    font-size: 0.95rem;
                }

                .input-field:focus {
                    border-color: var(--accent-color);
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
                    outline: none;
                }

                .textarea-field {
                    resize: vertical;
                    min-height: 100px;
                }

                .mood-grid {
                    display: flex;
                    gap: 0.75rem;
                }

                .mood-btn {
                    flex: 1;
                    padding: 0.75rem;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    background: transparent;
                    color: var(--text-secondary);
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.4rem;
                }

                .mood-btn:hover {
                    background: rgba(255, 255, 255, 0.03);
                    transform: translateY(-2px);
                }

                .mood-btn.active {
                    border-color: var(--mood-color);
                    background-color: var(--mood-bg);
                    color: var(--mood-color);
                    box-shadow: 0 0 10px -2px var(--mood-bg);
                }

                .submit-btn {
                    width: 100%;
                    padding: 1rem;
                    font-size: 1.1rem;
                    margin-top: 1rem;
                    background: var(--accent-color);
                    border: none;
                }

                .submit-btn:hover {
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
                }

                /* Mobile Responsive */
                @media (max-width: 640px) {
                    .daily-log-page {
                        padding: 1rem;
                    }

                    .heading-xl {
                        font-size: 1.75rem;
                    }

                    .card-premium {
                        padding: 1.5rem;
                    }

                    .checklist-grid {
                        gap: 0.5rem;
                    }

                    .mood-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 0.75rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default DailyLog;
