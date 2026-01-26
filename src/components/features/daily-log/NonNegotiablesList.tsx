import { useState } from 'react';

interface NonNegotiablesListProps {
    items: string[];
    checkedItems: Record<string, boolean>;
    onChange: (item: string) => void;
    onAdd: (item: string) => void;
    onDelete: (item: string) => void;
}

const NonNegotiablesList = ({ items, checkedItems, onChange, onAdd, onDelete }: NonNegotiablesListProps) => {
    const [newItem, setNewItem] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleAddClick = () => {
        if (!isAdding) {
            setIsAdding(true);
        } else {
            submitNewItem();
        }
    };

    const submitNewItem = () => {
        if (newItem.trim()) {
            onAdd(newItem.trim());
            setNewItem('');
            setIsAdding(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submitNewItem();
        }
    };

    return (
        <div className="non-negotiables-section mb-8">
            <div className="checklist-header">
                <label className="section-label accent-color" style={{ margin: 0 }}>
                    ✅ Daily Non-Negotiables Checklist
                </label>
                <button
                    type="button"
                    onClick={handleAddClick}
                    className="add-habit-btn"
                >
                    {isAdding ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            Save
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            Add New
                        </>
                    )}
                </button>
            </div>

            {isAdding && (
                <div className="add-habit-input-container">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type new habit & press Enter..."
                        className="habit-input"
                        autoFocus
                    />
                    <button type="button" onClick={submitNewItem} className="habit-save-btn">
                        Add
                    </button>
                    <button type="button" onClick={() => setIsAdding(false)} className="habit-cancel-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            )}

            <div className="checklist-grid">
                {items.length === 0 && (
                    <div className="text-gray-500 text-sm italic py-2 text-center border border-dashed border-gray-800 rounded-lg">
                        Your list is empty. Start adding your non-negotiables!
                    </div>
                )}
                {items.map((item) => (
                    <div key={item} className="checklist-row">
                        <label className={`checklist-item flex-1 ${checkedItems[item] ? 'checked' : ''}`}>
                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    checked={!!checkedItems[item]}
                                    onChange={() => onChange(item)}
                                />
                                <div className="custom-checkbox-display"></div>
                            </div>
                            <span className="checklist-text">
                                {item}
                            </span>
                        </label>
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onDelete(item); }}
                            className="delete-habit-btn"
                            title="Remove from list"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NonNegotiablesList;
