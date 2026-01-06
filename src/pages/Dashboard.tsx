import Loader from '../components/Loader';
import { useDashboard } from '../hooks/useDashboard';
import DashboardHeader from '../components/features/dashboard/DashboardHeader';
import DashboardStatsGrid from '../components/features/dashboard/DashboardStatsGrid';
import CustomRangeModal from '../components/features/dashboard/CustomRangeModal';
import QuickActions from '../components/features/dashboard/QuickActions';
import RoadmapLinks from '../components/features/dashboard/RoadmapLinks';
import NonNegotiablesCard from '../components/features/dashboard/NonNegotiablesCard';
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

    if (loading) return <Loader />;

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
                        <NonNegotiablesCard />
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
