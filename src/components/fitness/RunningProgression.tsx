interface MonthCardProps {
    month: string;
    runs: { type: string; distance: string }[];
}

const MonthCard = ({ month, runs }: MonthCardProps) => (
    <div className="card-premium">
        <h4 className="heading-md mb-3">{month}</h4>
        <ul className="text-sm" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {runs.map((run, idx) => (
                <li key={idx} className="flex-between">
                    <span className="text-secondary">{run.type}:</span>
                    <span>{run.distance}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const RunningProgression = () => {
    const progression = [
        {
            month: 'Month 1',
            runs: [
                { type: 'Easy', distance: '2–3 km' },
                { type: 'Speed', distance: '5×100m' },
                { type: 'Long', distance: '4–5 km' },
                { type: 'Recovery', distance: '2 km' },
            ]
        },
        {
            month: 'Month 2–3',
            runs: [
                { type: 'Easy', distance: '4 km' },
                { type: 'Speed', distance: '8×200m' },
                { type: 'Long', distance: '7–8 km' },
                { type: 'Interval', distance: '30s sprint / 90s jog ×6' },
            ]
        },
        {
            month: 'Month 4–6',
            runs: [
                { type: 'Easy', distance: '5–6 km' },
                { type: 'Speed', distance: '10×300m' },
                { type: 'Long', distance: '10–12 km' },
                { type: 'Interval', distance: '45s sprint / 60s jog ×8' },
            ]
        }
    ];

    return (
        <>
            <h2 className="heading-lg mb-6">🏃‍♂️ Running Progression</h2>
            <div className="grid-responsive-3 mb-8">
                {progression.map((month, idx) => (
                    <MonthCard key={idx} {...month} />
                ))}
            </div>
        </>
    );
};
