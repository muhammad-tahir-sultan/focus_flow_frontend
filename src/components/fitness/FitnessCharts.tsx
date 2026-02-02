import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import type { ChartDataPoint, PieDataPoint } from '../../types/fitness.types';

interface FitnessChartsProps {
    chartData: ChartDataPoint[];
    pieData: PieDataPoint[];
    totalLogs: number;
}

export const FitnessCharts = ({ chartData, pieData, totalLogs }: FitnessChartsProps) => {
    return (
        <div className="grid-responsive-2 mb-8">
            <div className="card-premium">
                <h3 className="heading-md mb-4">📊 30-Day Consistency</h3>
                <div style={{ width: '100%', height: 250 }}>
                    {chartData && chartData.length > 0 ? (
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                    itemStyle={{ color: '#f8fafc' }}
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                />
                                <Bar dataKey="Workout" stackId="a" fill="#60a5fa" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="Run" stackId="a" fill="#f472b6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-secondary">
                            <p>No data available yet. Start logging your activities!</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="card-premium">
                <div className="flex-between mb-4">
                    <h3 className="heading-md">🏆 Total Discipline</h3>
                    <div className="text-right">
                        <p className="text-3xl font-bold gradient-text">{totalLogs}</p>
                        <p className="text-xs text-secondary">Days Logged</p>
                    </div>
                </div>
                <div style={{ width: '100%', height: 200 }}>
                    {pieData && pieData.length > 0 ? (
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Legend verticalAlign="bottom" height={36} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-secondary">
                            <p>No data available yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
