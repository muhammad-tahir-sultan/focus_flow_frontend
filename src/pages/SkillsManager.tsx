import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface SkillEntry {
    id: string;
    date: string;
    skillName: string;
    duration: string;
    category: 'Technical' | 'Soft Skill' | 'Language' | 'Other';
    notes: string;
    masteryLevel: number; // 1-10
}

import api from '../api/axios';

const SkillsManager = () => {
    const [entries, setEntries] = useState<SkillEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [dateFilter, setDateFilter] = useState('weekly');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    const [formData, setFormData] = useState({
        skillName: '',
        duration: '',
        category: 'Technical',
        notes: '',
        masteryLevel: 5,
        date: new Date().toISOString().split('T')[0]
    });

    const getStartDateForFilter = (filter: string) => {
        const now = new Date();
        const d = new Date(now);
        switch (filter) {
            case 'weekly': d.setDate(now.getDate() - 7); break;
            case '2weeks': d.setDate(now.getDate() - 14); break;
            case '1month': d.setMonth(now.getMonth() - 1); break;
            case '3months': d.setMonth(now.getMonth() - 3); break;
            case '6months': d.setMonth(now.getMonth() - 6); break;
            case '1year': d.setFullYear(now.getFullYear() - 1); break;
            case 'all': return null;
            default: return null;
        }
        return d.toISOString().split('T')[0];
    };

    const fetchSkills = async () => {
        setLoading(true);
        try {
            let params: any = {};
            if (dateFilter === 'custom' && customStartDate && customEndDate) {
                params.startDate = customStartDate;
                params.endDate = customEndDate;
            } else if (dateFilter !== 'all' && dateFilter !== 'custom') {
                const startDate = getStartDateForFilter(dateFilter);
                if (startDate) params.startDate = startDate;
            }

            const { data } = await api.get('/skills', { params });
            setEntries(data);
        } catch (error) {
            console.error('Failed to fetch skills', error);
            toast.error('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, [dateFilter, customStartDate, customEndDate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const { data } = await api.post('/skills', formData);
            setEntries([data, ...entries]);
            toast.success('Skill log added successfully!');
            setFormData({
                skillName: '',
                duration: '',
                category: 'Technical',
                notes: '',
                masteryLevel: 5,
                date: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            console.error('Error adding skill:', error);
            toast.error('Failed to save skill log');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="master-roadmap-container">
            {/* Hero Section */}
            <div className="master-roadmap-hero">
                <div className="hero-glow"></div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span>✨</span>
                        <span>Daily Growth</span>
                    </div>
                    <h1 className="hero-title">
                        Skill <span className="gradient-text">Acquisition</span>
                    </h1>
                    <p className="hero-subtitle">
                        "I am learning daily." Track your skills, log your progress, and manage your evolution.
                    </p>

                    <div className="hero-progress">
                        <div className="progress-stats">
                            <span className="progress-label">Entries this Month</span>
                            <span className="progress-value">{entries.length} Logs</span>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${Math.min(entries.length * 5, 100)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid-responsive-2">
                {/* Form Section */}
                <div>
                    <div className="card-premium">
                        <h2 className="heading-lg mb-6 flex-between">
                            <span>Log New Learning</span>
                            <span className="badge badge-filled">Today</span>
                        </h2>

                        <form onSubmit={handleSubmit} className="grid-stack">
                            <div className="form-group mb-4">
                                <label className="text-sm mb-2 d-block">Skill / Topic</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Advanced TypeScript Generics"
                                    value={formData.skillName}
                                    onChange={e => setFormData({ ...formData, skillName: e.target.value })}
                                />
                            </div>

                            <div className="form-row-2 mb-4">
                                <div>
                                    <label className="text-sm mb-2 d-block">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm mb-2 d-block">Duration</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 1h 30m"
                                        value={formData.duration}
                                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-row-2 mb-4">
                                <div>
                                    <label className="text-sm mb-2 d-block">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Technical">Technical</option>
                                        <option value="Soft Skill">Soft Skill</option>
                                        <option value="Language">Language</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm mb-2 d-block">Mastery (1-10)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.masteryLevel}
                                        onChange={e => setFormData({ ...formData, masteryLevel: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-6">
                                <label className="text-sm mb-2 d-block">Key Learnings & Notes</label>
                                <textarea
                                    rows={4}
                                    placeholder="What did you learn? What were the key takeaways?"
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={submitting}
                            >
                                <span>{submitting ? 'Saving...' : 'Add to Journal'}</span>
                            </button>
                        </form>
                    </div>
                </div>

                {/* History/List Section */}
                <div>
                    <h2 className="heading-lg mb-6">Recent Logs</h2>

                    {/* Filter Controls */}
                    <div className="card mb-6" style={{ padding: '1rem' }}>
                        <div className="flex-between mb-4" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                            <button onClick={() => setDateFilter('weekly')} className={`skill-badge ${dateFilter === 'weekly' ? 'badge-filled' : 'badge-outline'}`} style={{ cursor: 'pointer' }}>Weekly</button>
                            <button onClick={() => setDateFilter('2weeks')} className={`skill-badge ${dateFilter === '2weeks' ? 'badge-filled' : 'badge-outline'}`} style={{ cursor: 'pointer' }}>2 Weeks</button>
                            <button onClick={() => setDateFilter('1month')} className={`skill-badge ${dateFilter === '1month' ? 'badge-filled' : 'badge-outline'}`} style={{ cursor: 'pointer' }}>1 Month</button>
                            <button onClick={() => setDateFilter('3months')} className={`skill-badge ${dateFilter === '3months' ? 'badge-filled' : 'badge-outline'}`} style={{ cursor: 'pointer' }}>3 Months</button>
                            <button onClick={() => setDateFilter('6months')} className={`skill-badge ${dateFilter === '6months' ? 'badge-filled' : 'badge-outline'}`} style={{ cursor: 'pointer' }}>6 Months</button>
                            <button onClick={() => setDateFilter('1year')} className={`skill-badge ${dateFilter === '1year' ? 'badge-filled' : 'badge-outline'}`} style={{ cursor: 'pointer' }}>1 Year</button>
                            <button onClick={() => setDateFilter('all')} className={`skill-badge ${dateFilter === 'all' ? 'badge-filled' : 'badge-outline'}`} style={{ cursor: 'pointer' }}>All Time</button>
                            <button onClick={() => setDateFilter('custom')} className={`skill-badge ${dateFilter === 'custom' ? 'badge-filled' : 'badge-outline'}`} style={{ cursor: 'pointer' }}>Custom</button>
                        </div>

                        {dateFilter === 'custom' && (
                            <div className="form-row-2">
                                <div>
                                    <label className="text-sm mb-1 d-block">Start Date</label>
                                    <input type="date" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} />
                                </div>
                                <div>
                                    <label className="text-sm mb-1 d-block">End Date</label>
                                    <input type="date" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} />
                                </div>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="loader-container">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        <div className="grid-stack">
                            {entries.length === 0 ? (
                                <p className="text-sm text-secondary">No logs found yet. Start learning!</p>
                            ) : (
                                entries.map((entry) => (
                                    <div key={entry.id || (entry as any)._id} className="card hover-link w-full mb-4" style={{ cursor: 'default', textDecoration: 'none' }}>
                                        <div className="flex-between mb-4">
                                            <h3 className="heading-lg" style={{ fontSize: '1.1rem', margin: 0 }}>{entry.skillName}</h3>
                                            <span className="text-sm">{new Date(entry.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="skills-badges mb-4">
                                            <span className="skill-badge">{entry.category}</span>
                                            <span className="skill-badge">{entry.duration}</span>
                                            <span className="skill-badge">Lvl {entry.masteryLevel}</span>
                                        </div>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            {entry.notes}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillsManager;
