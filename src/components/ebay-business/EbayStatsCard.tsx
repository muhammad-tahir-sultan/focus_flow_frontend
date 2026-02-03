import type { EbayStats } from '../../api/ebay';

interface Props {
    stats: EbayStats | null;
}

export default function EbayStatsCard({ stats }: Props) {
    return (
        <div className="card-premium" style={{ padding: '2.5rem' }}>
            <h2 className="heading-lg gradient-text" style={{ marginBottom: '2rem', marginTop: 0 }}>Business Analytics</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(59, 130, 246, 0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <p className="text-xs font-bold" style={{ color: 'var(--accent-color)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Total Persistence</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stats?.logsCount || 0}</span>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Days</span>
                    </div>
                </div>

                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(236, 72, 153, 0.05)',
                    borderRadius: '20px',
                    border: '1px solid rgba(236, 72, 153, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <p className="text-xs font-bold" style={{ color: '#ec4899', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Hours Invested</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {Math.round((stats?.totalTime || 0) / 60)}
                        </span>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Hrs</span>
                    </div>
                </div>
            </div>

            <div style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <p className="text-xs" style={{ color: 'var(--text-secondary)', margin: 0, textAlign: 'center' }}>
                    Consistency is the only bridge between goals and accomplishment.
                </p>
            </div>
        </div>
    );
}
