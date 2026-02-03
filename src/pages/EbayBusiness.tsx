import { useEffect, useState } from 'react';
import { ebayApi } from '../api/ebay';
import type { CreateEbayLogDto, EbayStats } from '../api/ebay';
import EbayTaskLogForm from '../components/ebay-business/EbayTaskLogForm';
import WeeklyRoutineCard from '../components/ebay-business/WeeklyRoutineCard';
import EbayStatsCard from '../components/ebay-business/EbayStatsCard';

export default function EbayBusiness() {
    const [stats, setStats] = useState<EbayStats | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadStats = async () => {
        try {
            const data = await ebayApi.getStats();
            setStats(data);
        } catch (error) {
            console.error(error);
            // toast.error('Failed to load stats'); // Suppress onload error for smoother UX if empty
        }
    };

    useEffect(() => {
        loadStats();
    }, []);

    const handleLogSubmit = async (data: CreateEbayLogDto) => {
        setIsSubmitting(true);
        try {
            await ebayApi.create(data);
            await loadStats(); // Refresh stats
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ paddingBottom: '3rem' }}>
            <div className="master-roadmap-hero" style={{ padding: '3rem 2rem', marginBottom: '2rem' }}>
                <div className="hero-content">
                    <div className="hero-badge">Phase 2: Parallel Start</div>
                    <h1 className="hero-title gradient-text">eBay Business</h1>
                    <p className="hero-subtitle">
                        Job ke saath-saath business build karna — clean, legal, long‑term.
                    </p>
                </div>
                <div className="hero-glow"></div>
            </div>

            <div className="grid-responsive-2" style={{ alignItems: 'start' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <EbayTaskLogForm onSubmit={handleLogSubmit} isSubmitting={isSubmitting} />
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <EbayStatsCard stats={stats} />
                    <WeeklyRoutineCard />

                    <div className="card-premium">
                        <h2 className="heading-lg gradient-text">Core Focus Areas</h2>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Rotate these daily</p>
                        <ul className="non-negotiables-list">
                            <li className="non-negotiable-item"><span className="bullet">⬜</span> Germany‑based partners find karna</li>
                            <li className="non-negotiable-item"><span className="bullet">⬜</span> Listings & product research</li>
                            <li className="non-negotiable-item"><span className="bullet">⬜</span> SOPs aur systems banana</li>
                            <li className="non-negotiable-item"><span className="bullet">⬜</span> Monthly profit consistency</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
