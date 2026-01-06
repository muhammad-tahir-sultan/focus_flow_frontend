import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const RoadmapLinks = () => {
    const { isAdmin } = useAuth();

    if (!isAdmin()) {
        return null;
    }

    return (
        <div style={{ marginTop: '3rem', marginBottom: '3rem' }}>
            <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>Mastery Roadmaps</h2>
            <div className="quick-actions-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                <Link to="/master-roadmap" className="action-btn btn-secondary" style={{ borderColor: 'rgba(139, 92, 246, 0.3)', color: '#a78bfa' }}>
                    🗺️ Master Roadmap
                </Link>
                <Link to="/backend-graph" className="action-btn btn-secondary" style={{ borderColor: 'rgba(34, 197, 94, 0.3)', color: '#4ade80' }}>
                    ⚙️ Architectural Mastery Roadmap
                </Link>
                <Link to="/project-graph" className="action-btn btn-secondary" style={{ borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}>
                    🏗️ Projects Roadmap
                </Link>
            </div>
        </div>
    );
};

export default RoadmapLinks;
