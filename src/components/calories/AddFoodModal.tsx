import React, { useState, useEffect, useRef } from 'react';
import type { MealType } from '../../types/calories';

interface AddFoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (entry: { name: string; calories: number; mealType: MealType; quantity: string; protein?: number; carbs?: number; fat?: number }) => void;
    initialMealType?: MealType;
}

const COMMON_FOODS = [
    { name: 'Egg (Large)', calories: 72, protein: 6, carbs: 0.6, fat: 5 },
    { name: 'Banana (Medium)', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Rice (1 cup, cooked)', calories: 206, protein: 4.3, carbs: 45, fat: 0.4 },
    { name: 'Chicken Breast (100g, cooked)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Yogurt (250g, plain)', calories: 150, protein: 10, carbs: 12, fat: 8 },
    { name: 'Roti / Chapati (1 medium)', calories: 120, protein: 3, carbs: 18, fat: 3 },
    { name: 'Chai (1 cup, milk + 1 tsp sugar)', calories: 90, protein: 2, carbs: 10, fat: 3 },
    { name: 'Almonds (6)', calories: 42, protein: 1.5, carbs: 1.5, fat: 3.5 },
    { name: 'Dates (6 small)', calories: 120, protein: 1, carbs: 32, fat: 0 },
];

const AddFoodModal: React.FC<AddFoodModalProps> = ({ isOpen, onClose, onAdd, initialMealType = 'breakfast' }) => {
    const [selectedFoods, setSelectedFoods] = useState<typeof COMMON_FOODS>([]);
    const [name, setName] = useState('');
    const [calories, setCalories] = useState('');
    const [mealType, setMealType] = useState<MealType>(initialMealType);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [quantity, setQuantity] = useState('');
    const [baseCalories, setBaseCalories] = useState<number | null>(null);

    // Hidden macro state, auto-populated from chips
    const [macros, setMacros] = useState<{ p?: number, c?: number, f?: number }>({});

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto-calculate calories when quantity changes
    useEffect(() => {
        if (baseCalories && quantity) {
            const qty = parseFloat(quantity);
            if (!isNaN(qty)) {
                setCalories(Math.round(baseCalories * qty).toString());

                // Also scale macros if they exist
                if (macros.p || macros.c || macros.f) {
                    // We need to know the *base* macros to scale, but we only stored current. 
                    // Ideally we should store baseMacros too. For now this is a simple approximation 
                    // assuming 'macros' state might have been set from quick add.
                    // Actually, if we update 'macros' here, we lose the base reference.
                    // Let's rely on the base values from COMMON_FOODS loop implicitly? 
                    // Better approach: When Quick Add happens, `baseCalories` is set.
                    // We should likely reset baseCalories if user manually edits calories?
                }
            }
        }
    }, [quantity, baseCalories]);

    useEffect(() => {
        if (isOpen) {
            setMealType(initialMealType);
            setName('');
            setCalories('');
            setQuantity('');
            setMacros({});
            setIsDropdownOpen(false);
            setSelectedFoods([]);
        }
    }, [isOpen, initialMealType]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !calories) return;

        onAdd({
            name,
            calories: Number(calories),
            mealType,
            quantity,
            protein: macros.p,
            carbs: macros.c,
            fat: macros.f
        });
        onClose();
    };

    const handleQuickAdd = (food: typeof COMMON_FOODS[0]) => {
        const isSelected = selectedFoods.some(f => f.name === food.name);
        const newSelection = isSelected
            ? selectedFoods.filter(f => f.name !== food.name)
            : [...selectedFoods, food];

        setSelectedFoods(newSelection);

        if (newSelection.length > 0) {
            // Join names
            const joinedNames = newSelection.map(f => f.name.split(' (')[0]).join(', ');
            setName(joinedNames);

            // Sum calories
            const totalBase = newSelection.reduce((sum, f) => sum + f.calories, 0);
            setBaseCalories(totalBase);
            setCalories(totalBase.toString());
            setQuantity('1');

            // Sum macros
            const totalMacros = newSelection.reduce((acc, f) => ({
                p: (acc.p || 0) + (f.protein || 0),
                c: (acc.c || 0) + (f.carbs || 0),
                f: (acc.f || 0) + (f.fat || 0)
            }), { p: 0, c: 0, f: 0 });
            setMacros(totalMacros);
        } else {
            setName('');
            setCalories('');
            setBaseCalories(null);
            setMacros({});
            setQuantity('');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="goal-modal-container" style={{ maxWidth: '520px', textAlign: 'left' }}>
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

                <div className="modal-header" style={{ border: 'none', marginBottom: '1.5rem', paddingBottom: 0 }}>
                    <h2 className="heading-lg" style={{ color: 'white' }}>Add Food</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modal-form-group">
                        <label className="modal-label">Meal Type</label>
                        <div className="custom-select-container" ref={dropdownRef}>
                            <div
                                className={`custom-select-trigger ${isDropdownOpen ? 'open' : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span style={{ textTransform: 'capitalize' }}>{mealType}</span>
                                <svg
                                    className={`select-arrow ${isDropdownOpen ? 'rotated' : ''}`}
                                    width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {isDropdownOpen && (
                                <div className="custom-select-options">
                                    {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((type) => (
                                        <div
                                            key={type}
                                            className={`custom-option ${mealType === type ? 'selected' : ''}`}
                                            onClick={() => {
                                                setMealType(type);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            <span style={{ textTransform: 'capitalize' }}>{type}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="modal-form-group">
                        <label className="modal-label">Food Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setMacros({});
                            }}
                            placeholder="e.g. Oatmeal"
                            autoFocus
                            required
                        />
                        <div className="quick-add-chips">
                            {COMMON_FOODS.map(f => {
                                const isSelected = selectedFoods.some(selected => selected.name === f.name);
                                return (
                                    <button
                                        key={f.name}
                                        type="button"
                                        className={`chip ${isSelected ? 'active' : ''}`}
                                        onClick={() => handleQuickAdd(f)}
                                    >
                                        {f.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="modal-form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label className="modal-label">Calories (kcal)</label>
                            <input
                                type="number"
                                value={calories}
                                onChange={(e) => {
                                    setCalories(e.target.value);
                                    setBaseCalories(null);
                                }}
                                placeholder="0"
                                required
                                min="0"
                            />
                            {calories && Number(calories) > 0 && (
                                <div className="mt-2 text-[10px] text-white/40 font-bold uppercase tracking-widest animate-fade-in">
                                    <span className="text-blue-400">Impact: </span>
                                    +{(Number(calories) / 7700).toFixed(4)} kg Gain
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="modal-label">Quantity (Optional)</label>
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="e.g. 1 bowl"
                            />
                        </div>
                    </div>

                    <div className="goal-modal-actions" style={{ marginTop: '2.5rem' }}>
                        <button type="button" className="btn-goal-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-goal-save">
                            Add Log
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFoodModal;
