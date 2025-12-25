import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { backendUrl } from '../main';
import Loader from '../components/Loader';

interface Roadmap {
    _id: string;
    title: string;
    description: string;
    content?: string;
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

    if (loading) return <Loader />;

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
        <div className="container" style={{ paddingBlock: '2rem' }}>
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

            {roadmap.content && (
                <div className="card mb-8">
                    <h2 className="heading-lg mb-4">Detailed Content</h2>
                    <div className="roadmap-markdown" style={{ fontSize: '1rem', lineHeight: '1.8' }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {roadmap.content}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {roadmap.weeklyMilestones && roadmap.weeklyMilestones.length > 0 && (
                <div className="card mb-8" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                    <h2 className="heading-lg mb-4">Weekly Milestones</h2>
                    <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                        {roadmap.weeklyMilestones.map((item, index) => (
                            <li key={index} style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <span style={{ fontWeight: '700', color: 'var(--accent-color)', minWidth: '70px', flexShrink: 0 }}>Week {index + 1}:</span>
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
            <style>{`
                .roadmap-markdown h1 { font-size: 2rem; margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; }
                .roadmap-markdown h2 { font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 1rem; color: var(--text-primary); }
                .roadmap-markdown h3 { font-size: 1.25rem; margin-top: 1.25rem; margin-bottom: 0.75rem; font-weight: 600; }
                .roadmap-markdown p { margin-bottom: 1rem; color: var(--text-secondary); }
                .roadmap-markdown ul, .roadmap-markdown ol { margin-bottom: 1rem; padding-left: 1.5rem; color: var(--text-secondary); }
                .roadmap-markdown li { margin-bottom: 0.5rem; }
                .roadmap-markdown strong { color: var(--text-primary); font-weight: 600; }
                .roadmap-markdown blockquote { border-left: 4px solid var(--accent-color); margin: 0; padding-left: 1rem; color: var(--text-secondary); font-style: italic; background: rgba(59,130,246,0.1); padding: 1rem; border-radius: 4px; }
                .roadmap-markdown code { background: rgba(255,255,255,0.1); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
                .roadmap-markdown pre { background: #000; padding: 1rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1.5rem; border: 1px solid var(--border-color); }
                .roadmap-markdown pre code { background: transparent; padding: 0; }
                .roadmap-markdown hr { border: 0; border-top: 1px solid var(--border-color); margin: 2rem 0; }
                .roadmap-markdown a { color: var(--accent-color); text-decoration: underline; }
            `}</style>
        </div>
    );
};

export default RoadmapDetail;
