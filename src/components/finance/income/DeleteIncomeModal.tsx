import React from 'react';
import Modal from '../../common/Modal';

interface DeleteIncomeModalProps {
    show: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteIncomeModal: React.FC<DeleteIncomeModalProps> = ({ show, onClose, onDelete }) => {
    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Confirm Deletion"
        >
            <div className="modal-content">
                <p>Are you sure you want to delete this income record? This action cannot be undone.</p>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-delete" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </Modal>
    );
};

export default React.memo(DeleteIncomeModal);
