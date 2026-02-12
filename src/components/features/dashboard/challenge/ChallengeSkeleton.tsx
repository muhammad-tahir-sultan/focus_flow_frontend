
const ChallengeSkeleton = () => {
    return (
        <div className="challenge-card skeleton-card">
            <div className="challenge-header">
                <div className="skeleton-title-row">
                    <div className="skeleton-line skeleton-title"></div>
                    <div className="skeleton-line skeleton-subtitle"></div>
                </div>
                <div className="challenge-stats">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="stat-item">
                            <div className="skeleton-line skeleton-stat-value"></div>
                            <div className="skeleton-line skeleton-stat-label"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="skeleton-progress-bar"></div>

            <div className="tasks-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <div key={i} className="task-wrapper skeleton-task">
                        <div className="task-item">
                            <div className="skeleton-checkbox"></div>
                            <div className="skeleton-line skeleton-task-text"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="forecast-section">
                <div className="skeleton-line skeleton-forecast-title"></div>
                <div className="forecast-grid">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="forecast-item skeleton-forecast-item">
                            <div className="skeleton-line skeleton-forecast-val"></div>
                            <div className="skeleton-line skeleton-forecast-lab"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChallengeSkeleton;
