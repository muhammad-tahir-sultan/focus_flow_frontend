import { useEffect, useState } from 'react';
import { ebayApi } from '../api/ebay';
import type { CreateEbayLogDto, EbayStats } from '../api/ebay';
import EbayTaskLogForm from '../components/ebay-business/EbayTaskLogForm';
import WeeklyRoutineCard from '../components/ebay-business/WeeklyRoutineCard';
import EbayStatsCard from '../components/ebay-business/EbayStatsCard';
import OutreachTemplates from '../components/ebay-business/OutreachTemplates';

export default function EbayBusiness() {
    const [stats, setStats] = useState<EbayStats | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadStats = async () => {
        try {
            const data = await ebayApi.getStats();
            setStats(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    const handleLogSubmit = async (data: CreateEbayLogDto) => {
        setIsSubmitting(true);
        try {
            await ebayApi.create(data);
            await loadStats();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '5rem', maxWidth: '1400px' }}>
            {/* Hero Section */}
            <div className="master-roadmap-hero" style={{ padding: '4rem 3rem', marginBottom: '3.5rem' }}>
                <div className="hero-content">
                    <div className="hero-badge" style={{ background: 'rgba(252, 211, 77, 0.15)', color: '#FCD34D', border: '1px solid rgba(252, 211, 77, 0.3)' }}>
                        Phase 2: Partner Scouting
                    </div>
                    <h1 className="hero-title gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>eBay Business</h1>
                    <p className="hero-subtitle" style={{ maxWidth: '700px', fontSize: '1.2rem', opacity: 0.9 }}>
                        Building a high-output reselling network. Find Germany-based partners, lock in the profit share, and scale.
                    </p>
                </div>
                <div className="hero-glow" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(252, 211, 77, 0.15), transparent 70%)' }}></div>
            </div>

            {/* Main Layout Grid */}
            <div className="grid-responsive-2" style={{ alignItems: 'start', gap: '3rem', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)' }}>
                {/* Left Column: Operations & Outreach */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div style={{ animation: 'slideUp 0.5s ease-out' }}>
                        <EbayTaskLogForm onSubmit={handleLogSubmit} isSubmitting={isSubmitting} />
                    </div>
                    <div style={{ animation: 'slideUp 0.6s ease-out' }}>
                        <OutreachTemplates />
                    </div>
                </div>

                {/* Right Column: Analytics & Strategy */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div style={{ animation: 'slideUp 0.7s ease-out' }}>
                        <EbayStatsCard stats={stats} />
                    </div>

                    <div style={{ animation: 'slideUp 0.8s ease-out' }}>
                        <WeeklyRoutineCard />
                    </div>

                    <div className="card-premium" style={{
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        animation: 'slideUp 0.9s ease-out'
                    }}>
                        <h2 className="heading-lg gradient-text" style={{ margin: 0 }}>Core Strategy</h2>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: '-1rem' }}>Non-negotiable focus areas</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
                            {[
                                { text: 'FB Groups Search (Post/Respond)', color: '#60a5fa' },
                                { text: 'Outreach to Pakistanis/Indians in DE', color: '#c084fc' },
                                { text: 'Interview & Filter Candidates', color: '#fbbf24' },
                                { text: 'Explain % Profit Model', color: '#4ade80' }
                            ].map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.3s ease',
                                }} className="hover-scale">
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }}></div>
                                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .hover-scale:hover {
                    transform: translateX(8px);
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.1);
                }
            `}</style>
        </div>
    );
}
