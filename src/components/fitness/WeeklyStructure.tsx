export const WeeklyStructure = () => {
    const weekSchedule = [
        { day: 'Monday', strength: 'Push', run: 'Easy Run', color: '#60a5fa' },
        { day: 'Tuesday', strength: 'Pull', run: 'Speed Run', color: '#f472b6' },
        { day: 'Wednesday', strength: 'Legs', run: 'Long Run', color: '#fbbf24' },
        { day: 'Thursday', strength: 'Push', run: 'Easy Run', color: '#60a5fa' },
        { day: 'Friday', strength: 'Pull', run: 'Interval Run', color: '#f472b6' },
        { day: 'Saturday', strength: 'Legs', run: 'Recovery Run', color: '#fbbf24' },
        { day: 'Sunday', strength: '❌ Rest', run: '❌ Rest', color: '#9ca3af' },
    ];

    return (
        <div className="card-premium mb-8">
            <h2 className="heading-lg mb-6">📅 Weekly Structure</h2>
            <div style={{ overflowX: 'auto' }}>
                <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 0.5rem', textAlign: 'center' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                            <th style={{ padding: '0.75rem' }}>Day</th>
                            <th style={{ padding: '0.75rem' }}>Strength</th>
                            <th style={{ padding: '0.75rem' }}>Running</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weekSchedule.map((row) => (
                            <tr key={row.day} style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{row.day}</td>
                                <td style={{ padding: '0.75rem', color: row.strength.includes('Rest') ? '#9ca3af' : row.color }}>
                                    {row.strength}
                                </td>
                                <td style={{ padding: '0.75rem', color: row.run.includes('Rest') ? '#9ca3af' : '#4ade80' }}>
                                    {row.run}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
