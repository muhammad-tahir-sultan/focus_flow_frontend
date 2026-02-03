export default function WeeklyRoutineCard() {
    const isWeekday = () => {
        const day = new Date().getDay();
        return day >= 1 && day <= 5;
    };

    return (
        <div className="card-premium">
            <h2 className="heading-lg gradient-text">Simple Weekly Routine</h2>
            <div className="badge badge-filled" style={{ marginBottom: '1.5rem' }}>
                {isWeekday() ? 'Weekday Mode' : 'Weekend Mode'}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <h3 className="heading-md" style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Weekdays (60–90m)</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                    <li className="non-negotiable-item"><span className="bullet">⬜</span> Log daily progress</li>
                    <li className="non-negotiable-item"><span className="bullet">⬜</span> Pick 1 core focus</li>
                    <li className="non-negotiable-item"><span className="bullet">⬜</span> No zero days</li>
                </ul>
            </div>

            <div>
                <h3 className="heading-md" style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Weekends (3–5h)</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
                    <li className="non-negotiable-item"><span className="bullet">⬜</span> Deep work sessions</li>
                    <li className="non-negotiable-item"><span className="bullet">⬜</span> Strategy review</li>
                    <li className="non-negotiable-item"><span className="bullet">⬜</span> Prepare for next week</li>
                </ul>
            </div>
        </div>
    );
}
