import { Link } from 'react-router-dom';

const GoalsCard = () => {
    return (
        <div className="card mb-8 goals-card">
            <div className="flex-between mb-4">
                <h3 className="heading-lg" style={{ margin: 0 }}>6 Months Goal Target</h3>
                <Link to="/roadmaps" className="hover-link" style={{ fontSize: '0.9rem' }}>
                    View All Roadmaps
                </Link>
            </div>

            <div className="mb-6">
                <h4 className="goal-section-title goal-core">🔥 Core (Daily Non-Negotiable)</h4>
                <ol className="goals-list">
                    <li>
                        <Link to="/roadmap/revenue-engine" className="hover-link">
                            <strong>Revenue Engine</strong> (Income + Clients)
                        </Link>
                    </li>
                    <li>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/roadmap/skills" className="hover-link">
                                <strong>Tech Skills</strong> (NestJS Phase 1)
                            </Link>
                            <Link to="/google-roadmap" className="badge badge-filled" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                🎯 Google L3 Path
                            </Link>
                            <Link to="/next-path" className="badge badge-filled" style={{ textDecoration: 'none', cursor: 'pointer', background: 'rgba(139, 92, 246, 0.2)', borderColor: 'rgba(139, 92, 246, 0.4)', color: '#a78bfa' }}>
                                🔥 YOUR NEXT PATH (Clear Decision)
                            </Link>
                        </div>
                        <div className="skills-container">
                            <div className="skills-badges">
                                {['NestJS (Advanced)', 'GraphQL', 'Prisma', 'DB Mastery', 'System Design'].map(skill => (
                                    <span key={skill} className="skill-badge">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to="/roadmap/physique" className="hover-link">
                            <strong>Physique & Energy</strong>
                        </Link>
                    </li>
                </ol>
            </div>

            <div>
                <h4 className="goal-section-title goal-rotational">🔄 Rotational (Alternate Days)</h4>
                <ol className="goals-list">
                    <li>
                        <Link to="/roadmap/english" className="hover-link">
                            <strong>English Communication</strong> (3x/Week)
                        </Link>
                    </li>
                    <li>
                        <Link to="/roadmap/degree" className="hover-link">
                            <strong>Degree Completion</strong> (Class Days)
                        </Link>
                    </li>
                    <li>
                        <Link to="/roadmap/better-day" className="hover-link">
                            <strong>Better Day</strong> (Mindset)
                        </Link>
                    </li>
                    <li>
                        <Link to="/roadmap/rate-myself" className="hover-link">
                            <strong>Self-Rating</strong> (Binary Check)
                        </Link>
                    </li>
                </ol>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
                <h4 className="goal-section-title" style={{ opacity: 0.7, fontSize: '0.9rem' }}>📁 Postponed / Reference Roadmaps</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                    <Link to="/google-roadmap" className="badge badge-outline">Google Roadmap</Link>
                    <Link to="/backend-graph" className="badge badge-outline">Backend Graph</Link>
                    <Link to="/project-graph" className="badge badge-outline">Project Graph</Link>
                    <Link to="/master-roadmap" className="badge badge-outline">Master Roadmap</Link>
                </div>
            </div>
        </div>
    );
};

export default GoalsCard;
