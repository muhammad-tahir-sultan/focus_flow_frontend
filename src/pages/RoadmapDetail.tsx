import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../main';

interface Roadmap {
    _id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    weeklyMilestones: string[];
    resources: string[];
}

const RoadmapDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const res = await axios.get<Roadmap>(`${backendUrl}/roadmaps/${id}`);
                setRoadmap(res.data);
            } catch (err) {
                console.error('Failed to fetch roadmap', err);
                setError('Roadmap not found or failed to load.');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchRoadmap();
    }, [id]);

    if (loading) return <div className="container">Loading Roadmap details...</div>;

    if (!roadmap || error) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2 className="heading-lg">Goal Not Found</h2>
                <Link to="/roadmaps" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                    Back to Roadmaps
                </Link>
            </div>
        );
    }

    return (
        <div style={{ width: '100%' }}>
            <Link to="/roadmaps" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                ← Back to Roadmaps
            </Link>

            <div className="mb-8">
                <span className="skill-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>{roadmap.category}</span>
                <h1 className="heading-xl">{roadmap.title}</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                    {roadmap.description}
                </p>
            </div>

            {roadmap.weeklyMilestones && roadmap.weeklyMilestones.length > 0 && (
                <div className="card mb-8" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                    <h2 className="heading-lg mb-4">Weekly Milestones</h2>
                    <ul style={{ paddingLeft: '1.5rem', listStyle: 'none' }}>
                        {roadmap.weeklyMilestones.map((item, index) => (
                            <li key={index} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                                <span style={{ fontWeight: '700', color: 'var(--accent-color)', minWidth: '70px' }}>Week {index + 1}:</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {roadmap.resources && roadmap.resources.length > 0 && (
                <div className="card">
                    <h2 className="heading-lg mb-4">Resources & Tools</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {roadmap.resources.map((item, index) => (
                            <span key={index} style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid var(--border-color)',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
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
