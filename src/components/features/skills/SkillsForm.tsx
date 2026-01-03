import type { SkillFormData } from '../../../types/skill';

interface SkillsFormProps {
    formData: SkillFormData;
    setFormData: (data: SkillFormData) => void;
    onSubmit: (e: React.FormEvent) => void;
    submitting: boolean;
}

const SkillsForm = ({ formData, setFormData, onSubmit, submitting }: SkillsFormProps) => {
    return (
        <div className="card-premium">
            <h2 className="heading-lg mb-6 flex-between">
                <span>Log New Learning</span>
                <span className="badge badge-filled">Today</span>
            </h2>

            <form onSubmit={onSubmit} className="grid-stack">
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
    );
};

export default SkillsForm;
