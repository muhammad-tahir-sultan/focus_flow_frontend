import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { roadmaps } from '../data/roadmaps';

const RoadmapDetail = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin()) {
            alert('Access denied. This page is only available to administrators.');
            navigate('/');
        }
    }, [isAdmin, navigate]);

    const { id } = useParams<{ id: string }>();
    const roadmap = id ? roadmaps[id] : null;

    if (!roadmap) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2 className="heading-lg">Goal Not Found</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                ← Back to Dashboard
            </Link>
            {roadmap.weeklyMilestones && (
                <div className="card mb-8">
                    <h2 className="heading-lg mb-4">Weekly Milestones</h2>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                        {roadmap.weeklyMilestones.map((item, index) => (
                            <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {roadmap.resources && (
                <div className="card">
                    <h2 className="heading-lg mb-4">Resources & Tools</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {roadmap.resources.map((item, index) => (
                            <span key={index} style={{
                                backgroundColor: 'var(--surface-color)',
                                border: '1px solid var(--border-color)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.9rem'
                            }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoadmapDetail;
