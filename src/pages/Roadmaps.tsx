import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { backendUrl } from '../main';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

interface Roadmap {
    _id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    createdAt: string;
}

const Roadmaps = () => {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [filteredRoadmaps, setFilteredRoadmaps] = useState<Roadmap[]>([]);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAuth();

    // Filter states
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fetchRoadmaps = async () => {
            try {
                const res = await axios.get<Roadmap[]>(`${backendUrl}/roadmaps`);
                setRoadmaps(res.data);
            } catch (err) {
                console.error('Failed to fetch roadmaps', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmaps();
    }, []);

    // Apply filters
    useEffect(() => {
        let filtered = [...roadmaps];

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(r => r.category === selectedCategory);
        }
        if (selectedDifficulty !== 'All') {
            filtered = filtered.filter(r => r.difficulty === selectedDifficulty);
        }
        if (searchQuery.trim()) {
            filtered = filtered.filter(r =>
                r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredRoadmaps(filtered);
    }, [roadmaps, selectedCategory, selectedDifficulty, searchQuery]);

    if (loading) return <Loader />;

    // Extract unique values for filters
    const categories = ['All', ...Array.from(new Set(roadmaps.map(r => r.category)))];
    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    return (
        <div className="container" style={{ padding: '2rem 3rem' }}>
            <div className="flex-between mb-8" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 className="heading-xl" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Technology Roadmaps</h1>
                    <p className="text-sm" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Structured paths for mastering modern tech stacks.</p>
                </div>
                {isAdmin() && (
                    <Link to="/roadmaps/new" className="btn btn-primary" style={{ padding: '0.875rem 1.75rem', fontSize: '1rem' }}>
                        + Upload Roadmap
                    </Link>
                )}
            </div>

            {/* Filters */}
            <div className="card" style={{ marginBottom: '2.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Search</label>
                        <input
                            type="text"
                            placeholder="Search by title or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                        />
                    </div>
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Difficulty</label>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
                        >
                            {difficulties.map(diff => (
                                <option key={diff} value={diff}>{diff}</option>
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
                            setSelectedDifficulty('All');
                            setSearchQuery('');
                        }}
                        className="btn-secondary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
                {filteredRoadmaps.map(roadmap => (
                    <div key={roadmap._id} className="card roadmap-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        padding: '2rem',
                        cursor: 'pointer',
                        minHeight: '280px'
                    }}>
                        <div className="mb-4">
                            <span className="skill-badge" style={{ marginBottom: '1rem', display: 'inline-block', fontSize: '0.85rem' }}>{roadmap.category}</span>
                            <h2 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.3' }}>{roadmap.title}</h2>
                            <p className="text-sm" style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                marginBottom: '1.5rem',
                                lineHeight: '1.6',
                                fontSize: '1rem',
                                color: 'var(--text-secondary)'
                            }}>
                                {roadmap.description}
                            </p>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <div className="flex-between text-sm mb-4" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', fontSize: '0.95rem' }}>
                                <span>Level: <strong>{roadmap.difficulty}</strong></span>
                                <span style={{ opacity: 0.6 }}>{new Date(roadmap.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex-between">
                                <Link to={`/roadmap/${roadmap._id}`} className="hover-link" style={{ fontWeight: '600', color: 'var(--accent-color)', fontSize: '1rem' }}>
                                    View Roadmap →
                                </Link>
                                {isAdmin() && (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Link to={`/roadmaps/edit/${roadmap._id}`} className="btn-icon" title="Edit Roadmap" style={{ fontSize: '1.1rem' }}>
                                            ✏️
                                        </Link>
                                        <button
                                            onClick={async () => {
                                                if (window.confirm('Are you sure you want to delete this roadmap?')) {
                                                    try {
                                                        await axios.delete(`${backendUrl}/roadmaps/${roadmap._id}`);
                                                        setRoadmaps(prev => prev.filter(r => r._id !== roadmap._id));
                                                    } catch (err) {
                                                        alert('Failed to delete roadmap');
                                                    }
                                                }
                                            }}
                                            className="btn-icon"
                                            title="Delete Roadmap"
                                            style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredRoadmaps.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                    <h3 className="heading-lg" style={{ fontSize: '1.75rem' }}>
                        {roadmaps.length === 0 ? 'No roadmaps found.' : 'No roadmaps match your filters.'}
                    </h3>
                    <p className="text-sm" style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
                        {roadmaps.length === 0 ? 'Check back later for new technical structured paths.' : 'Try adjusting your search or filter criteria.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Roadmaps;
