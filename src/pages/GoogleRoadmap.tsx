import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Resource {
    name: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'practice';
}

interface Task {
    id: string;
    text: string;
    completed: boolean;
    resources?: Resource[];
}

interface Phase {
    id: string;
    number: number;
    title: string;
    duration: string;
    theme: string;
    color: string;
    tasks: Task[];
    details?: string;
}

const GoogleRoadmap = () => {
    const [expandedPhases, setExpandedPhases] = useState<string[]>(['phase-1']);
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

    const phases: Phase[] = [
        {
            id: 'phase-1',
            number: 1,
            title: 'Foundations: Algorithmic Mastery',
            duration: 'Months 1–3',
            theme: 'Problem Solving & DSA Fundamentals',
            color: '#4285F4', // Google Blue
            tasks: [
                {
                    id: 'p1-1', text: 'Master a Core Interview Language (C++, Java, or Python)', completed: false,
                    resources: [
                        { name: 'NeetCode - Language Roadmaps', url: 'https://neetcode.io/roadmap', type: 'video' },
                        { name: 'HackerRank - Language Proficiency', url: 'https://www.hackerrank.com/domains/cpp', type: 'practice' }
                    ]
                },
                {
                    id: 'p1-2', text: 'DSA: Advanced Data Structures (Graphs, Heaps, Disjoint Sets, Tries)', completed: false,
                    resources: [
                        { name: 'Striver - Graph Series', url: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/', type: 'article' },
                        { name: 'William Fiset - Graph Theory', url: 'https://www.youtube.com/@williamfiset', type: 'video' }
                    ]
                },
                {
                    id: 'p1-3', text: 'DSA: Algorithmic Patterns (DP, Backtracking, Sliding Window)', completed: false,
                    resources: [
                        { name: 'Abdul Bari - Dynamic Programming', url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkfEt-69KS1FbQWBALG_3', type: 'video' },
                        { name: 'Grokking the Coding Interview Patterns', url: 'https://www.designgurus.io/course/grokking-the-coding-interview', type: 'article' }
                    ]
                },
                {
                    id: 'p1-4', text: 'DSA: Search & Traversal (BFS, DFS)', completed: false,
                    resources: [
                        { name: 'MIT 6.006 - BFS/DFS Explained', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/lecture-13-breadth-first-search-bfs/', type: 'video' }
                    ]
                },
                {
                    id: 'p1-5', text: 'Practice: Solve 300+ LeetCode problems (Google Top 100 list)', completed: false,
                    resources: [
                        { name: 'LeetCode - Google Top 100', url: 'https://leetcode.com/problemset/all/?listId=wp9o7m8', type: 'practice' }
                    ]
                },
            ],
            details: 'Google prioritizes deep mastery of DSA over specific frameworks. JavaScript is acceptable, but C++, Java, or Python often have more robust standard libraries for complex problems.'
        },
        {
            id: 'phase-2',
            number: 2,
            title: 'MERN to "Google-Scale"',
            duration: 'Months 4–5',
            theme: 'Scalability, Performance & System Design',
            color: '#EA4335', // Google Red
            tasks: [
                {
                    id: 'p2-1', text: 'System Design (L3): Object-Oriented Design & Component Interaction', completed: false,
                    resources: [
                        { name: 'Gaurav Sen - System Design Fundamentals', url: 'https://www.youtube.com/@GauravSen', type: 'video' },
                        { name: 'ByteByteGo - L3 System Design', url: 'https://bytebytego.com/', type: 'article' }
                    ]
                },
                {
                    id: 'p2-2', text: 'Deep Dive: MongoDB internals (Concurrency, NoSQL vs SQL trade-offs)', completed: false,
                    resources: [
                        { name: 'MongoDB - Concurrency Internals', url: 'https://www.mongodb.com/docs/manual/faq/concurrency/', type: 'documentation' },
                        { name: 'Hussein Nasser - DB Concurrency', url: 'https://www.youtube.com/watch?v=FjIuNfVqV-w', type: 'video' }
                    ]
                },
                {
                    id: 'p2-3', text: 'Optimization: Enhance Node.js API to handle high traffic', completed: false,
                    resources: [
                        { name: 'Node.js Event Loop - Deep Dive', url: 'https://nodesource.com/blog/understanding-the-nodejs-event-loop/', type: 'article' },
                        { name: 'Node.js - Performance Best Practices', url: 'https://nodejs.org/en/docs/guides/simple-profiling/', type: 'documentation' }
                    ]
                },
                {
                    id: 'p2-5', text: 'Portfolio: Quantify achievements (e.g., "improved speed by 30% for 5K users")', completed: false,
                    resources: [
                        { name: 'Google Students - Resume Tips', url: 'https://www.youtube.com/watch?v=uK4zBqVpQ3g', type: 'video' }
                    ]
                },
            ],
            details: 'Leverage your MERN experience by showing you understand how systems scale. It\'s not about using libraries, but understanding the "Why" behind architectural choices.'
        },
        {
            id: 'phase-3',
            number: 3,
            title: 'Interview Preparation',
            duration: 'Month 6',
            theme: 'Execution & "Googliness"',
            color: '#FBBC05', // Google Yellow
            tasks: [
                {
                    id: 'p3-1', text: 'Google Docs Coding: Practice writing code without IDE/Auto-complete', completed: false,
                    resources: [
                        { name: 'Google Students - Tech Interview Guide', url: 'https://www.youtube.com/watch?v=XKu_SEDAykw', type: 'video' }
                    ]
                },
                {
                    id: 'p3-2', text: 'STAR Method: Prepare 3–5 stories for behavioral rounds', completed: false,
                    resources: [
                        { name: 'Google Careers - How we hire', url: 'https://careers.google.com/how-we-hire/interview/', type: 'article' }
                    ]
                },
                {
                    id: 'p3-3', text: 'Mock Interviews: Use Pramp or Interviewing.io', completed: false,
                    resources: [
                        { name: 'Pramp - Free Peer Interviews', url: 'https://www.pramp.com/', type: 'practice' },
                        { name: 'Interviewing.io - Mock Rounds', url: 'https://interviewing.io/', type: 'practice' }
                    ]
                },
            ],
            details: 'Precision in communication and code quality are key. Practice explaining your thought process out loud while coding in a plain document.'
        },
        {
            id: 'phase-4',
            number: 4,
            title: 'Application Strategy',
            duration: 'Final Phase',
            theme: 'Referrals & Targeting L3 Roles',
            color: '#34A853', // Google Green
            tasks: [
                {
                    id: 'p4-1', text: 'Networking: Secure a referral from a current Google employee', completed: false,
                    resources: [
                        { name: 'How to get Google Referrals', url: 'https://www.teamblind.com/', type: 'article' }
                    ]
                },
                {
                    id: 'p4-3', text: 'Targeting: Apply for "Software Engineer, University Graduate" or L3 roles', completed: false,
                    resources: [
                        { name: 'Google Careers - Entry Level SDE', url: 'https://www.google.com/about/careers/applications/jobs/results/?q=software%20engineer%20early%20career', type: 'documentation' }
                    ]
                },
            ],
            details: 'Referrals increase your odds significantly (90% of candidates without referrals don\'t make it past screening).'
        }
    ];

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

            <style>{`
                .google-pivot-section {
                    margin-top: 5rem;
                    padding: 0 1rem;
                }

                .pivot-card {
                    max-width: 900px;
                    margin: 0 auto;
                    background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
                    border: 1px solid #312e81;
                    border-radius: 24px;
                    padding: 3rem;
                    display: flex;
                    gap: 2.5rem;
                    align-items: center;
                }

                .pivot-icon {
                    font-size: 3rem;
                }

                .pivot-content h3 {
                    font-size: 1.5rem;
                    font-weight: 800;
                    margin: 0 0 0.5rem 0;
                    color: #fff;
                }

                .pivot-content p {
                    color: #a1a1aa;
                    margin: 0 0 1.5rem 0;
                    font-size: 1.1rem;
                }

                .pivot-link {
                    display: inline-block;
                    background: #fff;
                    color: #000;
                    padding: 0.75rem 1.5rem;
                    border-radius: 99px;
                    font-weight: 800;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .pivot-link:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(255,255,255,0.1);
                    background: #f4f4f5;
                }
                .google-roadmap-page {
                    padding-bottom: 5rem;
                }

                .google-roadmap-hero {
                    position: relative;
                    padding: 4rem 0;
                    margin-bottom: 3rem;
                    text-align: center;
                    border-radius: 24px;
                    overflow: hidden;
                    background: #121212;
                    border: 1px solid #222;
                }

                .google-gradient-overlay {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle at 70% 20%, rgba(66, 133, 244, 0.1) 0%, transparent 40%),
                                radial-gradient(circle at 30% 80%, rgba(52, 168, 83, 0.1) 0%, transparent 40%);
                    pointer-events: none;
                }

                .google-logo-pill {
                    display: inline-flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.5rem 1.25rem;
                    border-radius: 100px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-bottom: 1.5rem;
                    gap: 0.2rem;
                    font-weight: 700;
                    font-size: 1.1rem;
                }

                .pill-text {
                    margin-left: 0.5rem;
                    color: #aaa;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .g-blue { color: #4285F4; }
                .g-red { color: #EA4335; }
                .g-yellow { color: #FBBC05; }
                .g-green { color: #34A853; }

                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    letter-spacing: -0.03em;
                }

                .google-text {
                    background: linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .hero-desc {
                    color: #888;
                    max-width: 600px;
                    margin: 0 auto 2.5rem;
                    font-size: 1.2rem;
                }

                .global-progress-card {
                    max-width: 500px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.03);
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .progress-info {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                .progress-track {
                    height: 8px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 0.75rem;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #4285F4, #34A853);
                    transition: width 0.5s ease-out;
                }

                .progress-stats {
                    font-size: 0.8rem;
                    color: #666;
                    text-align: left;
                }

                .roadmap-grid {
                    display: grid;
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }

                .phase-container {
                    background: #1a1a1a;
                    border: 1px solid #27272a;
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .phase-container.active {
                    border-color: var(--phase-color);
                    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
                }

                .phase-header {
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    gap: 1.25rem;
                }

                .phase-number-box {
                    width: 40px;
                    height: 40px;
                    background: var(--phase-color);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    color: white;
                    flex-shrink: 0;
                }

                .phase-titles h3 {
                    margin: 0;
                    font-size: 1.25rem;
                }

                .phase-titles span {
                    font-size: 0.85rem;
                    color: #666;
                }

                .phase-chevron {
                    margin-left: auto;
                    font-size: 1.5rem;
                    color: #444;
                }

                .phase-body {
                    padding: 0 1.5rem 1.5rem 4.75rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding-top: 1.5rem;
                }

                .phase-details {
                    color: #999;
                    font-size: 0.95rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .google-task-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.02);
                    margin-bottom: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    border: 1px solid transparent;
                }

                .google-task-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1);
                }

                .google-task-item.done {
                    opacity: 0.6;
                }

                .task-check {
                    width: 20px;
                    height: 20px;
                    border: 2px solid #333;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .google-task-item.done .task-check {
                    background: var(--phase-color);
                    border-color: var(--phase-color);
                }

                .check-mark {
                    color: white;
                    font-size: 0.8rem;
                }

                .task-content {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .task-label {
                    font-size: 0.95rem;
                    font-weight: 500;
                    line-height: 1.4;
                }

                .task-resources {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                    margin-top: 0.25rem;
                }

                .resource-link {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.35rem 0.6rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 6px;
                    font-size: 0.8rem;
                    color: #aaa;
                    text-decoration: none;
                    transition: all 0.2s;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .resource-link:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    border-color: var(--phase-color);
                    transform: translateY(-1px);
                }

                .res-icon {
                    font-size: 0.9rem;
                }

                .google-task-item.done .task-label {
                    text-decoration: line-through;
                }

                .interview-process-sidebar {
                    margin-top: 2rem;
                }

                .premium-box {
                    background: linear-gradient(180deg, #1a1a1a 0%, #111 100%);
                    border: 1px solid #27272a;
                    border-radius: 20px;
                    padding: 2rem;
                }

                .premium-box h3 {
                    margin-bottom: 1.5rem;
                    font-size: 1.4rem;
                }

                .process-timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .process-step {
                    display: flex;
                    gap: 1.25rem;
                    position: relative;
                }

                .process-step:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    left: 7px;
                    top: 24px;
                    bottom: -16px;
                    width: 2px;
                    background: #333;
                }

                .step-point {
                    width: 16px;
                    height: 16px;
                    background: #444;
                    border-radius: 50%;
                    margin-top: 4px;
                    flex-shrink: 0;
                    z-index: 1;
                }

                .step-info h4 {
                    margin: 0 0 0.25rem 0;
                    font-size: 1.1rem;
                }

                .step-info p {
                    margin: 0;
                    font-size: 0.9rem;
                    color: #777;
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.25rem;
                    }
                    .hero-desc {
                        font-size: 1rem;
                    }
                    .phase-body {
                        padding-left: 1.5rem;
                    }
                    .phase-header {
                        padding: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default GoogleRoadmap;
