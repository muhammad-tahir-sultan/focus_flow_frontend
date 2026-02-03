import React from 'react';
import Modal from '../../common/Modal';

interface DeleteSavingModalProps {
    show: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteSavingModal: React.FC<DeleteSavingModalProps> = ({ show, onClose, onDelete }) => {
    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Confirm Deletion"
        >
            <div className="modal-content">
                <p>Are you sure you want to delete this saving goal? This action cannot be undone.</p>
                <div className="modal-actions">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button className="btn-delete" onClick={onDelete}>Delete</button>
                </div>
            </div>
        </Modal>
    );
};

export default React.memo(DeleteSavingModal);
