import type { DailyLogFormData } from '../../../types/dailyLog';
import { MOOD_OPTIONS } from '../../../data/dailyLogData';
import NonNegotiablesList from './NonNegotiablesList';

interface DailyLogFormProps {
    formData: DailyLogFormData;
    setFormData: (data: DailyLogFormData) => void;
    checkedItems: Record<string, boolean>;
    handleCheckChange: (item: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    error: string;
    isEditing: boolean;
}

const DailyLogForm = ({
    formData,
    setFormData,
    checkedItems,
    handleCheckChange,
    handleSubmit,
    error,
    isEditing
}: DailyLogFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="card-premium animate-fade-in">
            {error && (
                <div className="error-banner">
                    {error}
                </div>
            )}

            <NonNegotiablesList
                checkedItems={checkedItems}
                onChange={handleCheckChange}
            />

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
                    {MOOD_OPTIONS.map(m => (
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
                {isEditing ? 'Update Log' : 'Submit Log'}
            </button>
        </form>
    );
};

export default DailyLogForm;
