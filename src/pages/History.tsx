import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { useHistory } from '../hooks/useHistory';
import HistoryHeader from '../components/features/history/HistoryHeader';
import HistoryStatsGrid from '../components/features/history/HistoryStatsGrid';
import HistoryFilters from '../components/features/history/HistoryFilters';
import HistoryTimeline from '../components/features/history/HistoryTimeline';
import '../styles/history.css';

const History = () => {
    const {
        logs,
        stats,
        initialLoading,
        isRefreshing,
        periodFilter,
        setPeriodFilter,
        moodFilter,
        setMoodFilter,
        handleToggleFavorite,
        getMoodDetails
    } = useHistory();

    if (initialLoading) return <Loader />;

    return (
        <div className="history-page">
            <div className="bg-gradient"></div>

            <HistoryHeader />

            <HistoryStatsGrid stats={stats} />

            <HistoryFilters
                periodFilter={periodFilter}
                setPeriodFilter={setPeriodFilter}
                moodFilter={moodFilter}
                setMoodFilter={setMoodFilter}
            />

            <HistoryTimeline
                logs={logs}
                isRefreshing={isRefreshing}
                getMoodDetails={getMoodDetails}
                handleToggleFavorite={handleToggleFavorite}
            />

            {/* New Entry Button (Mobile) */}
            <Link to="/log" className="btn btn-primary new-entry-btn">
                New Entry
            </Link>
        </div>
    );
};

export default History;
