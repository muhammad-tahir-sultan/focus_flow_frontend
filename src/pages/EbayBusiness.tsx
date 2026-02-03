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
        <div className="container" style={{ paddingBottom: '3rem' }}>
            {/* Hero Section */}
            <div className="master-roadmap-hero" style={{ padding: '3rem 2rem', marginBottom: '2rem' }}>
                <div className="hero-content">
                    <div className="hero-badge">Phase 2: Parallel Start</div>
                    <h1 className="hero-title gradient-text">eBay Business</h1>
                    <p className="hero-subtitle">
                        Find Germany-based partners (students/expats) for % profit share. Scale via daily FB outreach.
                    </p>
                </div>
                <div className="hero-glow"></div>
            </div>

            {/* Main Layout Grid */}
            <div className="grid-responsive-2" style={{ alignItems: 'start', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)' }}>
                {/* Left Column: Input & Outreach */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <EbayTaskLogForm onSubmit={handleLogSubmit} isSubmitting={isSubmitting} />
                    <OutreachTemplates />
                </div>

                {/* Right Column: Stats & System */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <EbayStatsCard stats={stats} />
                    <WeeklyRoutineCard />

                    <div className="card-premium">
                        <h2 className="heading-lg gradient-text">Core Focus Areas</h2>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Rotate these daily</p>
                        <ul className="non-negotiables-list">
                            <li className="non-negotiable-item"><span className="bullet">⬜</span> FB Groups Search (Post/Respond)</li>
                            <li className="non-negotiable-item"><span className="bullet">⬜</span> Outreach to Pakistanis/Indians in DE</li>
                            <li className="non-negotiable-item"><span className="bullet">⬜</span> Interview & Filter Candidates</li>
                            <li className="non-negotiable-item"><span className="bullet">⬜</span> Explain % Profit Model</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
