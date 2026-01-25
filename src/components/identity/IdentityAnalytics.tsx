
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface IdentityAnalyticsProps {
    analyticsData: any[];
}

const IdentityAnalytics = ({ analyticsData }: IdentityAnalyticsProps) => {
    return (
        <div className="w-full">
            <div className="card-premium">
                <h2 className="heading-lg mb-4">📊 Consistency Tracker (Last 30 Days)</h2>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                </linearGradient>
                                <linearGradient id="cursorGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(255,255,255,0.05)" stopOpacity={1} />
                                    <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                            <XAxis
                                dataKey="date"
                                stroke="#64748b"
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis
                                stroke="#64748b"
                                tick={{ fill: '#64748b', fontSize: 12 }}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'url(#cursorGradient)' }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="custom-tooltip">
                                                <p className="tooltip-date">{label}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                                                    <p className="tooltip-value">{payload[0].value} Tasks Done</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar
                                dataKey="completed"
                                fill="url(#barGradient)"
                                radius={[6, 6, 0, 0]}
                                barSize={32}
                                animationDuration={1000}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default IdentityAnalytics;
