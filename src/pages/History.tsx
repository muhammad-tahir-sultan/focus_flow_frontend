import { useState, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get<Log[]>('http://localhost:3000/daily-logs');
                setLogs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="heading-xl mb-8">Execution History</h2>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {logs.map(log => (
                    <div key={log._id} className="card">
                        <div className="flex-between mb-4">
                            <h3 className="heading-lg" style={{ marginBottom: 0 }}>
                                {new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </h3>
                            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-color)' }}>{log.timeSpent}h</span>
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
                {logs.length === 0 && <div className="text-sm" style={{ textAlign: 'center' }}>No logs yet.</div>}
            </div>
        </div>
    );
};

export default History;
