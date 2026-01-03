interface SkillsHeroProps {
    entriesCount: number;
}

const SkillsHero = ({ entriesCount }: SkillsHeroProps) => {
    return (
        <div className="master-roadmap-hero">
            <div className="hero-glow"></div>
            <div className="hero-content">
                <div className="hero-badge">
                    <span>✨</span>
                    <span>Daily Growth</span>
                </div>
                <h1 className="hero-title">
                    Skill <span className="gradient-text">Acquisition</span>
                </h1>
                <p className="hero-subtitle">
                    "I am learning daily." Track your skills, log your progress, and manage your evolution.
                </p>

                <div className="hero-progress">
                    <div className="progress-stats">
                        <span className="progress-label">Entries this Month</span>
                        <span className="progress-value">{entriesCount} Logs</span>
                    </div>
                    <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${Math.min(entriesCount * 5, 100)}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsHero;
