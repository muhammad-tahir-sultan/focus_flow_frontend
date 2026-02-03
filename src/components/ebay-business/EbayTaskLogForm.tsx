import { useState } from 'react';
import type { CreateEbayLogDto } from '../../api/ebay';
import { toast } from 'react-hot-toast';

interface Props {
    onSubmit: (data: CreateEbayLogDto) => Promise<void>;
    isSubmitting: boolean;
}

const FOCUS_OPTIONS = [
    'FB Group Hunting (Germany)',
    'Direct Messaging (DM)',
    'Explaining Business Model',
    'Partner Interviews',
    'Listing Research'
];

export default function EbayTaskLogForm({ onSubmit, isSubmitting }: Props) {
    const [formData, setFormData] = useState<CreateEbayLogDto>({
        date: new Date().toISOString().split('T')[0],
        focusAreas: [],
        tasksCompleted: [''],
        timeSpentMinutes: 0,
        winOfTheDay: '',
        blockerOrLesson: '',
        outreachCount: 0
    });

    const handleFocusToggle = (area: string) => {
        setFormData(prev => {
            const exists = prev.focusAreas.includes(area);
            if (exists) return { ...prev, focusAreas: prev.focusAreas.filter(a => a !== area) };
            if (prev.focusAreas.length >= 2) return prev;
            return { ...prev, focusAreas: [...prev.focusAreas, area] };
        });
    };

    const handleTaskChange = (index: number, value: string) => {
        const newTasks = [...formData.tasksCompleted];
        newTasks[index] = value;
        setFormData(prev => ({ ...prev, tasksCompleted: newTasks }));
    };

    const addTask = () => {
        setFormData(prev => ({ ...prev, tasksCompleted: [...prev.tasksCompleted, ''] }));
    };

    const removeTask = (index: number) => {
        setFormData(prev => ({
            ...prev,
            tasksCompleted: prev.tasksCompleted.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            toast.success('Log saved successfully!');
            setFormData(prev => ({
                ...prev,
                focusAreas: [],
                tasksCompleted: [''],
                timeSpentMinutes: 0,
                winOfTheDay: '',
                blockerOrLesson: '',
                outreachCount: 0
            }));
        } catch (error) {
            console.error(error);
            toast.error('Failed to save log');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card-premium ebay-card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="heading-lg gradient-text" style={{ margin: 0 }}>Daily Task Log</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div className="form-group">
                    <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full"
                    />
                </div>

                <div className="form-group">
                    <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Outreach Count</label>
                    <input
                        type="number"
                        value={formData.outreachCount}
                        onChange={e => setFormData({ ...formData, outreachCount: Number(e.target.value) })}
                        min="0"
                        placeholder="0"
                        className="w-full"
                    />
                </div>
            </div>

            <div className="form-group">
                <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Today's Focus (Pick 1-2)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {FOCUS_OPTIONS.map(option => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => handleFocusToggle(option)}
                            className={`badge ${formData.focusAreas.includes(option) ? 'badge-filled' : 'badge-outline'}`}
                            style={{ cursor: 'pointer', fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                        >
                            {formData.focusAreas.includes(option) ? '✓ ' : '+ '}{option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Tasks Completed</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {formData.tasksCompleted.map((task, index) => (
                        <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={task}
                                onChange={e => handleTaskChange(index, e.target.value)}
                                placeholder={`Task ${index + 1}`}
                                className="w-full"
                            />
                            {formData.tasksCompleted.length > 1 && (
                                <button type="button" onClick={() => removeTask(index)} className="btn-icon" style={{ color: 'var(--error-color)', padding: '0 0.5rem' }}>
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addTask} className="text-sm" style={{ alignSelf: 'flex-start', color: 'var(--accent-color)', background: 'none', border: 'none', padding: 0, marginTop: '0.25rem', cursor: 'pointer', fontWeight: 600 }}>
                        + Add another task
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Time Spent (Minutes)</label>
                <input
                    type="number"
                    value={formData.timeSpentMinutes}
                    onChange={e => setFormData({ ...formData, timeSpentMinutes: Number(e.target.value) })}
                    min="0"
                    className="w-full"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div className="form-group">
                    <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Win of the Day</label>
                    <textarea
                        value={formData.winOfTheDay}
                        onChange={e => setFormData({ ...formData, winOfTheDay: e.target.value })}
                        rows={2}
                        placeholder="Even small wins count!"
                        className="w-full"
                    />
                </div>

                <div className="form-group">
                    <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Blocker / Lesson</label>
                    <textarea
                        value={formData.blockerOrLesson}
                        onChange={e => setFormData({ ...formData, blockerOrLesson: e.target.value })}
                        rows={2}
                        placeholder="What got in your way?"
                        className="w-full"
                    />
                </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full" style={{ marginTop: '1rem', padding: '1rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                {isSubmitting ? 'Saving...' : 'SAVE DAILY LOG'}
            </button>
        </form>
    );
}
