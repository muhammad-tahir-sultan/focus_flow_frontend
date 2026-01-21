import { useState } from 'react';
import { Link } from 'react-router-dom';
import { phases } from '../data/googleRoadmapData';
import '../styles/googleRoadmap.css';

const GoogleRoadmap = () => {
    const [expandedPhases, setExpandedPhases] = useState<string[]>(['phase-1']);
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

    const togglePhase = (phaseId: string) => {
        setExpandedPhases(prev =>
            prev.includes(phaseId)
                ? prev.filter(id => id !== phaseId)
                : [...prev, phaseId]
        );
    };

    const toggleTask = (taskId: string) => {
        setCompletedTasks(prev => {
            const newSet = new Set(prev);
            if (newSet.has(taskId)) {
                newSet.delete(taskId);
            } else {
                newSet.add(taskId);
            }
            return newSet;
        });
    };

    const getProgress = () => {
        const allTasks = phases.flatMap(p => p.tasks);
        const completed = allTasks.filter(t => completedTasks.has(t.id)).length;
        return {
            completed,
            total: allTasks.length,
            percentage: Math.round((completed / allTasks.length) * 100)
        };
    };

    const progress = getProgress();

    return (
        <div className="container google-roadmap-page">
            <div className="google-roadmap-hero">
                <div className="google-gradient-overlay"></div>
                <div className="hero-content">
                    <div className="google-logo-pill">
                        <span className="g-blue">G</span>
                        <span className="g-red">o</span>
                        <span className="g-yellow">o</span>
                        <span className="g-blue">g</span>
                        <span className="g-green">l</span>
                        <span className="g-red">e</span>
                        <span className="pill-text">L3 Roadmap 2025</span>
                    </div>
                    <h1 className="hero-title">From MERN to <span className="google-text">Silicon Valley</span></h1>
                    <p className="hero-desc">
                        A language-agnostic transition plan focusing on core fundamentals,
                        algorithmic mastery, and Google-scale engineering.
                    </p>

                    <div className="global-progress-card">
                        <div className="progress-info">
                            <span>Journey Completion</span>
                            <span>{progress.percentage}%</span>
                        </div>
                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: `${progress.percentage}%` }}
                            ></div>
                        </div>
                        <div className="progress-stats">
                            <span>{progress.completed} of {progress.total} milestones achieved</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="roadmap-grid">
                {phases.map((phase) => (
                    <div
                        key={phase.id}
                        className={`phase-container ${expandedPhases.includes(phase.id) ? 'active' : ''}`}
                        style={{ '--phase-color': phase.color } as React.CSSProperties}
                    >
                        <div className="phase-header" onClick={() => togglePhase(phase.id)}>
                            <div className="phase-number-box">
                                <span>{phase.number}</span>
                            </div>
                            <div className="phase-titles">
                                <h3>{phase.title}</h3>
                                <span>{phase.duration} • {phase.theme}</span>
                            </div>
                            <div className="phase-chevron">
                                <span>{expandedPhases.includes(phase.id) ? '−' : '+'}</span>
                            </div>
                        </div>

                        {expandedPhases.includes(phase.id) && (
                            <div className="phase-body">
                                <p className="phase-details">{phase.details}</p>
                                <div className="tasks-list">
                                    {phase.tasks.map(task => (
                                        <div
                                            key={task.id}
                                            className={`google-task-item ${completedTasks.has(task.id) ? 'done' : ''}`}
                                            onClick={() => toggleTask(task.id)}
                                        >
                                            <div className="task-check">
                                                {completedTasks.has(task.id) && <span className="check-mark">✓</span>}
                                            </div>
                                            <div className="task-content">
                                                <span className="task-label">{task.text}</span>
                                                {task.resources && task.resources.length > 0 && (
                                                    <div className="task-resources">
                                                        {task.resources.map((res, idx) => (
                                                            <a
                                                                key={idx}
                                                                href={res.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className={`resource-link ${res.type}`}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <span className="res-icon">
                                                                    {res.type === 'video' ? '📺' :
                                                                        res.type === 'article' ? '📝' :
                                                                            res.type === 'practice' ? '🧪' : '📚'}
                                                                </span>
                                                                {res.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="interview-process-sidebar">
                <div className="premium-box">
                    <h3>2025 Interview Process Overview</h3>
                    <div className="process-timeline">
                        <div className="process-step">
                            <div className="step-point"></div>
                            <div className="step-info">
                                <h4>Online Assessment</h4>
                                <p>60–90 mins • 2–3 Algorithmic problems</p>
                            </div>
                        </div>
                        <div className="process-step">
                            <div className="step-point"></div>
                            <div className="step-info">
                                <h4>Technical Phone Screen</h4>
                                <p>1–2 rounds • 45 mins each • DSA focus</p>
                            </div>
                        </div>
                        <div className="process-step">
                            <div className="step-point"></div>
                            <div className="step-info">
                                <h4>Virtual Onsite Loop</h4>
                                <p>4–5 rounds • DSA, System Design, Googliness</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Pivot Section */}
            <div className="google-pivot-section">
                <div className="pivot-card">
                    <div className="pivot-icon">💡</div>
                    <div className="pivot-content">
                        <h3>A Higher Perspective?</h3>
                        <p>If you're realizing that Google isn't the final bet, but building is.</p>
                        <Link to="/next-path" className="pivot-link">
                            VIEW THE BETTER PATH →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleRoadmap;
