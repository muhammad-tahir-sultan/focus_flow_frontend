import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../main';
import { useAuth } from '../context/AuthContext';

const RoadmapEditor = () => {
    const { id } = useParams();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: 'Intermediate',
        weeklyMilestones: [''],
        resources: [''],
        isActive: true,
    });

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
        }
    }, [isAdmin, navigate]);

    useEffect(() => {
        if (id) {
            const fetchRoadmap = async () => {
                try {
                    setLoading(true);
                    const res = await axios.get(`${backendUrl}/roadmaps/${id}`);
                    setFormData(res.data);
                } catch (err) {
                    console.error('Failed to fetch roadmap', err);
                    setError('Failed to load roadmap data');
                } finally {
                    setLoading(false);
                }
            };
            fetchRoadmap();
        }
    }, [id]);

    const handleArrayChange = (index: number, value: string, type: 'weeklyMilestones' | 'resources') => {
        const newArray = [...formData[type]];
        newArray[index] = value;
        setFormData({ ...formData, [type]: newArray });
    };

    const addArrayItem = (type: 'weeklyMilestones' | 'resources') => {
        setFormData({ ...formData, [type]: [...formData[type], ''] });
    };

    const removeArrayItem = (index: number, type: 'weeklyMilestones' | 'resources') => {
        const newArray = formData[type].filter((_, i) => i !== index);
        setFormData({ ...formData, [type]: newArray.length ? newArray : [''] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const dataToSubmit = {
                ...formData,
                weeklyMilestones: formData.weeklyMilestones.filter(v => v.trim()),
                resources: formData.resources.filter(v => v.trim()),
            };

            if (id) {
                await axios.patch(`${backendUrl}/roadmaps/${id}`, dataToSubmit);
            } else {
                await axios.post(`${backendUrl}/roadmaps`, dataToSubmit);
            }
            navigate('/roadmaps');
        } catch (err: any) {
            console.error('Failed to save roadmap', err);
            setError(err.response?.data?.message || 'Failed to save roadmap');
        } finally {
            setLoading(false);
        }
    };

    if (loading && id) return <div className="container">Loading roadmap data...</div>;

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <h1 className="heading-xl">{id ? 'Edit Roadmap' : 'Upload New Roadmap'}</h1>

            <form onSubmit={handleSubmit} className="card">
                {error && <div style={{ color: 'var(--error-color)', marginBottom: '1rem' }}>{error}</div>}

                <div className="mb-4">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="e.g. Master NestJS Phase 1"
                    />
                </div>

                <div className="mb-4">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                    <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        placeholder="Frontend, Backend, etc."
                    />
                </div>

                <div className="mb-4">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        placeholder="Detailed overview of the roadmap..."
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="mb-8">
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Difficulty</label>
                        <select
                            value={formData.difficulty}
                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                            className="input"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
                        <select
                            value={formData.isActive ? 'active' : 'inactive'}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                            className="input"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Draft</option>
                        </select>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex-between mb-4">
                        <label style={{ fontWeight: '600' }}>Weekly Milestones</label>
                        <button type="button" onClick={() => addArrayItem('weeklyMilestones')} className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>
                            + Add Week
                        </button>
                    </div>
                    {formData.weeklyMilestones.map((milestone, index) => (
                        <div key={index} className="flex-between mb-2 gap-2">
                            <input
                                type="text"
                                value={milestone}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'weeklyMilestones')}
                                placeholder={`Week ${index + 1} milestone...`}
                            />
                            <button type="button" onClick={() => removeArrayItem(index, 'weeklyMilestones')} className="btn-icon" style={{ height: '42px' }}>
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <div className="flex-between mb-4">
                        <label style={{ fontWeight: '600' }}>Resources & Tools</label>
                        <button type="button" onClick={() => addArrayItem('resources')} className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>
                            + Add Resource
                        </button>
                    </div>
                    {formData.resources.map((resource, index) => (
                        <div key={index} className="flex-between mb-2 gap-2">
                            <input
                                type="text"
                                value={resource}
                                onChange={(e) => handleArrayChange(index, e.target.value, 'resources')}
                                placeholder="Documentation, course link, etc..."
                            />
                            <button type="button" onClick={() => removeArrayItem(index, 'resources')} className="btn-icon" style={{ height: '42px' }}>
                                🗑️
                            </button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Saving...' : id ? 'Update Roadmap' : 'Upload Roadmap'}
                </button>
            </form>
        </div>
    );
};

export default RoadmapEditor;
