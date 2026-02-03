import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WealthTrendChartProps {
    data: { date: string; balance: number }[];
}

const WealthTrendChart: React.FC<WealthTrendChartProps> = ({ data }) => {
    return (
        <div className="chart-card chart-card-wide" style={{ marginBottom: '24px' }}>
            <h3>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', color: '#8b5cf6' }}>
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                Wealth Growth (Period Trend)
            </h3>
            {data.length <= 1 ? (
                <div style={{ height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    <p>Not enough data to map wealth trend.</p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} minTickGap={30} />
                        <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Balance']}
                        />
                        <Area type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default React.memo(WealthTrendChart);
