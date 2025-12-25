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
        <div className="container" style={{ paddingBlock: '2rem' }}>
            <div className="flex-between mb-8" style={{ marginBottom: '2.5rem' }}>
                <Link to="/future-roadmap" style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    ← Back to Future Roadmap
                </Link>
                {isAdmin() && (
                    <button onClick={handleArchive} className="btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                        Archive Roadmap
                    </button>
                )}
            </div>

            <header style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-filled">{roadmap.category}</span>
                    <span className="badge badge-outline" style={{ borderColor: 'var(--accent-color)', color: 'var(--accent-color)' }}>
                        Difficulty: {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ opacity: i < roadmap.difficulty ? 1 : 0.3, marginLeft: i === 0 ? '0.5rem' : '1px' }}>▮</span>
                        ))}
                    </span>
                    <span className="badge badge-outline" style={{ borderColor: 'var(--success-color)', color: 'var(--success-color)' }}>
                        {roadmap.status}
                    </span>
                </div>
                <h1 className="heading-xl" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>{roadmap.title}</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: '400', maxWidth: '800px' }}>
                    {roadmap.summary}
                </p>
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Published on {new Date(roadmap.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
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
                        <h3 className="heading-lg" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>Why This Matters</h3>
                        <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{roadmap.whyThisMatters}</p>
                    </section>

                    <section className="grid-responsive-2" style={{ gap: '2rem' }}>
                        <div className="card" style={{ borderLeft: '4px solid var(--accent-color)', height: '100%' }}>
                            <h3 className="heading-lg" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Problems It Solves</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {roadmap.problemsItSolves.map((p, i) => (
                                    <li key={i} style={{ marginBottom: '1rem', paddingLeft: '1.75rem', position: 'relative', lineHeight: '1.6' }}>
                                        <span style={{ position: 'absolute', left: 0, top: '2px', color: 'var(--accent-color)', fontWeight: 'bold' }}>✓</span>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #ef4444', height: '100%' }}>
                            <h3 className="heading-lg" style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Trade-offs</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {roadmap.tradeOffs.map((t, i) => (
                                    <li key={i} style={{ marginBottom: '1rem', paddingLeft: '1.75rem', position: 'relative', lineHeight: '1.6' }}>
                                        <span style={{ position: 'absolute', left: 0, top: '2px', color: '#ef4444', fontWeight: 'bold' }}>!</span>
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="heading-lg" style={{ fontSize: '1.5rem' }}>Motivation</h3>
                        <div style={{ borderLeft: '4px solid var(--text-secondary)', paddingLeft: '1.5rem', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                            "{roadmap.motivation}"
                        </div>
                    </section>

                    <section className="card card-premium">
                        <h3 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Learning Outcomes</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                            {roadmap.learningOutcomes.map((o, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', marginTop: '8px', flexShrink: 0 }}></div>
                                    <span className="text-sm" style={{ lineHeight: '1.5', color: 'var(--text-primary)' }}>{o}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {roadmap.resources.length > 0 && (
                        <section>
                            <h3 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Curated Resources</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                                {roadmap.resources.map((r, i) => (
                                    <a
                                        key={i}
                                        href={r.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="card hover-link"
                                        style={{
                                            padding: '1.25rem',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            height: '100%',
                                            transition: 'transform 0.2s, border-color 0.2s'
                                        }}
                                    >
                                        <span className="text-sm" style={{ opacity: 0.6, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>{r.type}</span>
                                        <span style={{ fontWeight: '600', fontSize: '1rem', lineHeight: '1.4' }}>{r.label}</span>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            <style>{`
                .roadmap-content section h1 { font-size: clamp(1.75rem, 4vw, 2.25rem); margin-bottom: 1.5rem; margin-top: 3rem; font-weight: 700; }
                .roadmap-content section h2 { font-size: clamp(1.5rem, 3vw, 1.75rem); margin-bottom: 1.25rem; margin-top: 2.5rem; font-weight: 600; }
                .roadmap-content section h3 { font-size: 1.3rem; margin-bottom: 1rem; margin-top: 2rem; font-weight: 600; color: var(--text-primary); }
                .roadmap-content section p { line-height: 1.8; margin-bottom: 1.5rem; font-size: 1.1rem; color: var(--text-secondary); }
                .roadmap-content section ul, .roadmap-content section ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
                .roadmap-content section li { margin-bottom: 0.5rem; line-height: 1.7; color: var(--text-secondary); }
                .roadmap-content section code { background-color: rgba(255,255,255,0.1); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
                .roadmap-content section pre { background-color: #0d0d0d; padding: 1.5rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1.5rem; border: 1px solid var(--border-color); }
                .roadmap-content section pre code { background-color: transparent; padding: 0; }
                .roadmap-content section blockquote { border-left: 4px solid var(--accent-color); padding-left: 1.5rem; margin-left: 0; font-style: italic; color: var(--text-secondary); background: rgba(59,130,246,0.05); padding: 1rem 1.5rem; border-radius: 0 8px 8px 0; }
                .roadmap-content a { color: var(--accent-color); text-decoration: underline; text-underline-offset: 4px; }
            `}</style>
        </div>
    );
};

export default TechnicalRoadmapDetail;
