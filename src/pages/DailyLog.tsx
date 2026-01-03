import Loader from '../components/Loader';
import { useDailyLog } from '../hooks/useDailyLog';
import DailyLogHero from '../components/features/daily-log/DailyLogHero';
import DailyLogForm from '../components/features/daily-log/DailyLogForm';
import './DailyLog.css';

const DailyLog = () => {
    const {
        formData,
        setFormData,
        checkedItems,
        handleCheckChange,
        error,
        isLoading,
        handleSubmit,
        isEditing
    } = useDailyLog();

    if (isLoading) return <Loader />;

    return (
        <div className="daily-log-page">
            <div className="container" style={{ maxWidth: '800px' }}>
                <DailyLogHero isEditing={isEditing} />

                <DailyLogForm
                    formData={formData}
                    setFormData={setFormData}
                    checkedItems={checkedItems}
                    handleCheckChange={handleCheckChange}
                    handleSubmit={handleSubmit}
                    error={error}
                    isEditing={isEditing}
                />
            </div>
        </div>
    );
};

export default DailyLog;
