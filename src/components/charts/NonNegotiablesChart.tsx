import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface NonNegotiablesChartProps {
    completedCount: number;
    totalCount: number;
}

const NonNegotiablesChart = ({ completedCount, totalCount }: NonNegotiablesChartProps) => {
    const missedCount = totalCount - completedCount;

    const data = [
        { name: 'Completed', value: completedCount },
        { name: 'Missed', value: missedCount },
    ];

    const COLORS = ['#10b981', '#ef4444'];

    return (
        <div className="chart-container chart-container-pie">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="70%"
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--surface-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '4px'
                        }}
                    />
                    <Legend
                        wrapperStyle={{ color: 'var(--text-primary)' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default NonNegotiablesChart;
