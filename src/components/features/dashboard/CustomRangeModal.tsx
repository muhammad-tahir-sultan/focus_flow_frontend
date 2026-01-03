import Modal from '../../common/Modal';
import type { CustomRange } from '../../../types/dashboard';

interface CustomRangeModalProps {
    show: boolean;
    onClose: () => void;
    onApply: () => void;
    customRange: CustomRange;
    setCustomRange: (range: CustomRange) => void;
}

const CustomRangeModal = ({ show, onClose, onApply, customRange, setCustomRange }: CustomRangeModalProps) => {
    return (
        <Modal
            show={show}
            title="📅 SELECT TARGET RANGE"
            onClose={onClose}
            footer={
                <button
                    className="btn-confirm-abort"
                    onClick={onApply}
                >
                    APPLY RANGE
                </button>
            }
        >
            <div className="custom-range-inputs">
                <div className="input-group">
                    <label>START DATE</label>
                    <input
                        type="date"
                        className="premium-input"
                        value={customRange.start}
                        onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                    />
                </div>
                <div className="input-group">
                    <label>END DATE</label>
                    <input
                        type="date"
                        className="premium-input"
                        value={customRange.end}
                        onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default CustomRangeModal;
