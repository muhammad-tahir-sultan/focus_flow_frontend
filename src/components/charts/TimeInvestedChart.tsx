import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimeInvestedChartProps {
    data: { date: string; value: number }[];
}

const TimeInvestedChart = ({ data }: TimeInvestedChartProps) => {
    return (
        <div className="chart-container">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                        interval="preserveStartEnd"
                        minTickGap={25}
                    />
                    <YAxis
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: 'var(--text-secondary)' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '4px'
                        }}
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: number | undefined) => [`${(value || 0).toFixed(1)} hrs`, 'Time Invested']}
                    />
                    <Bar
                        dataKey="value"
                        fill="var(--primary-color)"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TimeInvestedChart;
