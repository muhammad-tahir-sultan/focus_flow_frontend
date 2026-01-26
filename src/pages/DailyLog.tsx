import PageSkeleton from '../components/PageSkeleton';
import { useDailyLog } from '../hooks/useDailyLog';
import DailyLogHero from '../components/features/daily-log/DailyLogHero';
import DailyLogForm from '../components/features/daily-log/DailyLogForm';
import './DailyLog.css';

import { useAuth } from '../context/AuthContext';

const DailyLog = () => {
    const { isAdmin } = useAuth();
    const {
        formData,
        setFormData,
        checkedItems,
        handleCheckChange,
        availableItems,
        addItem,
        deleteItem,
        error,
        isLoading,
        handleSubmit,
        isEditing
    } = useDailyLog();

    if (isLoading) return <PageSkeleton hasHeader hasForm hasCards cardsCount={5} />;

    return (
        <div className="daily-log-page">
            <div className="container" style={{ maxWidth: '800px' }}>
                <DailyLogHero isEditing={isEditing} />

                <DailyLogForm
                    formData={formData}
                    setFormData={setFormData}
                    checkedItems={checkedItems}
                    handleCheckChange={handleCheckChange}
                    availableItems={availableItems}
                    addItem={addItem}
                    deleteItem={deleteItem}
                    handleSubmit={handleSubmit}
                    error={error}
                    isEditing={isEditing}
                    isAdmin={isAdmin()}
                />
            </div>
        </div>
    );
};

export default DailyLog;
