import React from 'react';
import type { FoodEntry, MealType } from '../../types/calories';

interface FoodEntryListProps {
    entries: FoodEntry[];
    onDelete: (id: string) => void;
    onEdit: (entry: FoodEntry) => void;
}

const MealSection: React.FC<{
    title: string;
    entries: FoodEntry[];
    onDelete: (id: string, e: React.MouseEvent) => void;
    onEdit: (entry: FoodEntry) => void;
}> = ({ title, entries, onDelete, onEdit }) => {
    if (entries.length === 0) return null;

    const totalCalories = entries.reduce((acc, curr) => acc + curr.calories, 0);

    return (
        <div className="meal-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', padding: '0 8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '3px', height: '16px', background: 'var(--accent-color)', borderRadius: '10px' }}></div>
                    <span style={{ fontSize: '14px', color: 'white', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.3em' }}>{title}</span>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 800, background: 'rgba(255,255,255,0.08)', padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)' }}>{totalCalories} KCAL</span>
            </div>
            <div className="ff-grid-4">
                {entries.map(entry => (
                    <div key={entry.id} className="ff-food-item-card group relative" style={{ display: 'flex', flexDirection: 'column', minHeight: '120px', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <div className="cursor-pointer transition-transform group-hover:scale-[1.03]" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} onClick={() => onEdit(entry)}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{entry.name}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {entry.quantity && <span style={{ fontSize: '15px', color: 'white', fontWeight: 600 }}>Quantity: {entry.quantity} </span>}
                                <div style={{ fontSize: '13px', fontWeight: 900, color: 'var(--accent-color)', display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '3px' }}>
                                    {entry.calories}
                                    <span style={{ fontSize: '9px', padding: '4px 12px', opacity: 0.5, textTransform: 'uppercase' }}>kcal</span>
                                </div>
                            </div>
                        </div>
                        <button
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all"
                            style={{ padding: '6px', borderRadius: '10px', color: 'rgba(255,255,255,0.2)', border: 'none', background: 'rgba(255,255,255,0.05)' }}
                            onClick={(e) => onDelete(entry.id, e)}
                            title="Delete"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const FoodEntryList: React.FC<FoodEntryListProps> = ({ entries, onDelete, onEdit }) => {
    const [deleteId, setDeleteId] = React.useState<string | null>(null);

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            onDelete(deleteId);
            setDeleteId(null);
        }
    };

    const byMeal = (type: MealType) => entries.filter(e => e.mealType === type);
    const breakfast = byMeal('breakfast');
    const lunch = byMeal('lunch');
    const dinner = byMeal('dinner');
    const snacks = byMeal('snack');

    // Helper to render delete modal
    const DeleteModal = () => {
        if (!deleteId) return null;
        return (
            <div className="modal-overlay">
                <div className="delete-confirm-container">
                    <div className="delete-icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </div>
                    <h3 className="heading-md" style={{ color: 'white', marginBottom: '0.5rem' }}>Confirm Delete</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                        This food entry will be permanently removed from your log.
                    </p>
                    <div className="goal-modal-actions">
                        <button
                            className="btn-goal-cancel"
                            onClick={() => setDeleteId(null)}
                        >
                            Back
                        </button>
                        <button
                            className="btn-delete-confirm"
                            onClick={confirmDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    if (entries.length === 0) {
        return (
            <div className="empty-state-container">
                <div className="empty-state-icon">🍽️</div>
                <p className="empty-state-text">No food logged today</p>
                <p className="empty-state-subtext">Tap the + button to track your first meal</p>
            </div>
        );
    }

    const renderSection = (title: string, items: FoodEntry[]) => (
        <MealSection
            title={title}
            entries={items}
            onDelete={handleDeleteClick}
            onEdit={onEdit}
        />
    );

    return (
        <div className="mt-8">
            <DeleteModal />
            {renderSection("Breakfast", breakfast)}
            {renderSection("Lunch", lunch)}
            {renderSection("Dinner", dinner)}
            {renderSection("Snacks", snacks)}
        </div>
    );
};

export default FoodEntryList;
