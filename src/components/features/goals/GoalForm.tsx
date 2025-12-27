import React, { type FormEvent } from 'react';
import { CATEGORY_ICONS, GOAL_HORIZONS } from '../../../constants/goals';
import { calculateExpectedDate } from '../../../utils/dateUtils';
import type { GoalFormData } from '../../../types/goals';

interface GoalFormProps {
    formData: GoalFormData;
    setFormData: (data: GoalFormData) => void;
    onSubmit: (e: FormEvent) => void;
    error?: string;
}

const GoalForm: React.FC<GoalFormProps> = ({ formData, setFormData, onSubmit, error }) => {
    return (
        <div className="goal-form-container">
            <h2 className="form-title"><span>🎯</span> New Objective</h2>
            <form onSubmit={onSubmit}>
                {error && <div className="error-banner">{error}</div>}

                <div className="input-group">
                    <label>Target Objective</label>
                    <input
                        type="text"
                        className="premium-input"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="Identify your next target..."
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="input-group">
                        <label>Domain</label>
                        <select
                            className="premium-select"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {Object.keys(CATEGORY_ICONS).map(c => (
                                <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Time Horizon</label>
                        <select
                            className="premium-select"
                            value={formData.horizon}
                            onChange={(e) => setFormData({ ...formData, horizon: e.target.value })}
                        >
                            {GOAL_HORIZONS.map(h => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="deadline-preview">
                    🏁 Expected Mission Completion: <strong>{calculateExpectedDate(formData.horizon)}</strong>
                </div>

                <button type="submit" className="create-goal-btn">
                    INITIALIZE MISSION
                </button>
            </form>
        </div>
    );
};

export default GoalForm;
