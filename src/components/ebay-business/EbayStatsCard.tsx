import type { EbayStats } from '../../api/ebay';

interface Props {
    stats: EbayStats | null;
}

export default function EbayStatsCard({ stats }: Props) {
    if (!stats) return <div className="card-premium"><div className="loader-container"><div className="spinner"></div></div></div>;

    const totalHours = (stats.totalTime / 60).toFixed(1);

    return (
        <div className="card-premium">
            <h2 className="heading-lg gradient-text">Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Total Time Invested</div>
                    <div className="heading-xl" style={{ marginBottom: 0, fontSize: '2rem' }}>{totalHours}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>h</span></div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Days Logged</div>
                    <div className="heading-xl" style={{ marginBottom: 0, fontSize: '2rem' }}>{stats.logsCount}</div>
                </div>
            </div>
        </div>
    )
}
