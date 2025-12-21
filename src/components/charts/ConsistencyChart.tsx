import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConsistencyChartProps {
    data: { week: number; value: number }[];
}

const ConsistencyChart = ({ data }: ConsistencyChartProps) => {
    return (
        <div className="chart-container">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                        dataKey="week"
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        label={{ value: 'Week', position: 'insideBottom', offset: -5, fill: 'var(--text-secondary)' }}
                        interval="preserveStartEnd"
                        minTickGap={20}
                    />
                    <YAxis
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        label={{ value: 'Days Logged', angle: -90, position: 'insideLeft', fill: 'var(--text-secondary)' }}
                        domain={[0, 7]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '4px'
                        }}
                        formatter={(value: number | undefined) => [`${value || 0} days`, 'Logged']}
                    />
                    <Bar
                        dataKey="value"
                        fill="var(--success-color)"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ConsistencyChart;
