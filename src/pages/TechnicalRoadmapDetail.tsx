import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { backendUrl } from '../main';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

interface Resource {
    label: string;
    url: string;
    type: string;
}

interface TechnicalRoadmap {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    content: string;
    whyThisMatters: string;
    problemsItSolves: string[];
    tradeOffs: string[];
    motivation: string;
    learningOutcomes: string[];
    category: string;
    priority: string;
    status: string;
    difficulty: number;
    resources: Resource[];
    createdAt: string;
}

const TechnicalRoadmapDetail = () => {
    const { slug } = useParams();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [roadmap, setRoadmap] = useState<TechnicalRoadmap | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const res = await axios.get(`${backendUrl}/technical-roadmaps/${slug}`);
                setRoadmap(res.data);
            } catch (err) {
                console.error('Failed to fetch roadmap', err);
                setError('Roadmap not found.');
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmap();
    }, [slug]);

    const handleArchive = async () => {
        if (!window.confirm('Are you sure you want to archive this roadmap? It will no longer appear in the future roadmap list.')) return;
        try {
            await axios.patch(`${backendUrl}/technical-roadmaps/${roadmap?._id}/archive`);
            navigate('/future-roadmap');
        } catch (err) {
            console.error('Failed to archive', err);
            alert('Failed to archive roadmap');
        }
    };

    if (loading) return <Loader />;
    if (error || !roadmap) return <div className="container" style={{ padding: '2rem' }}>{error || 'Not found'}</div>;

    return (
        <div className="container" style={{ padding: '2rem 3rem' }}>
            <div className="flex-between mb-8" style={{ marginBottom: '2.5rem' }}>
                <Link to="/future-roadmap" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '1rem' }}>
                    ← Back to Future Roadmap
                </Link>
                {isAdmin() && (
                    <button onClick={handleArchive} className="logout-btn" style={{ fontSize: '0.875rem' }}>
                        Archive Roadmap
                    </button>
                )}
            </div>

            <header style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span className="skill-badge">{roadmap.category}</span>
                    <span className="skill-badge" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--accent-color)' }}>
                        Difficulty: {roadmap.difficulty}/5
                    </span>
                    <span className="skill-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--success-color)' }}>
                        {roadmap.status}
                    </span>
                </div>
                <h1 className="heading-xl" style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>{roadmap.title}</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: '400' }}>
                    {roadmap.summary}
                </p>
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Published on {new Date(roadmap.createdAt).toLocaleDateString()}
                </div>
            </header>

            <div className="roadmap-content">
                <section className="mb-12">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {roadmap.content}
                    </ReactMarkdown>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4rem 0' }} />

                <div style={{ display: 'grid', gap: '3rem' }}>
                    <section>
                        <h3 className="heading-lg" style={{ fontSize: '1.5rem' }}>Why This Matters</h3>
                        <p style={{ lineHeight: '1.8' }}>{roadmap.whyThisMatters}</p>
                    </section>

                    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <h3 className="heading-lg" style={{ fontSize: '1.2rem' }}>Problems It Solves</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {roadmap.problemsItSolves.map((p, i) => (
                                    <li key={i} style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: 0, color: 'var(--accent-color)' }}>✓</span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="heading-lg" style={{ fontSize: '1.2rem' }}>Trade-offs</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {roadmap.tradeOffs.map((t, i) => (
                                    <li key={i} style={{ marginBottom: '0.75rem', paddingLeft: '1.5rem', position: 'relative' }}>
                                        <span style={{ position: 'absolute', left: 0, color: '#ef4444' }}>!</span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="heading-lg" style={{ fontSize: '1.5rem' }}>Motivation</h3>
                        <p style={{ lineHeight: '1.8', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                            "{roadmap.motivation}"
                        </p>
                    </section>

                    <section className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                        <h3 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Learning Outcomes</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                            {roadmap.learningOutcomes.map((o, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-color)' }}></div>
                                    <span className="text-sm">{o}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {roadmap.resources.length > 0 && (
                        <section>
                            <h3 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Curated Resources</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                {roadmap.resources.map((r, i) => (
                                    <a
                                        key={i}
                                        href={r.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover-link"
                                        style={{
                                            padding: '1rem',
                                            backgroundColor: 'var(--surface-color)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '8px',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minWidth: '200px'
                                        }}
                                    >
                                        <span className="text-sm" style={{ opacity: 0.6, marginBottom: '0.25rem' }}>{r.type}</span>
                                        <span style={{ fontWeight: '600' }}>{r.label}</span>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            <style>{`
                .roadmap-content section h1 { font-size: 2.25rem; margin-bottom: 1.5rem; margin-top: 3rem; }
                .roadmap-content section h2 { font-size: 1.75rem; margin-bottom: 1.25rem; margin-top: 2.5rem; }
                .roadmap-content section h3 { font-size: 1.4rem; margin-bottom: 1rem; margin-top: 2rem; }
                .roadmap-content section p { line-height: 1.8; margin-bottom: 1.5rem; font-size: 1.125rem; }
                .roadmap-content section ul, .roadmap-content section ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
                .roadmap-content section li { margin-bottom: 0.5rem; line-height: 1.7; }
                .roadmap-content section code { background-color: rgba(255,255,255,0.1); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; }
                .roadmap-content section pre { background-color: #000; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1.5rem; border: 1px solid var(--border-color); }
                .roadmap-content section pre code { background-color: transparent; padding: 0; }
                .roadmap-content section blockquote { border-left: 4px solid var(--accent-color); padding-left: 1.5rem; margin-left: 0; font-style: italic; color: var(--text-secondary); }
            `}</style>
        </div>
    );
};

export default TechnicalRoadmapDetail;
