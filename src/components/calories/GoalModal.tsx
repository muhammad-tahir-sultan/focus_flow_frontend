import React from 'react';

interface GoalModalProps {
    isOpen: boolean;
    tempGoal: string;
    setTempGoal: (val: string) => void;
    onClose: () => void;
    onConfirm: (e: React.FormEvent) => void;
}

const GoalModal = React.memo(({ isOpen, tempGoal, setTempGoal, onClose, onConfirm }: GoalModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="goal-modal-container" style={{ maxWidth: '480px' }}>
                <div className="goal-modal-glow"></div>

                <button
                    className="goal-modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h3 className="heading-xl" style={{ marginBottom: '0.5rem', color: 'white' }}>Daily Goal</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>Update your daily calorie target</p>

                <form onSubmit={onConfirm}>
                    <div className="massive-input-container">
                        <input
                            id="goal-input"
                            type="number"
                            className="massive-input"
                            value={tempGoal}
                            onChange={(e) => setTempGoal(e.target.value)}
                            autoFocus
                            placeholder="2200"
                        />
                        <div className="input-unit">KCAL</div>
                    </div>

                    <div className="goal-modal-actions">
                        <button
                            type="button"
                            className="btn-goal-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-goal-save"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default GoalModal;
