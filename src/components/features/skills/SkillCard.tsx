import type { SkillEntry } from "../../../types/skill";


interface SkillCardProps {
    entry: SkillEntry;
}

const SkillCard = ({ entry }: SkillCardProps) => {
    // Determine border color based on category
    const borderColor = entry.category === 'Technical' ? '#3b82f6' :
        entry.category === 'Soft Skill' ? '#10b981' :
            entry.category === 'Language' ? '#8b5cf6' : '#f59e0b';

    return (
        <div
            className="card w-full mb-4"
            style={{
                borderLeft: `4px solid ${borderColor}`,
                position: 'relative',
                transition: 'all 0.2s ease',
                padding: '1.5rem',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'
            }}
        >
            <div className="flex-between mb-4" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h3 className="heading-lg" style={{ fontSize: '1.25rem', marginBottom: '0.25rem', letterSpacing: '-0.02em', lineHeight: '1.4' }}>
                        {entry.skillName}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            {new Date(entry.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                </div>
                <span
                    className="badge"
                    style={{
                        backgroundColor: `${borderColor}20`,
                        color: borderColor,
                        border: `1px solid ${borderColor}40`,
                        whiteSpace: 'nowrap',
                        boxShadow: `0 0 10px ${borderColor}20`
                    }}
                >
                    {entry.category}
                </span>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>⏱️</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em' }}>Duration</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{entry.duration}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '8px' }}>
                    <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>📈</span>
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em' }}>Mastery</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', minWidth: '60px' }}>
                                <div style={{ width: `${entry.masteryLevel * 10}%`, height: '100%', background: borderColor, borderRadius: '2px' }}></div>
                            </div>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: borderColor }}>{entry.masteryLevel}/10</span>
                        </div>
                    </div>
                </div>
            </div>

            {entry.notes && (
                <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <p className="text-sm" style={{
                        color: 'var(--text-secondary)',
                        lineHeight: '1.7',
                        fontSize: '0.95rem'
                    }}>
                        {entry.notes}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SkillCard;
