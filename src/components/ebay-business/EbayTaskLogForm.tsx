import { useState } from 'react';
import type { CreateEbayLogDto } from '../../api/ebay';
import { toast } from 'react-hot-toast';

interface Props {
    onSubmit: (data: CreateEbayLogDto) => Promise<void>;
    isSubmitting: boolean;
}

const FOCUS_OPTIONS = [
    'Partner outreach',
    'Product research',
    'Listing optimization',
    'SOP / system building',
    'Review & analytics'
];

export default function EbayTaskLogForm({ onSubmit, isSubmitting }: Props) {
    const [formData, setFormData] = useState<CreateEbayLogDto>({
        date: new Date().toISOString().split('T')[0],
        focusAreas: [],
        tasksCompleted: [''],
        timeSpentMinutes: 0,
        winOfTheDay: '',
        blockerOrLesson: ''
    });

    const handleFocusToggle = (area: string) => {
        setFormData(prev => {
            const exists = prev.focusAreas.includes(area);
            if (exists) return { ...prev, focusAreas: prev.focusAreas.filter(a => a !== area) };
            if (prev.focusAreas.length >= 2) return prev; // Limit to 2 as per user request
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
        if (formData.focusAreas.length === 0 && !window.confirm("No focus area selected. Continue?")) return;

        try {
            await onSubmit(formData);
            toast.success('Log saved successfully!');
            setFormData(prev => ({
                ...prev,
                focusAreas: [],
                tasksCompleted: [''],
                timeSpentMinutes: 0,
                winOfTheDay: '',
                blockerOrLesson: ''
            }));
        } catch (error) {
            console.error(error);
            toast.error('Failed to save log');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="heading-lg gradient-text" style={{ margin: 0 }}>Daily Task Log</h2>

            <div className="form-group">
                <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Date</label>
                <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    required
                />
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
                            style={{ cursor: 'pointer' }}
                        >
                            {formData.focusAreas.includes(option) ? '✓ ' : '+ '}{option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Tasks Completed</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {formData.tasksCompleted.map((task, index) => (
                        <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={task}
                                onChange={e => handleTaskChange(index, e.target.value)}
                                placeholder={`Task ${index + 1}`}
                            />
                            {formData.tasksCompleted.length > 1 && (
                                <button type="button" onClick={() => removeTask(index)} className="btn-icon" style={{ color: 'var(--error-color)' }}>
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addTask} className="text-sm" style={{ alignSelf: 'flex-start', color: 'var(--accent-color)', background: 'none', border: 'none', padding: 0, marginTop: '0.5rem' }}>
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
                />
            </div>

            <div className="form-group">
                <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Win of the Day</label>
                <textarea
                    value={formData.winOfTheDay}
                    onChange={e => setFormData({ ...formData, winOfTheDay: e.target.value })}
                    rows={2}
                    placeholder="Even small wins count!"
                />
            </div>

            <div className="form-group">
                <label className="text-sm d-block mb-2" style={{ color: 'var(--text-secondary)' }}>Blocker / Lesson</label>
                <textarea
                    value={formData.blockerOrLesson}
                    onChange={e => setFormData({ ...formData, blockerOrLesson: e.target.value })}
                    rows={2}
                    placeholder="What got in your way?"
                />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
                {isSubmitting ? 'Saving...' : 'Save Log'}
            </button>
        </form>
    );
}
