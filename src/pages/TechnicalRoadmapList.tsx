import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { backendUrl } from '../main';
import Loader from '../components/Loader';

interface TechnicalRoadmap {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    category: string;
    priority: string;
    status: string;
    difficulty: number;
    createdAt: string;
}

const TechnicalRoadmapList = () => {
    const [roadmaps, setRoadmaps] = useState<TechnicalRoadmap[]>([]);
    const [filteredRoadmaps, setFilteredRoadmaps] = useState<TechnicalRoadmap[]>([]);
    const [loading, setLoading] = useState(true);
    const [cursor, setCursor] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedPriority, setSelectedPriority] = useState<string>('All');
    const [selectedStatus, setSelectedStatus] = useState<string>('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                setLoading(true);
                const url = cursor
                    ? `${backendUrl}/technical-roadmaps?cursor=${cursor}&limit=20`
                    : `${backendUrl}/technical-roadmaps?limit=20`;
                const res = await axios.get(url);
                if (cursor) {
                    setRoadmaps(prev => [...prev, ...res.data.items]);
                } else {
                    setRoadmaps(res.data.items);
                }
                setNextCursor(res.data.nextCursor);
            } catch (err) {
                console.error('Failed to fetch technical roadmaps', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmaps();
    }, [cursor]);

    // Apply filters whenever roadmaps or filter selections change
    useEffect(() => {
        let filtered = [...roadmaps];

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(r => r.category === selectedCategory);
        }
        if (selectedPriority !== 'All') {
            filtered = filtered.filter(r => r.priority === selectedPriority);
        }
        if (selectedStatus !== 'All') {
            filtered = filtered.filter(r => r.status === selectedStatus);
        }
        if (selectedDifficulty !== 'All') {
            filtered = filtered.filter(r => r.difficulty.toString() === selectedDifficulty);
        }

        setFilteredRoadmaps(filtered);
    }, [roadmaps, selectedCategory, selectedPriority, selectedStatus, selectedDifficulty]);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return '#ef4444';
            case 'Medium': return '#f59e0b';
            case 'Low': return '#10b981';
            default: return 'var(--text-secondary)';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'var(--success-color)';
            case 'InProgress': return 'var(--accent-color)';
            case 'Planned': return 'var(--text-secondary)';
            default: return 'var(--text-secondary)';
        }
    };

    const getTimeEstimate = (difficulty: number) => {
        switch (difficulty) {
            case 1: return '1-2 weeks';
            case 2: return '2-3 weeks';
            case 3: return '3-4 weeks';
            case 4: return '4-6 weeks';
            case 5: return '6-8 weeks';
            default: return '4 weeks';
        }
    };

    // Extract unique values for filters
    const categories = ['All', ...Array.from(new Set(roadmaps.map(r => r.category)))];
    const priorities = ['All', 'High', 'Medium', 'Low'];
    const statuses = ['All', 'Planned', 'InProgress', 'Completed'];
    const difficulties = ['All', '1', '2', '3', '4', '5'];

    if (loading && roadmaps.length === 0) return <Loader />;

    return (
        <div className="container" style={{ padding: '2rem 3rem' }}>
            <div className="flex-between mb-8" style={{ alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 className="heading-xl" style={{ marginBottom: '0.75rem', fontSize: '2.5rem' }}>Future Roadmap (Technical)</h1>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', fontSize: '1.1rem', lineHeight: '1.7' }}>
                        A long-term decision log for critical engineering skills and architectural commitments.
                        These are not tasks, but strategic investments in technical leverage.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="card" style={{ marginBottom: '2.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Priority</label>
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                        >
                            {priorities.map(pri => (
                                <option key={pri} value={pri}>{pri}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Status</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                        >
                            {statuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Difficulty</label>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                        >
                            {difficulties.map(diff => (
                                <option key={diff} value={diff}>{diff === 'All' ? 'All' : `${diff}/5`}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Showing {filteredRoadmaps.length} of {roadmaps.length} roadmaps
                    </span>
                    <button
                        onClick={() => {
                            setSelectedCategory('All');
                            setSelectedPriority('All');
                            setSelectedStatus('All');
                            setSelectedDifficulty('All');
                        }}
                        className="btn-secondary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem' }}>
                {filteredRoadmaps.map(roadmap => (
                    <Link key={roadmap._id} to={`/future-roadmap/${roadmap.slug}`} className="card roadmap-card" style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        flexDirection: 'column',
                        borderLeft: `5px solid ${getPriorityColor(roadmap.priority)}`,
                        cursor: 'pointer',
                        padding: '2rem',
                        minHeight: '280px'
                    }}>
                        <div className="flex-between mb-4">
                            <span className="text-sm" style={{ fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.85rem' }}>
                                {roadmap.category}
                            </span>
                            <span className="text-sm" style={{
                                color: getStatusColor(roadmap.status),
                                fontWeight: '600',
                                fontSize: '0.9rem'
                            }}>
                                ● {roadmap.status}
                            </span>
                        </div>

                        <h2 className="heading-lg" style={{ fontSize: '1.6rem', marginBottom: '1.25rem', lineHeight: '1.3' }}>{roadmap.title}</h2>
                        <p className="text-sm" style={{ marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.7', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                            {roadmap.summary}
                        </p>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                                <span className="text-sm" style={{ fontSize: '0.95rem' }}>Difficulty: <strong>{roadmap.difficulty}/5</strong></span>
                                <span className="text-sm" style={{ fontSize: '0.95rem' }}>Priority: <strong style={{ color: getPriorityColor(roadmap.priority) }}>{roadmap.priority}</strong></span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span className="text-sm" style={{ color: 'var(--accent-color)', fontWeight: '600', fontSize: '0.95rem' }}>
                                    ⏱ Est. Time: <strong>{getTimeEstimate(roadmap.difficulty)}</strong>
                                </span>
                                <span className="text-sm" style={{ opacity: 0.6, fontSize: '0.9rem' }}>{new Date(roadmap.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredRoadmaps.length === 0 && !loading && (
                <div className="card" style={{ textAlign: 'center', padding: '5rem' }}>
                    <h3 className="heading-lg" style={{ fontSize: '1.75rem' }}>No roadmaps match your filters.</h3>
                    <p className="text-sm" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>Try adjusting your filter criteria.</p>
                </div>
            )}

            {nextCursor && (
                <div className="flex-between mt-8" style={{ justifyContent: 'center', marginTop: '3rem' }}>
                    <button
                        onClick={() => setCursor(nextCursor)}
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
                    >
                        {loading ? 'Loading...' : 'Load More Roadmap Entries'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TechnicalRoadmapList;
