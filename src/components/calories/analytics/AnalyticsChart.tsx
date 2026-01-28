import React from 'react';

interface ChartDataItem {
    date: string;
    label: string;
    calories: number;
}

interface AnalyticsChartProps {
    data: ChartDataItem[];
    max: number;
    goal: number;
    range: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
    data,
    max,
    goal,
    range
}) => {
    return (
        <div className="analytics-section-gap chart-card" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(12px)', borderRadius: '24px', padding: '2.5rem' }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Daily Progress</h3>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>Calorie Trends Over Period</p>
                </div>
                <div className="flex gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bar-premium-blue"></div>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase' }}>Target Range</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bar-premium-red"></div>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase' }}>High</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-[1px] border-t border-dashed border-white/40"></div>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase' }}>Daily Goal</span>
                    </div>
                </div>
            </div>

            <div className="chart-grid" style={{ height: '240px' }}>
                {/* Goal Line */}
                <div
                    className="absolute w-full border-t border-dashed pointer-events-none"
                    style={{ bottom: `${(goal / max) * 100}%`, zIndex: 5, borderColor: 'rgba(255,255,255,0.15)' }}
                >
                    <span className="absolute right-0 -top-5 text-[10px] text-white/40 font-black tracking-widest">{goal} KCAL</span>
                </div>

                <div className="flex items-end justify-between w-full h-full gap-3 px-1">
                    {data.map((day, idx) => {
                        const h = (day.calories / max) * 100;
                        const isNearGoal = day.calories >= goal * 0.9 && day.calories <= goal * 1.1;
                        const isOver = day.calories > goal * 1.1;

                        return (
                            <div key={idx} className="chart-column">
                                <div className="chart-tooltip">
                                    <div className="text-[10px] opacity-60 mb-1">{day.date}</div>
                                    <div className="text-sm font-black">{day.calories.toLocaleString()} kcal</div>
                                </div>

                                <div className="chart-bar-container" style={{ width: range === '7d' ? '30px' : '100%', maxWidth: '40px', background: 'rgba(255,255,255,0.02)' }}>
                                    <div
                                        className={`chart-bar-fill ${isOver ? 'bar-premium-red' : isNearGoal ? 'bar-premium-blue' : 'bar-premium-green'}`}
                                        style={{ height: `${Math.max(4, h)}%`, borderRadius: '6px' }}
                                    />
                                </div>

                                {range === '7d' && (
                                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 900, textTransform: 'uppercase', marginTop: '1rem' }}>{day.label}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {range !== '7d' && (
                <div className="flex justify-between mt-12 text-[10px] text-white/30 uppercase tracking-[0.25em] font-black px-4 pt-6 border-t border-white/5">
                    <span>{new Date(data[0]?.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    <span style={{ letterSpacing: '0.4em', color: 'rgba(255,255,255,0.15)' }}>Performance Tracking</span>
                    <span>{new Date(data[data.length - 1]?.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                </div>
            )}
        </div>
    );
};

export default AnalyticsChart;
