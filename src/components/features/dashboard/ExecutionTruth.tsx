import '../../../styles/skeleton.css';
import ExecutionStreakChart from '../../charts/ExecutionStreakChart';
import TimeInvestedChart from '../../charts/TimeInvestedChart';
import NonNegotiablesChart from '../../charts/NonNegotiablesChart';
import ConsistencyChart from '../../charts/ConsistencyChart';
import type { AnalyticsData, NonNegotiablesData, ConsistencyData } from '../../../types/dashboard';

interface ExecutionTruthProps {
    showGraphs: boolean;
    setShowGraphs: (show: boolean) => void;
    analyticsLoading: boolean;
    analyticsError: string;
    streakData: AnalyticsData[];
    timeData: AnalyticsData[];
    nonNegotiablesData: NonNegotiablesData;
    consistencyData: ConsistencyData[];
}

const ExecutionTruth = ({
    showGraphs,
    setShowGraphs,
    analyticsLoading,
    analyticsError,
    streakData,
    timeData,
    nonNegotiablesData,
    consistencyData
}: ExecutionTruthProps) => {
    return (
        <div className="card" style={{ marginTop: '3rem' }}>
            <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                <h2 className="heading-lg">Execution Truth</h2>
                <button
                    onClick={() => setShowGraphs(!showGraphs)}
                    className="btn btn-toggle"
                >
                    {showGraphs ? 'Hide Graphs' : 'Show Graphs'}
                </button>
            </div>

            {showGraphs && (
                <>
                    {analyticsLoading ? (
                        <div style={{ padding: '3rem' }}>
                            <div className="skeleton" style={{ width: '100%', height: '300px', marginBottom: '2rem' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '300px', marginBottom: '2rem' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '200px', marginBottom: '2rem' }}></div>
                            <div className="skeleton" style={{ width: '100%', height: '300px' }}></div>
                        </div>
                    ) : analyticsError ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--error-color)' }}>
                            {analyticsError}
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '3rem' }}>
                            {/* Execution Streak */}
                            <div>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                                    Daily Execution Streak (Last 30 Days)
                                </h3>
                                {streakData.length > 0 ? (
                                    <ExecutionStreakChart data={streakData} />
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                        No data available
                                    </div>
                                )}
                            </div>

                            {/* Time Invested */}
                            <div>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                                    Daily Time Invested (Last 14 Days)
                                </h3>
                                {timeData.length > 0 ? (
                                    <TimeInvestedChart data={timeData} />
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                        No data available
                                    </div>
                                )}
                            </div>

                            {/* Non-Negotiables Completion */}
                            <div>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                                    Non-Negotiables Completion
                                </h3>
                                {nonNegotiablesData.totalCount > 0 ? (
                                    <NonNegotiablesChart
                                        completedCount={nonNegotiablesData.completedCount}
                                        totalCount={nonNegotiablesData.totalCount}
                                    />
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                        No data available
                                    </div>
                                )}
                            </div>

                            {/* 6-Month Consistency */}
                            <div>
                                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>
                                    6-Month Consistency (Last 26 Weeks)
                                </h3>
                                {consistencyData.length > 0 ? (
                                    <ConsistencyChart data={consistencyData} />
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                                        No data available
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExecutionTruth;
