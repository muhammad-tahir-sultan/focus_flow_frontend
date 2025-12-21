import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExecutionStreakChartProps {
    data: { date: string; value: number }[];
}

const ExecutionStreakChart = ({ data }: ExecutionStreakChartProps) => {
    return (
        <div className="chart-container">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getMonth() + 1}/${date.getDate()}`;
                        }}
                        interval="preserveStartEnd"
                        minTickGap={30}
                    />
                    <YAxis
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        domain={[0, 1]}
                        ticks={[0, 1]}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '4px'
                        }}
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: number | undefined) => [value === 1 ? 'Logged' : 'Missed', 'Status']}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--accent-color)"
                        strokeWidth={2}
                        dot={{ fill: 'var(--accent-color)', r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ExecutionStreakChart;
