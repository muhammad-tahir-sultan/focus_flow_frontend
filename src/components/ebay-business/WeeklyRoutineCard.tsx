export default function WeeklyRoutineCard() {
    const isWeekday = () => {
        const day = new Date().getDay();
        return day >= 1 && day <= 5;
    };

    const weekdayTasks = [
        "Join 3-5 new FB Groups (Germany)",
        "Direct Outreach (10-15 people)",
        "Reply to comments on old posts"
    ];

    const weekendTasks = [
        "Deep Partner Interviews/Calls",
        "Find better groups/communities",
        "Refine outreach script"
    ];

    return (
        <div className="card-premium ebay-card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 className="heading-lg gradient-text" style={{ margin: 0 }}>Weekly Routine</h2>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Optimized for outreach volume</p>
                </div>
                <div className={`badge ${isWeekday() ? 'badge-filled' : 'badge-outline'}`} style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: isWeekday() ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    border: '1px solid var(--accent-color)',
                    color: 'var(--accent-color)'
                }}>
                    {isWeekday() ? '⚡ WEEKDAY MODE' : '🌙 WEEKEND MODE'}
                </div>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
                <section>
                    <h3 className="text-xs font-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                        Weekdays (60–90m)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {weekdayTasks.map((task, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '6px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    marginTop: '2px'
                                }}>
                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent-color)' }}></div>
                                </div>
                                <span style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>{task}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <h3 className="text-xs font-bold" style={{ color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
                        Weekends (3–5h)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {weekendTasks.map((task, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '6px',
                                    background: 'rgba(252, 211, 77, 0.1)',
                                    border: '1px solid rgba(252, 211, 77, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    marginTop: '2px'
                                }}>
                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FCD34D' }}></div>
                                </div>
                                <span style={{ fontSize: '1rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>{task}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
