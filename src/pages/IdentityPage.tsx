
import { useState } from 'react';
import '../styles/focusFlow.css';
import { useIdentity } from '../hooks/useIdentity';
import IdentityHero from '../components/identity/IdentityHero';
import IdentityTabs from '../components/identity/IdentityTabs';
import IdentityRoadmap from '../components/identity/IdentityRoadmap';
import IdentityPlan from '../components/identity/IdentityPlan';
import IdentityAnalytics from '../components/identity/IdentityAnalytics';

const IdentityPage = () => {
    const [activeTab, setActiveTab] = useState<'roadmap' | 'plan' | 'analytics'>('plan');

    // Use Custom Hook for Logic
    const {
        currentDate,
        activeMonth,
        setActiveMonth,
        todayChecklist,
        analyticsData,
        loading,
        completedLevels,
        changeDate,
        handleDateChange,
        toggleDailyItem,
        toggleLevel,
        getTodayDate
    } = useIdentity();

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <IdentityHero />

            <IdentityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content Areas */}
            {activeTab === 'roadmap' && (
                <IdentityRoadmap
                    completedLevels={completedLevels}
                    toggleLevel={toggleLevel}
                />
            )}

            {activeTab === 'plan' && (
                <IdentityPlan
                    currentDate={currentDate}
                    getTodayDate={getTodayDate}
                    changeDate={changeDate}
                    handleDateChange={handleDateChange}
                    activeMonth={activeMonth}
                    setActiveMonth={setActiveMonth}
                    loading={loading}
                    todayChecklist={todayChecklist}
                    toggleDailyItem={toggleDailyItem}
                />
            )}

            {activeTab === 'analytics' && (
                <IdentityAnalytics analyticsData={analyticsData} />
            )}
        </div>
    );
};

export default IdentityPage;
