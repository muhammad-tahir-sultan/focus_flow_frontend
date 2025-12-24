import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Vision = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            alert('Access denied. This page is only available to administrators.');
            navigate('/');
        }
    }, [isAdmin, navigate]);
    const projections = [
        {
            time: '6 Months',
            title: 'The Foundation Phase',
            focus: 'Habit formation, initial skill mastery, and system setup.',
            achievements: [
                'Revenue Engine: ~500–1,800 new agency connections. 2–5 steady clients.',
                'Tech Skills: Completed NestJS Phase 1 & 2. 3+ production features in Focus Flow.',
                'Physique: Significant body fat loss / lean muscle gain. Identity shift.',
                'English: Professional fluency in reading and basic technical discussions.'
            ],
            outcomes: [
                'Financial: ₹30,000–₹50,000/month mark consistently.',
                'Mindset: High "Internal Locus of Control". Dictating the day.'
            ],
            color: 'var(--accent-color)'
        },
        {
            time: '1 Year',
            title: 'The Momentum Phase',
            focus: 'Compounding results and professional authority.',
            achievements: [
                'Revenue Engine: ~1,00,000–3,600 connections. Known entity in niche.',
                'Tech Skills: Mastered full MERN + NestJS stack. System architect level.',
                'Degree: Significant progress / high grades via daily 1-hour study.',
                'Physique: Peak energy levels. Baseline minimums significantly higher.'
            ],
            outcomes: [
                'Financial: Hitting the ₹1,00,000/month target.',
                'Career: Transitioning from "searching" to "choosing" work.'
            ],
            color: '#6366f1' // Vibrant Indigo
        },
        {
            time: '3 Years',
            title: 'The Mastery Phase',
            focus: 'Deep expertise, financial freedom, and lifestyle design.',
            achievements: [
                'Revenue Engine: Massive network of ~5,000+ contacts. High-ticket consulting.',
                'Tech Skills: Senior-level expertise. Open Source contributor / Mentor.',
                'English: Near-native professional fluency. Leading global discovery calls.',
                'Mindset: Stoic resilience as default state. High-pressure mastery.'
            ],
            outcomes: [
                'Financial: ₹3,00,000+/month potential. Multiple income streams.',
                'Lifestyle: Complete control over time and location.'
            ],
            color: '#10b981' // Solid Success Green
        },
        {
            time: '5 Years',
            title: 'The Legacy Phase',
            focus: 'Compounded wealth, peak physique, and total autonomy.',
            achievements: [
                'Revenue Engine: Self-sustaining system. 80% business from referrals.',
                'Tech Skills: Tech Lead / Architect level. Strategic "Why" over "How".',
                'Physique: Top 5% of age group in health, strength, and longevity.',
                'Degree: Completed with superior real-world skill set.'
            ],
            outcomes: [
                'Financial: Financial independence. Massive compounded safety net.',
                'Identity: Extreme discipline. Non-negotiables are "Who I Am".'
            ],
            color: '#f59e0b' // Solid Warning Orange/Yellow
        }
    ];

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
            <div className="mb-8" style={{ textAlign: 'center' }}>
                <h1 className="heading-xl">Long-term Vision</h1>
                <p className="text-sm" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    The compound effect of your daily non-negotiables over time.
                    Consistency is the only variable that matters.
                </p>
            </div>

            <div style={{ display: 'grid', gap: '2.5rem' }}>
                {projections.map((p) => (
                    <div key={p.time} className="card" style={{ borderLeft: `6px solid ${p.color}`, position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            top: '-12px',
                            right: '20px',
                            backgroundColor: p.color,
                            color: p.time === '5 Years' ? '#000' : '#fff',
                            padding: '0.35rem 1.25rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '800',
                            boxShadow: `0 4px 12px ${p.color}44`,
                            border: '2px solid var(--surface-color)'
                        }}>
                            {p.time}
                        </div>

                        <h2 className="heading-lg" style={{ marginBottom: '0.5rem' }}>{p.title}</h2>
                        <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            {p.focus}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: p.color, marginBottom: '1rem' }}>
                                    🚀 Key Achievements
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
                                    {p.achievements.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem' }}>
                                            <span style={{ color: p.color }}>•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                                    🎯 Expected Outcomes
                                </h3>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
                                    {p.outcomes.map((item, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem' }}>
                                            <span style={{ color: 'var(--success-color)' }}>✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{
                marginTop: '4rem',
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                border: '1px dashed var(--accent-color)',
                padding: '2rem'
            }}>
                <h3 className="heading-lg mb-4">💡 The Strategy</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <div>
                        <h4 style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}>The Floor vs. The Ceiling</h4>
                        <p className="text-sm">
                            Even if you only do the <strong>Minimum Non-Negotiable (MNN)</strong> every single day, you will still be ahead of 95% of people. The key is the unbroken chain.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--success-color)', marginBottom: '0.5rem' }}>Identity-Based Habits</h4>
                        <p className="text-sm">
                            A "Yes" on a bad day (doing just the MNN) is more valuable for your long-term identity than a "Yes" on a good day.
                        </p>
                    </div>
                </div>
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Link to="/" className="btn btn-primary">Back to Dashboard</Link>
                </div>
            </div>
        </div>
    );
};

export default Vision;
