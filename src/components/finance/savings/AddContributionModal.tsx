import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';

interface AddContributionModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: (amount: string) => void;
}

const AddContributionModal: React.FC<AddContributionModalProps> = ({ show, onClose, onConfirm }) => {
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (!show) {
            setAmount('');
        }
    }, [show]);

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Add Contribution"
        >
            <div className="modal-content">
                <div className="form-group">
                    <label>Amount to Add (₹)</label>
                    <input
                        type="number"
                        className="premium-input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        autoFocus
                    />
                </div>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button
                        className="btn-submit-modal"
                        onClick={() => onConfirm(amount)}
                        disabled={!amount}
                    >
                        Add Funds
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default React.memo(AddContributionModal);
