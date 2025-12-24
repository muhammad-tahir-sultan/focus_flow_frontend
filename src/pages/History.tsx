import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { backendUrl } from '../main';

interface Log {
    _id: string;
    date: string;
    timeSpent: number;
    description: string;
    reflection: string;
}

const History = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        try {
            const res = await axios.get<Log[]>(`${backendUrl}/daily-logs`);
            setLogs(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this log?')) return;
        try {
            await axios.delete(`${backendUrl}/daily-logs/${id}`);
            setLogs(logs.filter(log => log._id !== id));
        } catch (err) {
            console.error('Failed to delete log', err);
            alert('Failed to delete log');
        }
    };

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div style={{ width: '100%' }}>
            <div className="flex-between mb-8">
                <h2 className="heading-xl" style={{ margin: 0 }}>Execution History</h2>
                <Link to="/log" className="btn btn-primary">+ New Log</Link>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {logs.map(log => (
                    <div key={log._id} className="card">
                        <div className="flex-between mb-4">
                            <div>
                                <h3 className="heading-lg" style={{ marginBottom: 0 }}>
                                    {new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {new Date(log.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-color)' }}>{log.timeSpent}h</span>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link
                                        to={`/log/${log._id}`}
                                        className="btn-icon"
                                        title="Edit Log"
                                        style={{ color: 'var(--accent-color)', textDecoration: 'none' }}
                                    >
                                        ✏️
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(log._id)}
                                        className="btn-icon"
                                        title="Delete Log"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-sm" style={{ marginBottom: '0.25rem' }}>Execution</h4>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{log.description}</p>
                        </div>
                        <div>
                            <h4 className="text-sm" style={{ marginBottom: '0.25rem' }}>Reflection</h4>
                            <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>"{log.reflection}"</p>
                        </div>
                    </div>
                ))}
                {logs.length === 0 && <div className="text-sm" style={{ textAlign: 'center', padding: '2rem' }}>No logs yet.</div>}
            </div>
        </div>
    );
};

export default History;
