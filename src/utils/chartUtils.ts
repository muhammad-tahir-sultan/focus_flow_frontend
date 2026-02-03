import type { ChartDataPoint, PieDataPoint, FitnessStats } from '../types/fitness.types';

export const prepareChartData = (stats: FitnessStats | null): ChartDataPoint[] => {
    console.log('[ChartUtils] prepareChartData called with stats:', stats);
    if (!stats?.logs) {
        console.log('[ChartUtils] No stats or logs found, returning empty array');
        return [];
    }

    const last30Logs = stats.logs.slice(-30);
    console.log('[ChartUtils] Processing', last30Logs.length, 'logs for chart');
    const chartData = last30Logs.map((log) => ({
        date: log.date.substring(5), // MM-DD
        Workout: log.workoutCompleted ? 1 : 0,
        Run: log.runCompleted ? 1 : 0,
        Water: log.waterIntake ? 1 : 0,
        Sleep: log.sleepQuality ? 1 : 0,
    }));
    console.log('[ChartUtils] Chart data prepared:', chartData);
    return chartData;
};

export const preparePieData = (stats: FitnessStats | null): PieDataPoint[] => {
    const pieData: PieDataPoint[] = [
        { name: 'Workouts', value: stats?.workouts || 0, color: '#60a5fa' },
        { name: 'Runs', value: stats?.runs || 0, color: '#f472b6' },
        { name: 'Water', value: stats?.water || 0, color: '#34d399' },
        { name: 'Sleep', value: stats?.sleep || 0, color: '#a78bfa' },
    ];

    // Filter out zero values for cleaner pie chart
    const activePieData = pieData.filter(d => d.value > 0);

    // Return placeholder if no data
    return activePieData.length > 0
        ? activePieData
        : [{ name: 'No Data', value: 1, color: '#333' }];
};
