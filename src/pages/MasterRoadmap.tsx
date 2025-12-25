import { useState } from 'react';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

interface Week {
    id: string;
    title: string;
    subtitle?: string;
    tasks: Task[];
    outcome: string;
}

interface Phase {
    id: string;
    number: number;
    medal: string;
    title: string;
    duration: string;
    theme: string;
    color: string;
    weeks: Week[];
}

const MasterRoadmap = () => {
    const [expandedPhases, setExpandedPhases] = useState<string[]>(['phase-1']);
    const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

    const phases: Phase[] = [
        {
            id: 'phase-1',
            number: 1,
            medal: '🥇',
            title: 'PERFORMANCE ENGINEER (FOUNDATION)',
            duration: '2–3 Weeks',
            theme: 'My APIs are fast, scalable, and intelligent',
            color: '#FFD700',
            weeks: [
                {
                    id: 'week-1',
                    title: 'WEEK 1 — N+1 Query Mastery',
                    subtitle: '⏱ 2–3 hours deep focus • ✍️ Notes after learning • 🧪 Small experiment daily',
                    tasks: [
                        { id: 'w1-1', text: 'Understand what N+1 problem really is (GraphQL context)', completed: false },
                        { id: 'w1-2', text: 'Identify N+1 in your existing FocusFlow GraphQL APIs', completed: false },
                        { id: 'w1-3', text: 'Trace resolver execution flow', completed: false },
                        { id: 'w1-4', text: 'Learn DataLoader fundamentals', completed: false },
                        { id: 'w1-5', text: 'Implement DataLoader in NestJS (request-scoped)', completed: false },
                        { id: 'w1-6', text: 'Test batching behavior', completed: false },
                        { id: 'w1-7', text: 'Compare API calls with vs without DataLoader', completed: false },
                    ],
                    outcome: 'I can explain N+1 confidently and fix it in real projects.',
                },
                {
                    id: 'week-2',
                    title: 'WEEK 2 — MongoDB Performance Engineering',
                    tasks: [
                        { id: 'w2-1', text: 'Learn MongoDB index internals (B-Tree concept)', completed: false },
                        { id: 'w2-2', text: 'Understand single vs compound indexes', completed: false },
                        { id: 'w2-3', text: 'Practice left-most index rule', completed: false },
                        { id: 'w2-4', text: 'Create indexes: userId + createdAt, email', completed: false },
                        { id: 'w2-5', text: 'Run explain() on slow queries', completed: false },
                        { id: 'w2-6', text: 'Compare query execution time: Without vs With index', completed: false },
                        { id: 'w2-7', text: 'Learn when indexes hurt performance', completed: false },
                        { id: 'w2-8', text: 'Optimize GraphQL queries based on index strategy', completed: false },
                    ],
                    outcome: 'I design queries knowing how MongoDB executes them.',
                },
                {
                    id: 'week-3',
                    title: 'WEEK 3 — API Optimization & Caching',
                    tasks: [
                        { id: 'w3-1', text: 'Learn GraphQL response shaping', completed: false },
                        { id: 'w3-2', text: 'Analyze over-fetching & under-fetching', completed: false },
                        { id: 'w3-3', text: 'Learn pagination performance trade-offs', completed: false },
                        { id: 'w3-4', text: 'Implement Redis basic caching', completed: false },
                        { id: 'w3-5', text: 'Cache read-heavy queries', completed: false },
                        { id: 'w3-6', text: 'Design cache invalidation logic', completed: false },
                        { id: 'w3-7', text: 'Measure API response improvements', completed: false },
                    ],
                    outcome: 'My APIs are production-ready, not tutorial-level.',
                },
            ],
        },
        {
            id: 'phase-2',
            number: 2,
            medal: '🥈',
            title: 'REAL-TIME & EVENT-DRIVEN SYSTEMS',
            duration: '2 Weeks',
            theme: 'My backend reacts in real time',
            color: '#C0C0C0',
            weeks: [
                {
                    id: 'week-4',
                    title: 'WEEK 4 — GraphQL Subscriptions',
                    tasks: [
                        { id: 'w4-1', text: 'Learn Pub/Sub concepts', completed: false },
                        { id: 'w4-2', text: 'Understand WebSockets vs polling', completed: false },
                        { id: 'w4-3', text: 'Setup GraphQL subscriptions in NestJS', completed: false },
                        { id: 'w4-4', text: 'Secure subscriptions with authentication', completed: false },
                        { id: 'w4-5', text: 'Implement real-time notifications in FocusFlow', completed: false },
                        { id: 'w4-6', text: 'Test concurrent clients', completed: false },
                    ],
                    outcome: 'I can build real-time GraphQL systems cleanly.',
                },
                {
                    id: 'week-5',
                    title: 'WEEK 5 — Event-Driven Architecture',
                    tasks: [
                        { id: 'w5-1', text: 'Learn events vs direct service calls', completed: false },
                        { id: 'w5-2', text: 'Understand domain events', completed: false },
                        { id: 'w5-3', text: 'Use NestJS EventEmitter', completed: false },
                        { id: 'w5-4', text: 'Convert one synchronous flow into event-based', completed: false },
                        { id: 'w5-5', text: 'Learn async background processing (conceptually)', completed: false },
                        { id: 'w5-6', text: 'Identify where events improve scalability', completed: false },
                    ],
                    outcome: 'My system is loosely coupled and scalable.',
                },
            ],
        },
        {
            id: 'phase-3',
            number: 3,
            medal: '🥉',
            title: 'CLEAN ARCHITECTURE & CODE EXCELLENCE',
            duration: '2–3 Weeks',
            theme: 'My codebase survives growth',
            color: '#CD7F32',
            weeks: [
                {
                    id: 'week-6',
                    title: 'WEEK 6 — Clean Architecture in NestJS',
                    tasks: [
                        { id: 'w6-1', text: 'Refactor modules into domains', completed: false },
                        { id: 'w6-2', text: 'Separate: Controllers, Use cases, Services', completed: false },
                        { id: 'w6-3', text: 'Learn DTO vs Entity boundaries', completed: false },
                        { id: 'w6-4', text: 'Reduce fat services', completed: false },
                        { id: 'w6-5', text: 'Apply architecture improvements to FocusFlow', completed: false },
                    ],
                    outcome: 'My code is readable even after months.',
                },
                {
                    id: 'week-7',
                    title: 'WEEK 7 — Advanced TypeScript',
                    tasks: [
                        { id: 'w7-1', text: 'Master generics', completed: false },
                        { id: 'w7-2', text: 'Learn utility types deeply', completed: false },
                        { id: 'w7-3', text: 'Practice mapped types', completed: false },
                        { id: 'w7-4', text: 'Improve type safety in GraphQL schemas', completed: false },
                        { id: 'w7-5', text: 'Eliminate any from critical paths', completed: false },
                    ],
                    outcome: 'TypeScript works for me, not against me.',
                },
            ],
        },
        {
            id: 'phase-4',
            number: 4,
            medal: '🧪',
            title: 'TESTING & RELIABILITY',
            duration: '1–2 Weeks',
            theme: 'I don\'t fear breaking production',
            color: '#22c55e',
            weeks: [
                {
                    id: 'week-8',
                    title: 'WEEK 8 — Testing Professional APIs',
                    tasks: [
                        { id: 'w8-1', text: 'Learn testing pyramid', completed: false },
                        { id: 'w8-2', text: 'Write unit tests for services', completed: false },
                        { id: 'w8-3', text: 'Test GraphQL resolvers', completed: false },
                        { id: 'w8-4', text: 'Setup integration tests', completed: false },
                        { id: 'w8-5', text: 'Mock MongoDB properly', completed: false },
                        { id: 'w8-6', text: 'Add test data factories', completed: false },
                    ],
                    outcome: 'I deploy confidently.',
                },
            ],
        },
        {
            id: 'phase-5',
            number: 5,
            medal: '🚀',
            title: 'SYSTEM DESIGN & INTERVIEW READINESS',
            duration: 'Ongoing (Parallel Phase)',
            theme: 'I think like a senior engineer',
            color: '#8b5cf6',
            weeks: [
                {
                    id: 'week-ongoing',
                    title: 'WEEKLY TASKS (Repeat)',
                    tasks: [
                        { id: 'wo-1', text: 'Design 1 backend system per week', completed: false },
                        { id: 'wo-2', text: 'Practice explaining: GraphQL scaling, Caching layers, Database design', completed: false },
                        { id: 'wo-3', text: 'Answer 1 system-design question out loud', completed: false },
                        { id: 'wo-4', text: 'Document learnings', completed: false },
                    ],
                    outcome: 'I speak with clarity and authority in interviews.',
                },
            ],
        },
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

    const getPhaseProgress = (phase: Phase) => {
        const allTasks = phase.weeks.flatMap(w => w.tasks);
        const completed = allTasks.filter(t => completedTasks.has(t.id)).length;
        return { completed, total: allTasks.length, percentage: allTasks.length ? Math.round((completed / allTasks.length) * 100) : 0 };
    };

    const getTotalProgress = () => {
        const allTasks = phases.flatMap(p => p.weeks.flatMap(w => w.tasks));
        const completed = allTasks.filter(t => completedTasks.has(t.id)).length;
        return { completed, total: allTasks.length, percentage: allTasks.length ? Math.round((completed / allTasks.length) * 100) : 0 };
    };

    const totalProgress = getTotalProgress();

    return (
        <div className="container master-roadmap-container">
            {/* Hero Section */}
            <div className="master-roadmap-hero">
                <div className="hero-glow"></div>
                <div className="hero-content">
                    <span className="hero-badge">🧠 Backend Engineer → Senior Level</span>
                    <h1 className="hero-title">
                        FOCUS FLOW<br />
                        <span className="gradient-text">MASTER ROADMAP</span>
                    </h1>
                    <p className="hero-subtitle">
                        No fluff. Action-only. Structured phases with weekly goals and daily tasks.
                    </p>

                    {/* Overall Progress */}
                    <div className="hero-progress">
                        <div className="progress-stats">
                            <span className="progress-label">Overall Progress</span>
                            <span className="progress-value">{totalProgress.completed} / {totalProgress.total} tasks</span>
                        </div>
                        <div className="progress-bar-container">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${totalProgress.percentage}%` }}
                            ></div>
                        </div>
                        <span className="progress-percentage">{totalProgress.percentage}%</span>
                    </div>
                </div>
            </div>

            {/* Phases */}
            <div className="phases-container">
                {phases.map((phase) => {
                    const isExpanded = expandedPhases.includes(phase.id);
                    const progress = getPhaseProgress(phase);

                    return (
                        <div
                            key={phase.id}
                            className={`phase-card ${isExpanded ? 'expanded' : ''}`}
                            style={{ '--phase-color': phase.color } as React.CSSProperties}
                        >
                            {/* Phase Header */}
                            <div
                                className="phase-header"
                                onClick={() => togglePhase(phase.id)}
                            >
                                <div className="phase-medal">{phase.medal}</div>
                                <div className="phase-info">
                                    <div className="phase-number">PHASE {phase.number}</div>
                                    <h2 className="phase-title">{phase.title}</h2>
                                    <div className="phase-meta">
                                        <span className="phase-duration">⏱ {phase.duration}</span>
                                        <span className="phase-theme">🎯 "{phase.theme}"</span>
                                    </div>
                                </div>
                                <div className="phase-right">
                                    <div className="phase-progress-ring">
                                        <svg viewBox="0 0 36 36">
                                            <path
                                                className="progress-ring-bg"
                                                d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                            <path
                                                className="progress-ring-fill"
                                                strokeDasharray={`${progress.percentage}, 100`}
                                                d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                            />
                                        </svg>
                                        <span className="progress-ring-text">{progress.percentage}%</span>
                                    </div>
                                    <span className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</span>
                                </div>
                            </div>

                            {/* Phase Content */}
                            {isExpanded && (
                                <div className="phase-content">
                                    {/* Timeline Connector */}
                                    <div className="timeline-line"></div>

                                    {phase.weeks.map((week) => (
                                        <div key={week.id} className="week-card">
                                            <div className="week-connector">
                                                <div className="week-dot"></div>
                                            </div>
                                            <div className="week-content">
                                                <div className="week-header">
                                                    <h3 className="week-title">📅 {week.title}</h3>
                                                    {week.subtitle && (
                                                        <p className="week-subtitle">{week.subtitle}</p>
                                                    )}
                                                </div>

                                                <div className="tasks-container">
                                                    <div className="tasks-header">
                                                        <span className="tasks-label">✅ TASKS</span>
                                                        <span className="tasks-count">
                                                            {week.tasks.filter(t => completedTasks.has(t.id)).length} / {week.tasks.length}
                                                        </span>
                                                    </div>
                                                    <ul className="tasks-list">
                                                        {week.tasks.map(task => (
                                                            <li
                                                                key={task.id}
                                                                className={`task-item ${completedTasks.has(task.id) ? 'completed' : ''}`}
                                                                onClick={() => toggleTask(task.id)}
                                                            >
                                                                <span className="task-checkbox">
                                                                    {completedTasks.has(task.id) ? '✓' : ''}
                                                                </span>
                                                                <span className="task-text">{task.text}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="outcome-box">
                                                    <span className="outcome-icon">📌</span>
                                                    <div className="outcome-content">
                                                        <span className="outcome-label">Outcome:</span>
                                                        <span className="outcome-text">"{week.outcome}"</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Psychiatrist Mode Section */}
            <div className="psychiatrist-section">
                <div className="psychiatrist-glow"></div>
                <div className="psychiatrist-content">
                    <h2 className="psychiatrist-title">
                        <span className="psychiatrist-icon">🧘</span>
                        PSYCHIATRIST MODE — FINAL RULES
                    </h2>
                    <p className="psychiatrist-subtitle">Your daily success formula</p>

                    <div className="rules-grid">
                        <div className="rule-card rule-dont">
                            <span className="rule-icon">❌</span>
                            <span className="rule-text">No random tutorials</span>
                        </div>
                        <div className="rule-card rule-dont">
                            <span className="rule-icon">❌</span>
                            <span className="rule-text">No stack hopping</span>
                        </div>
                        <div className="rule-card rule-do">
                            <span className="rule-icon">✔</span>
                            <span className="rule-text">One task → deep focus → completion</span>
                        </div>
                        <div className="rule-card rule-do">
                            <span className="rule-icon">✔</span>
                            <span className="rule-text">Log progress daily in FocusFlow</span>
                        </div>
                        <div className="rule-card rule-do">
                            <span className="rule-icon">✔</span>
                            <span className="rule-text">Weekly reflection (what improved?)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MasterRoadmap;
