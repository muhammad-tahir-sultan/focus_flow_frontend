import { Link } from 'react-router-dom';

const ControlList = () => {
    return (
        <div style={{ width: '100%' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                ← Back to Dashboard
            </Link>

            <h1 className="heading-xl mb-2" style={{ textAlign: 'center' }}>Stoic Control Circle</h1>
            <p className="text-lg mb-8" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                "Focus on what you can control, and accept what you cannot."
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Can Control */}
                <div className="card" style={{ borderTop: '4px solid var(--accent-color)' }}>
                    <h2 className="heading-lg mb-6" style={{ textAlign: 'center', color: 'var(--accent-color)' }}>✅ What I Can Control</h2>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                        {[
                            'My Effort & Work Ethic',
                            'My Attitude & Mindset',
                            'How I Respond to Situations',
                            'My Daily Habits & Routine',
                            'My Preparation',
                            'My Self-Care (Sleep, Diet, Exercise)',
                            'How I Treat Others',
                            'What I Learn & Consume',
                            'My Integrity & Honesty',
                            'Setting Boundaries'
                        ].map((item, index) => (
                            <li key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                backgroundColor: 'rgba(0, 255, 157, 0.05)',
                                borderRadius: '8px',
                                border: '1px solid rgba(0, 255, 157, 0.1)'
                            }}>
                                <span style={{ color: 'var(--accent-color)' }}>✓</span>
                                <span style={{ fontWeight: '500' }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Can't Control */}
                <div className="card" style={{ borderTop: '4px solid var(--error-color)' }}>
                    <h2 className="heading-lg mb-6" style={{ textAlign: 'center', color: 'var(--error-color)' }}>❌ What I Can't Control</h2>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                        {[
                            'Other People\'s Opinions of Me',
                            'Other People\'s Actions & Feelings',
                            'The Past (It\'s gone)',
                            'The Future (It hasn\'t happened)',
                            'The Outcome (Only the input is mine)',
                            'Traffic, Weather, Economy',
                            'Global Events',
                            'How Fast I Learn (Natural aptitude)',
                            'Aging & Time',
                            'Rejection & Failure (Part of the process)'
                        ].map((item, index) => (
                            <li key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem',
                                backgroundColor: 'rgba(255, 77, 77, 0.05)',
                                borderRadius: '8px',
                                border: '1px solid rgba(255, 77, 77, 0.1)'
                            }}>
                                <span style={{ color: 'var(--error-color)' }}>✕</span>
                                <span style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ControlList;
