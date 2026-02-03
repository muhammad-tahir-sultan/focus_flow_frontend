import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlyBreakdownChartProps {
    data: { displayDate: string; income: number; expenses: number }[];
}

const MonthlyBreakdownChart: React.FC<MonthlyBreakdownChartProps> = ({ data }) => {
    return (
        <div className="chart-card chart-card-wide">
            <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: '#3b82f6' }}>
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                Monthly Breakdown
            </h3>
            {data.length === 0 ? (
                <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    <p>No monthly data available.</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="displayDate" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(15, 15, 17, 0.9)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '8px'
                            }}
                            formatter={(value: any) => `₹${Number(value || 0).toLocaleString()}`}
                        />
                        <Legend />
                        <Bar dataKey="income" fill="#3b82f6" name="Income" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default React.memo(MonthlyBreakdownChart);
