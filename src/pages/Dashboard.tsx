import PageSkeleton from '../components/PageSkeleton';
import { useDashboard } from '../hooks/useDashboard';
import DashboardHeader from '../components/features/dashboard/DashboardHeader';
import DashboardStatsGrid from '../components/features/dashboard/DashboardStatsGrid';
import CustomRangeModal from '../components/features/dashboard/CustomRangeModal';
import QuickActions from '../components/features/dashboard/QuickActions';
import RoadmapLinks from '../components/features/dashboard/RoadmapLinks';
import GoalsCard from '../components/features/dashboard/GoalsCard';
import ExecutionTruth from '../components/features/dashboard/ExecutionTruth';
import '../styles/dashboard.css';

const Dashboard = () => {
    const {
        stats,
        loading,
        showGraphs,
        setShowGraphs,
        timeline,
        setTimeline,
        currentTime,
        showCustomPicker,
        setShowCustomPicker,
        customRange,
        setCustomRange,
        streakData,
        timeData,
        nonNegotiablesData,
        consistencyData,
        analyticsLoading,
        analyticsError,
        isAdmin
    } = useDashboard();

    if (loading) return <PageSkeleton hasHeader hasStats statsCount={4} hasCards cardsCount={8} />;

    return (
        <div className="dashboard-page">
            <div className="bg-gradient"></div>

            <div className="dashboard-content">
                <DashboardHeader
                    currentTime={currentTime}
                    timeline={timeline}
                    setTimeline={setTimeline}
                    setShowCustomPicker={setShowCustomPicker}
                    isAdmin={isAdmin()}
                />

                <DashboardStatsGrid
                    stats={stats}
                    timeline={timeline}
                />

                <CustomRangeModal
                    show={showCustomPicker}
                    onClose={() => setShowCustomPicker(false)}
                    onApply={() => {
                        setTimeline('Custom');
                        setShowCustomPicker(false);
                    }}
                    customRange={customRange}
                    setCustomRange={setCustomRange}
                />

                <QuickActions />

                <RoadmapLinks />

                {isAdmin() && (
                    <>
                        <GoalsCard />
                    </>
                )}

                <ExecutionTruth
                    showGraphs={showGraphs}
                    setShowGraphs={setShowGraphs}
                    analyticsLoading={analyticsLoading}
                    analyticsError={analyticsError}
                    streakData={streakData}
                    timeData={timeData}
                    nonNegotiablesData={nonNegotiablesData}
                    consistencyData={consistencyData}
                />
            </div>
        </div>
    );
};

export default Dashboard;
