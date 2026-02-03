import React, { useState, useEffect } from 'react';
import Modal from '../../common/Modal';

interface PaymentModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: (amount: string) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ show, onClose, onConfirm }) => {
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
            title="Record Payment"
        >
            <div className="modal-content">
                <div className="form-group">
                    <label>Payment Amount (₹)</label>
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
                        Record Payment
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default React.memo(PaymentModal);
