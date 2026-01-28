import React, { useState } from 'react';
import CalorieDashboard from '../components/calories/CalorieDashboard';
import FoodEntryList from '../components/calories/FoodEntryList';
import AddFoodModal from '../components/calories/AddFoodModal';
import CalorieAnalytics from '../components/calories/CalorieAnalytics';
import GoalModal from '../components/calories/GoalModal';
import MealGrid from '../components/calories/MealGrid';
import { useCalorieTracker } from '../hooks/useCalorieTracker';
import type { FoodEntry } from '../types/calories';
import '../styles/calories.css';

const CalorieTracker: React.FC = () => {
    const {
        date,
        entries,
        settings,
        loading,
        dailyEntries,
        consumed,
        streak,
        isGoalModalOpen,
        tempGoal,
        setTempGoal,
        setIsGoalModalOpen,
        handleAddEntry,
        handleDeleteEntry,
        handleUpdateGoal,
        confirmUpdateGoal,
        handlePrevDay,
        handleNextDay
    } = useCalorieTracker();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'tracker' | 'stats'>('tracker');

    const handleEditEntry = (entry: FoodEntry) => {
        console.log("Edit requested for", entry);
    };

    if (loading) return <div className="p-8 text-center">Loading tracker...</div>;

    const isToday = date === new Date().toISOString().split('T')[0];

    return (
        <div className="premium-container">
            <div className="container py-8 pb-24 max-w-4xl mx-auto px-4">
                <header className="mb-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="heading-xl mb-1">Nutrition</h1>
                        </div>
                        <div className="date-nav-container">
                            <button onClick={handlePrevDay} className="date-nav-btn" aria-label="Previous Day">
                                ‹
                            </button>
                            <div className="date-display">
                                {isToday ? "Today" : new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                            <button
                                onClick={handleNextDay}
                                className="date-nav-btn"
                                disabled={isToday}
                                aria-label="Next Day"
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    {/* Tab Switcher */}
                    <div className="tab-switcher">
                        <button
                            className={`tab-btn ${activeTab === 'tracker' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tracker')}
                        >
                            Tracker
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
                            onClick={() => setActiveTab('stats')}
                        >
                            Analytics
                        </button>
                    </div>
                </header>

                {activeTab === 'tracker' ? (
                    <div className="animate-fade-in flex flex-col space-y-12 pb-24">
                        <CalorieDashboard
                            consumed={consumed}
                            goal={settings.dailyGoal}
                            streak={streak}
                            onEditGoal={handleUpdateGoal}
                        />

                        <MealGrid entries={dailyEntries} />

                        <FoodEntryList
                            entries={dailyEntries}
                            onDelete={handleDeleteEntry}
                            onEdit={handleEditEntry}
                        />

                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <CalorieAnalytics
                            entries={entries}
                            currentDate={date}
                            goal={settings.dailyGoal}
                        />
                    </div>
                )}

                {/* Floating Action Button */}
                <button
                    className="floating-add-btn"
                    onClick={() => setIsAddModalOpen(true)}
                    title="Add Food"
                >
                    <span>+</span>
                </button>

                <AddFoodModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddEntry}
                />
                <GoalModal
                    isOpen={isGoalModalOpen}
                    tempGoal={tempGoal}
                    setTempGoal={setTempGoal}
                    onClose={() => setIsGoalModalOpen(false)}
                    onConfirm={confirmUpdateGoal}
                />
            </div>
        </div>
    );
};

export default CalorieTracker;
