import React, { useMemo, useState } from 'react';
import type { FoodEntry, MealType } from '../../types/calories';
import AnalyticsStats from './analytics/AnalyticsStats';
import AnalyticsMacros from './analytics/AnalyticsMacros';
import AnalyticsChart from './analytics/AnalyticsChart';
import '../../styles/calories.css';

type TimeRange = '7d' | '30d' | '90d' | 'custom';

interface CalorieAnalyticsProps {
    entries: FoodEntry[];
    currentDate: string;
    goal: number;
}

const CalorieAnalytics: React.FC<CalorieAnalyticsProps> = ({ entries, currentDate, goal }) => {
    const [range, setRange] = useState<TimeRange>('7d');
    const [customDates, setCustomDates] = useState({ start: '', end: '' });

    // 1. Calculate Date Range
    const periodData = useMemo(() => {
        let start = new Date(currentDate);
        let days = 7;

        if (range === '7d') days = 7;
        else if (range === '30d') days = 30;
        else if (range === '90d') days = 90;
        else if (range === 'custom' && customDates.start) {
            start = new Date(customDates.end || currentDate);
            const s = new Date(customDates.start);
            days = Math.ceil((start.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        }

        const filteredDays: string[] = [];
        for (let i = days - 1; i >= 0; i--) {
            const d = new Date(start);
            d.setDate(d.getDate() - i);
            filteredDays.push(d.toISOString().split('T')[0]);
        }

        const periodEntries = entries.filter(e => filteredDays.includes(e.date));
        return { filteredDays, periodEntries, days };
    }, [range, customDates, entries, currentDate]);

    // 2. Aggregate Data
    const stats = useMemo(() => {
        const { periodEntries, days, filteredDays } = periodData;

        const totals = periodEntries.reduce((acc, curr) => ({
            calories: acc.calories + curr.calories,
            p: acc.p + (curr.protein || 0),
            c: acc.c + (curr.carbs || 0),
            f: acc.f + (curr.fat || 0),
        }), { calories: 0, p: 0, c: 0, f: 0 });

        const mealTypeData = periodEntries.reduce((acc, curr) => {
            acc[curr.mealType] = (acc[curr.mealType] || 0) + curr.calories;
            return acc;
        }, {} as Record<MealType, number>);

        // Consistency: Days within +/- 10% of goal
        let consistentDays = 0;
        let loggedDays = 0;
        filteredDays.forEach(date => {
            const dayCals = periodEntries.filter(e => e.date === date).reduce((s, e) => s + e.calories, 0);
            if (dayCals > 0) {
                loggedDays++;
                if (dayCals >= goal * 0.9 && dayCals <= goal * 1.1) consistentDays++;
            }
        });

        const avgCalories = totals.calories / (loggedDays || 1);
        const calorieDeficit = (goal - avgCalories) * loggedDays;
        // 7700 kcal = approx 1kg fat
        const weightImpact = calorieDeficit / 7700;

        return {
            ...totals,
            avgCalories,
            mealTypeData,
            consistency: (consistentDays / (loggedDays || 1)) * 100,
            loggedRatio: (loggedDays / days) * 100,
            weightImpact
        };
    }, [periodData, goal]);

    // Trend lines for charts
    const chartData = useMemo(() => {
        const { filteredDays, periodEntries } = periodData;
        let max = goal;

        const data = filteredDays.map(date => {
            const cals = periodEntries.filter(e => e.date === date).reduce((s, e) => s + e.calories, 0);
            if (cals > max) max = cals;
            const d = new Date(date);
            return {
                date,
                label: range === '7d' ? d.toLocaleDateString(undefined, { weekday: 'narrow' }) : d.getDate().toString(),
                calories: cals
            };
        });

        return { data, max: max * 1.1 };
    }, [periodData, goal, range]);

    return (
        <div className="mt-6 space-y-8 animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Range Selector */}
            <div className="flex flex-wrap gap-3 items-center mb-6">
                <div className="tab-switcher" style={{ marginBottom: 0 }}>
                    {(['7d', '30d', '90d', 'custom'] as const).map(r => (
                        <button
                            key={r}
                            className={`tab-btn ${range === r ? 'active' : ''}`}
                            onClick={() => setRange(r)}
                        >
                            {r === '7d' ? 'Week' : r === '30d' ? 'Month' : r === '90d' ? '3 Months' : 'Range'}
                        </button>
                    ))}
                </div>

                {range === 'custom' && (
                    <div className="flex items-center gap-3 animate-slide-right bg-white/5 p-1.5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <input
                                type="date"
                                className="bg-transparent border-none text-xs text-white outline-none focus:ring-0 w-[110px]"
                                value={customDates.start}
                                onChange={e => setCustomDates(p => ({ ...p, start: e.target.value }))}
                            />
                        </div>
                        <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">To</span>
                        <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <input
                                type="date"
                                className="bg-transparent border-none text-xs text-white outline-none focus:ring-0 w-[110px]"
                                value={customDates.end}
                                onChange={e => setCustomDates(p => ({ ...p, end: e.target.value }))}
                            />
                        </div>
                    </div>
                )}
            </div>

            <AnalyticsStats
                avgCalories={stats.avgCalories}
                consistency={stats.consistency}
                loggedRatio={stats.loggedRatio}
                weightImpact={stats.weightImpact}
                goal={goal}
                totalItems={periodData.periodEntries.length}
            />

            <AnalyticsMacros
                p={stats.p}
                c={stats.c}
                f={stats.f}
                calories={stats.calories}
                loggedRatio={stats.loggedRatio}
                days={periodData.days}
                mealTypeData={stats.mealTypeData}
            />

            <AnalyticsChart
                data={chartData.data}
                max={chartData.max}
                goal={goal}
                range={range}
            />
        </div>
    );
};

export default CalorieAnalytics;
