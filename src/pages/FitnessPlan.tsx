import '../styles/focusFlow.css';
import { useFitnessData } from '../hooks/useFitnessData';
import { prepareChartData, preparePieData } from '../utils/chartUtils';
import { TodayFocusCard } from '../components/fitness/TodayFocusCard';
import { FitnessCharts } from '../components/fitness/FitnessCharts';
import { DailyCheckIn } from '../components/fitness/DailyCheckIn';
import { WeeklyStructure } from '../components/fitness/WeeklyStructure';
import { WorkoutDetails } from '../components/fitness/WorkoutDetails';
import { RunningProgression } from '../components/fitness/RunningProgression';
import { RulesAndNutrition, ResultsAndNonNegotiables } from '../components/fitness/InfoSections';

const FitnessPlan = () => {
    const { dailyChecklist, stats, loading, todayDate, toggleCheck } = useFitnessData();

    const chartData = prepareChartData(stats);
    const pieData = preparePieData(stats);

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <div className="master-roadmap-hero mb-8">
                <div className="hero-glow"></div>
                <div className="hero-content text-center">
                    <span className="hero-badge">🏋️ Physical Mastery</span>
                    <h1 className="hero-title">
                        FocusFlow <span className="gradient-text">System</span>
                    </h1>
                    <p className="text-secondary text-xl mt-4">
                        6-Month Home Push–Pull–Legs + Running
                    </p>
                </div>
            </div>

            <TodayFocusCard />

            <FitnessCharts
                chartData={chartData}
                pieData={pieData}
                totalLogs={stats?.totalLogs || 0}
            />

            <DailyCheckIn
                checklist={dailyChecklist}
                todayDate={todayDate}
                loading={loading}
                onToggle={toggleCheck}
            />

            {/* Goal Card */}
            <div className="card-premium mb-8 text-center">
                <h2 className="heading-lg mb-2">🎯 GOAL</h2>
                <p className="text-lg text-secondary">
                    Build an athletic body, high stamina, discipline, and mental clarity in 6 months —
                    <span className="text-primary font-bold">fully at home.</span>
                </p>
            </div>

            <WeeklyStructure />

            <WorkoutDetails />

            <RunningProgression />

            <RulesAndNutrition />

            <ResultsAndNonNegotiables />
        </div>
    );
};

export default FitnessPlan;
