// ------------------- PRECISION VISION ROADMAP (PREMIUM V5 - FULL QUARTER DEEP DIVE) -------------------

import { useEffect, useState } from 'react';

interface Resource {
    name: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'book';
}

interface WeekContent {
    title: string;
    focus: string;
    tasks: string[];
    lab: string;
}

interface PhaseContent {
    title: string;
    focus: string;
    concepts: string[];
    application: string[];
    resources: Resource[];
    weeks?: WeekContent[];
}

const PHASES: Record<string, PhaseContent> = {
    month1: {
        title: "MONTH 1: THE PERFORMANCE ENGINEER",
        focus: "From 'It works' to 'It flies'. Deep database & runtime mastery.",
        concepts: [
            "Database Internals: B-Trees, Heap Files, WAL",
            "Query Planning: Index Selectivity, Scans vs Seeks",
            "Advanced Caching: Cache Penetration, Stampedes, Invalidation",
            "Runtime Loop: Node.js Event Loop phases deep dive"
        ],
        application: [
            "Add 'EXPLAIN ANALYZE' support to your local dev environment",
            "Identify & fix 3 N+1 issues in FocusFlow using logging",
            "Implement a 'stale-while-revalidate' caching strategy",
            "Reduce one API endpoint latency by 50%"
        ],
        resources: [
            { name: 'Use The Index, Luke! (Bible of DBs)', url: 'https://use-the-index-luke.com/', type: 'documentation' },
            { name: 'Node.js Event Loop Visualized', url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ', type: 'video' },
            { name: 'Postgres Architecture Guide', url: 'https://www.interdb.jp/pg/', type: 'documentation' },
            { name: 'Redis Anti-Patterns', url: 'https://redis.com/blog/5-redis-anti-patterns/', type: 'article' }
        ],
        weeks: [
            {
                title: "WEEK 1: Database Internals (The Physics)",
                focus: "You cannot optimize what you do not understand. Stop guessing.",
                tasks: [
                    "Study B-Tree structure: Root, internal nodes, leaves",
                    "Understand Random I/O vs Sequential I/O costs",
                    "Learn the 'Left-Most Prefix' rule for compound indexes",
                    "Master the ESR Rule (Equality, Sort, Range)"
                ],
                lab: "Create a script to insert 1M rows into MongoDB. Compare query time: No Index vs Single Index vs Compound Index."
            },
            {
                title: "WEEK 2: Query Execution & Analysis",
                focus: "Learning to read the database's mind (Explain Plans).",
                tasks: [
                    "Master `explain('executionStats')` output",
                    "Identify 'Collection Scan' vs 'Index Scan'",
                    "Understand Selectivity & Cardinality impact",
                    "Detect N+1 queries in logs without generic tools"
                ],
                lab: "Audit all FocusFlow dashboard queries. Optimize the slowest one by covering the query with a specific index."
            },
            {
                title: "WEEK 3: Node.js Runtime Performance",
                focus: "The bottleneck isn't always the DB. It's often your JSON parsing and Event Loop blocking.",
                tasks: [
                    "Deep dive: libuv thread pool & async I/O",
                    "Blocking the Event Loop: JSON.parse, Cryptography",
                    "Streams vs Buffers (Memory management)",
                    "Profiling with 0x or Chrome DevTools"
                ],
                lab: "Profile the 'Daily Log' export feature. Refactor it to use Node.js Streams to prevent memory spikes."
            },
            {
                title: "WEEK 4: Advanced Caching Strategy",
                focus: "Caching is easy. Invalidation is the hard part.",
                tasks: [
                    "Cache-Aside pattern implementation",
                    "Stampede protection (Probabilistic early expiration)",
                    "Redis Data Structures: HyperLogLog for counting",
                    "HTTP Caching headers (ETag, Last-Modified)"
                ],
                lab: "Implement Redis caching for the 'Stats' endpoint. Add logic to invalidate cache ONLY when relevant data changes."
            }
        ]
    },
    month2: {
        title: "MONTH 2: THE SCALABILITY ARCHITECT",
        focus: "Preparing for the users you don't have yet. Statelessness & Queues.",
        concepts: [
            "Horizontal Scaling: Load Balancers (L4 vs L7)",
            "Asynchronous Processing: Message Queues, Idempotency",
            "Database Scaling: Connection Pooling, Read Replicas",
            "State Management: JWT vs Sessions in distributed systems"
        ],
        application: [
            "Move email/notification logic to a BullMQ background worker",
            "Dockerize FocusFlow to verify statelessness (run 3 replicas)",
            "Implement a Rate Limiter using Redis (Sliding Window)",
            "Simulate high load using Apache Bench or k6"
        ],
        resources: [
            { name: 'Designing Data-Intensive Apps (Summary)', url: 'https://github.com/vonheikemen/ddia-reading-notes', type: 'book' },
            { name: 'System Design: Rate Limiting', url: 'https://stripe.com/blog/rate-limiters', type: 'article' },
            { name: 'Nginx Load Balancing Guide', url: 'https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/', type: 'documentation' },
            { name: 'Distributed Systems for Fun and Profit', url: 'http://book.mixu.net/distsys/single-page.html', type: 'book' }
        ],
        weeks: [
            {
                title: "WEEK 1: Zero State & Horizontal Scaling",
                focus: "Treat servers like cattle, not pets. If one dies, no user should notice.",
                tasks: [
                    "Refactor in-memory state (sessions, variables) to Redis",
                    "Understand Logical vs Physical Architectures",
                    "Load Balancing algorithms (Round Robin vs Least Conn)",
                    "Session Stickiness concepts (and why to avoid them)"
                ],
                lab: "Dockerize FocusFlow and run 3 replicas locally. Put Nginx in front to balance traffic. Kill one replica and ensure persistence."
            },
            {
                title: "WEEK 2: Asynchronous Messaging (Queues)",
                focus: "Decoupling is the secret to scaling writes.",
                tasks: [
                    "Producer-Consumer pattern fundamentals",
                    "Handling job failures & dead-letter queues (DLQ)",
                    "Idempotency: Processing the same job twice without side effects",
                    "Redis streams vs BullMQ vs RabbitMQ (Conceptual)"
                ],
                lab: "Move the 'Calculate Weekly Stats' logic to a background job using BullMQ. Trigger it via API but process it asynchronously."
            },
            {
                title: "WEEK 3: Database Scaling Patterns",
                focus: "The database is usually the first thing to fall over.",
                tasks: [
                    "Connection Pooling limits & configuration",
                    "Read Replicas: Eventual Consistency trade-offs",
                    "Sharding: Concept only (Architecture vs Implementation)",
                    "Database locks & transaction isolation levels"
                ],
                lab: "Simulate max connections error by bombarding the DB. Then implement Prisma connection pooling to gracefully queue requests."
            },
            {
                title: "WEEK 4: Defensive Engineering",
                focus: "Protecting your system from malicious or accidental surges.",
                tasks: [
                    "Rate Limiting algorithms (Token Bucket, Sliding Window)",
                    "Load Shedding principles",
                    "DoS protection basics",
                    "Graceful degradation strategies"
                ],
                lab: "Implement a sliding-window rate limiter in NestJS (Guard + Redis). Write a script to attack it and verify 429 responses."
            }
        ]
    },
    month3: {
        title: "MONTH 3: THE SYSTEM THINKER",
        focus: "Building systems that survive failure. Reliability & Observability.",
        concepts: [
            "Reliability Patterns: Circuit Breakers, Bulkheads, Retries",
            "Observability: Distinct Structured Logging, Tracing IDs",
            "API Evolution: Backward compatibility, Contract testing",
            "Security: OWASP Top 10 for APIs (Deep Dive)"
        ],
        application: [
            "Add a visible 'Circuit Breaker' state to a flaky external API call",
            "Implement Request IDs (X-Request-ID) across all logs",
            "Write a 'Pre-Mortem' document for FocusFlow's launch",
            "Create a health-check endpoint that checks DB/Redis connectivity"
        ],
        resources: [
            { name: 'Google SRE Book (Reliability)', url: 'https://sre.google/sre-book/table-of-contents/', type: 'book' },
            { name: 'Chaos Engineering Principles', url: 'https://principlesofchaos.org/', type: 'documentation' },
            { name: 'The Twelve-Factor App', url: 'https://12factor.net/', type: 'documentation' },
            { name: 'RESTful API Design', url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design', type: 'documentation' }
        ],
        weeks: [
            {
                title: "WEEK 1: Reliability Patterns",
                focus: "Assume everything will fail. Network, Disk, 3rd Party APIs.",
                tasks: [
                    "Circuit Breaker pattern (Open, Closed, Half-Open)",
                    "Retry Strategies: Exponential Backoff + Jitter",
                    "Bulkhead pattern (Isolating failures)",
                    "Timeouts: The most important config you forget"
                ],
                lab: "Wrap an external API call (e.g., AI service) in a Circuit Breaker. Simulate network failure and verify it 'opens' to stop traffic."
            },
            {
                title: "WEEK 2: Observability & Tracing",
                focus: "Debugging without a debugger. Knowing 'why' it broke in production.",
                tasks: [
                    "Structured Logging (JSON vs Text)",
                    "Distributed Tracing (Trace ID, Span ID)",
                    "Metric types: Counter, Gauge, Histogram",
                    "The Three Pillars: Logs, Metrics, Traces"
                ],
                lab: "Add a 'X-Request-ID' middleware. Ensure this ID flows from API -> Logs -> DB Queries -> Error Responses."
            },
            {
                title: "WEEK 3: API Evolution & Contracts",
                focus: "How to change code without breaking 10,000 users.",
                tasks: [
                    "Semantic Versioning in APIs",
                    "Backward Compatibility strategies (Expand & Contract)",
                    "Deprecation headers and sunsetting policies",
                    "Consumer-Driven Contracts (Pact concepts)"
                ],
                lab: "Modify a core API response format. Support BOTH the old format and new format simultaneously for a transition period."
            },
            {
                title: "WEEK 4: Production Readiness",
                focus: "The checklist between 'Works on my machine' and 'Works while I sleep'.",
                tasks: [
                    "Graceful Shutdowns (SIGTERM handling)",
                    "Health Checks: Liveness vs Readiness probes",
                    "Security Headers (Helmet, CORS policies)",
                    "OWASP Top 10 for APIs audit"
                ],
                lab: "Implement a `/health/deep` endpoint that actually queries the DB and Redis. Configure Graceful Shutdown to finish active requests."
            }
        ]
    }
};

const NextPath = () => {
    // Seniority Score State with Persistence
    const [score, setScore] = useState(() => {
        const saved = localStorage.getItem('seniority_score');
        return saved ? parseInt(saved, 10) : 35;
    });

    // Save score whenever it changes
    useEffect(() => {
        localStorage.setItem('seniority_score', score.toString());
    }, [score]);

    const handleIncreaseScore = (amount: number) => {
        const newScore = Math.min(score + amount, 100);
        setScore(newScore);
    };

    const [expandedMonth, setExpandedMonth] = useState<string | null>('month1'); // Default expanded Month 1

    const renderResources = (phaseKey: string) => (
        <div className="res-mini-grid">
            {PHASES[phaseKey].resources.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className={`res-mini-tag ${res.type}`}>
                    <span className="res-mini-icon">
                        {res.type === 'video' ? '📺' : res.type === 'article' ? '📝' : res.type === 'book' ? '📖' : '📚'}
                    </span>
                    {res.name}
                </a>
            ))}
        </div>
    );

    return (
        <div className="next-path-page">
            <div className="path-glow"></div>
            <div className="grid-overlay"></div>

            <div className="path-container">
                {/* Header Section */}
                <header className="path-header">
                    <div className="reveal-anim">
                        <span className="path-badge">PRECISION + REALITY</span>
                        <h1 className="path-title">YOUR CORRECTED PATH</h1>
                        <div className="path-subtitle">Eliminate curiosity. Embrace intent.</div>
                    </div>
                </header>

                {/* The "Seniority Index" - Scoring Track */}
                <section className="score-section reveal-anim" style={{ animationDelay: '0.1s' }}>
                    <div className="score-card">
                        <div className="score-header">
                            <h3>SENIORITY INDEX</h3>
                            <span className="score-val">{score}/100</span>
                        </div>
                        <div className="score-track-container">
                            <div className="score-labels">
                                <span>Code Monkey</span>
                                <span>Developer</span>
                                <span className="target-label">Engineer (Target)</span>
                                <span>Architect</span>
                            </div>
                            <div className="score-bar-bg">
                                <div className="score-bar-fill" style={{ width: `${score}%` }}>
                                    <div className="score-light"></div>
                                </div>
                                <div className="milestone m1" style={{ left: '25%' }}></div>
                                <div className="milestone m2" style={{ left: '50%' }}></div>
                                <div className="milestone m3" style={{ left: '75%' }}></div>
                            </div>
                        </div>
                        <div className="score-tasks">
                            <p>Tap to log progress:</p>
                            <div className="task-tags">
                                <button onClick={() => handleIncreaseScore(5)}>+5 Fix N+1 Issue</button>
                                <button onClick={() => handleIncreaseScore(10)}>+10 Write Design Doc</button>
                                <button onClick={() => handleIncreaseScore(15)}>+15 Optimize Latency</button>
                                <button onClick={() => handleIncreaseScore(20)}>+20 Mentor Junior</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Principle */}
                <section className="vision-statement reveal-anim" style={{ animationDelay: '0.2s' }}>
                    <div className="vision-card premium-glass">
                        <div className="core-principle-section">
                            <div className="principle-shimmer"></div>
                            <h3>THE INTENTIONALITY FILTER</h3>
                            <p>Ignore everything that doesn't serve <strong>at least 2</strong> of these:</p>
                            <div className="principle-grid">
                                <div className="principle-box">
                                    <div className="p-icon">🏢</div>
                                    <span className="p-text">Current Job</span>
                                </div>
                                <div className="principle-box">
                                    <div className="p-icon">🛠️</div>
                                    <span className="p-text">FocusFlow</span>
                                </div>
                                <div className="principle-box">
                                    <div className="p-icon">🗣️</div>
                                    <span className="p-text">Senior Conversations</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Expanded Month-by-Month Phases */}
                <section className="phases-expanded">
                    {Object.entries(PHASES).map(([key, data], index) => (
                        <div key={key} className={`month-card reveal-anim ${expandedMonth === key ? 'active-month' : ''}`} style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}>
                            <div className="month-sidebar" onClick={() => setExpandedMonth(expandedMonth === key ? null : key)}>
                                <div className="month-idx">0{index + 1}</div>
                                <div className="month-timeline-line"></div>
                            </div>
                            <div className="month-content">
                                <div className="month-header" onClick={() => setExpandedMonth(expandedMonth === key ? null : key)} style={{ cursor: 'pointer' }}>
                                    <div className="flex justify-between items-center w-full">
                                        <div>
                                            <h2>{data.title}</h2>
                                            <p className="month-focus">{data.focus}</p>
                                        </div>
                                        {data.weeks && (
                                            <span className="expand-btn">{expandedMonth === key ? '−' : '+'}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="month-body">
                                    {/* Monthly High Level */}
                                    <div className="concept-list">
                                        <h4>🧠 CORE CONCEPTS</h4>
                                        <ul>
                                            {data.concepts.map((c, i) => <li key={i}>{c}</li>)}
                                        </ul>
                                    </div>
                                    <div className="app-list">
                                        <h4>⚡ APPLY TO FOCUSFLOW</h4>
                                        <ul>
                                            {data.application.map((a, i) => <li key={i}>{a}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                {/* Deep Dive Weeks (Only if Expanded) */}
                                {data.weeks && expandedMonth === key && (
                                    <div className="weekly-deep-dive">
                                        <h3 className="dive-header">WEEK-BY-WEEK EXECUTION</h3>
                                        <div className="weeks-grid">
                                            {data.weeks.map((week, wIdx) => (
                                                <div key={wIdx} className="week-card-premium">
                                                    <div className="week-card-header">
                                                        <span className="week-badge">WEEK {wIdx + 1}</span>
                                                    </div>
                                                    <h5>{week.title}</h5>
                                                    <p className="week-focus">{week.focus}</p>

                                                    <div className="week-tasks">
                                                        {week.tasks.map((t, ti) => (
                                                            <div key={ti} className="task-row">
                                                                <span className="check-circle"></span>
                                                                <span>{t}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="lab-box">
                                                        <span className="lab-icon">🧪</span>
                                                        <div className="lab-content">
                                                            <strong>FOCUSFLOW LAB:</strong>
                                                            <p>{week.lab}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="month-footer">
                                    <h4>📚 PREMIUM RESOURCES</h4>
                                    {renderResources(key)}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Final Truth */}
                <section className="truth-section-v2 reveal-anim" style={{ animationDelay: '0.6s' }}>
                    <div className="truth-glass-card">
                        <div className="truth-orb"></div>
                        <div className="truth-content">
                            <h3>PRECISION OVER VOLUME</h3>
                            <p>You don't need to learn more. You need to learn <strong>sharper</strong>.</p>
                            <div className="truth-footer">
                                <span>COMPLEMENTS THE OFFICE</span>
                                <span className="dot"></span>
                                <span>DIFFICULT TO REPLACE</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                .next-path-page {
                    min-height: 100vh;
                    background: #020203;
                    color: #fff;
                    padding: 6rem 2rem;
                    position: relative;
                    overflow-x: hidden;
                    font-family: 'Inter', system-ui, sans-serif; /* Body font for readability */
                }

                h1, h2, h3, h4, 
                .path-title, .month-idx, .score-val, .week-badge, 
                .dive-header, .path-badge, .vision-tag, .expand-btn,
                .pillar-index, .truth-content, .truth-footer,
                .lab-content strong {
                    font-family: 'Outfit', sans-serif; /* Display font for UI elements */
                }

                .path-glow {
                    position: fixed; top: -20%; left: 50%;
                    transform: translateX(-50%); width: 120vw; height: 100vh;
                    background: radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 60%);
                    pointer-events: none; z-index: 0;
                }

                .grid-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 50px 50px; z-index: 0; pointer-events: none;
                }

                .path-container {
                    max-width: 1000px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .reveal-anim { animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; transform: translateY(30px); }
                @keyframes reveal { to { transform: translateY(0); opacity: 1; } }

                /* Header */
                .path-header { text-align: center; margin-bottom: 6rem; }
                .path-badge {
                    display: inline-block; background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px);
                    color: #60a5fa; padding: 0.6rem 1.5rem; border-radius: 100px; font-weight: 700; font-size: 0.75rem;
                    letter-spacing: 0.25em; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                }
                .path-title {
                    font-size: 5rem; font-weight: 800; letter-spacing: -0.04em; margin: 2rem 0 1rem;
                    background: linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.4) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 0.95;
                }
                .path-subtitle { color: #94a3b8; font-size: 1.4rem; font-weight: 400; letter-spacing: -0.01em; }

                /* Score Section */
                .score-section { margin-bottom: 6rem; }
                .score-card {
                    background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
                    border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 32px; padding: 3rem;
                    box-shadow: 0 0 60px rgba(59, 130, 246, 0.03); position: relative; overflow: hidden;
                }
                .score-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
                .score-header h3 { font-size: 0.9rem; font-weight: 800; letter-spacing: 0.2em; color: #64748b; }
                .score-val { font-size: 3.5rem; font-weight: 800; color: #60a5fa; line-height: 1; letter-spacing: -0.05em; }

                .score-track-container { margin-bottom: 2rem; }
                .score-labels { display: flex; justify-content: space-between; font-size: 0.8rem; color: #475569; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em; }
                .target-label { color: #3b82f6; }

                .score-bar-bg {
                    height: 12px; background: rgba(255,255,255,0.05); border-radius: 10px; position: relative;
                }
                .score-bar-fill {
                    height: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa); border-radius: 10px;
                    position: relative; transition: width 1.5s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .score-light {
                    position: absolute; right: 0; top: 0; height: 100%; width: 20px;
                    background: white; filter: blur(5px); opacity: 0.6;
                }
                .milestone {
                    position: absolute; top: 50%; transform: translate(-50%, -50%); width: 4px; height: 4px;
                    background: #64748b; border-radius: 50%;
                }

                .score-tasks { display: flex; align-items: center; gap: 1rem; }
                .score-tasks p { font-size: 0.9rem; color: #64748b; font-weight: 500; margin: 0; }
                .task-tags { display: flex; gap: 0.5rem; }
                .task-tags button {
                    font-size: 0.75rem; background: rgba(30, 41, 59, 0.5); border: 1px solid rgba(255,255,255,0.05);
                    padding: 0.4rem 0.8rem; border-radius: 8px; color: #94a3b8; font-weight: 600;
                    font-family: 'Inter', sans-serif; cursor: pointer; transition: 0.2s all;
                }
                .task-tags button:hover {
                    background: rgba(59, 130, 246, 0.15); border-color: rgba(59, 130, 246, 0.4); color: #fff; transform: translateY(-2px);
                }
                .task-tags button:active { transform: translateY(0); }

                /* Principle Section */
                .vision-card { margin-bottom: 8rem; }
                .core-principle-section {
                    position: relative; background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 30px; padding: 3.5rem; overflow: hidden;
                }
                .core-principle-section h3 {
                    font-size: 0.8rem; font-weight: 800; letter-spacing: 0.3em;
                    color: #94a3b8; margin-bottom: 2rem; text-align: center;
                }
                .core-principle-section p { text-align: center; font-size: 1.35rem; margin-bottom: 3.5rem; font-weight: 400; line-height: 1.5; color: #e2e8f0; }
                .principle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
                .principle-box {
                    background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 2.5rem 1.5rem; border-radius: 24px; text-align: center; transition: 0.3s;
                }
                .principle-box:hover { transform: translateY(-5px); border-color: rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.05); }
                .p-icon { font-size: 2.5rem; margin-bottom: 1.5rem; }
                .p-text { font-size: 1rem; font-weight: 700; color: #cbd5e1; letter-spacing: 0.02em; }

                /* Expanded Phases */
                .phases-expanded { display: flex; flex-direction: column; gap: 4rem; margin-bottom: 8rem; }
                
                .month-card { display: flex; gap: 3rem; }
                .month-sidebar { display: flex; flex-direction: column; align-items: center; padding-top: 1.2rem; cursor: pointer; }
                .month-idx {
                    font-size: 1.8rem; font-weight: 700; color: #3b82f6; margin-bottom: 1.5rem;
                    background: rgba(59, 130, 246, 0.08); padding: 0.6rem 1.2rem; border-radius: 16px;
                    font-family: 'Outfit', sans-serif;
                }
                .month-timeline-line { flex: 1; width: 2px; background: linear-gradient(to bottom, rgba(59, 130, 246, 0.3), rgba(255,255,255,0.02)); }

                .month-content {
                    flex: 1; background: #09090b; border: 1px solid #1f1f23; border-radius: 32px; padding: 3.5rem;
                    transition: 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .month-content:hover { border-color: #3b82f6; background: #0b0b0f; box-shadow: 0 20px 80px -20px rgba(0,0,0,0.5); }

                .month-header { margin-bottom: 3rem; border-bottom: 1px solid #1f1f23; padding-bottom: 2.5rem; }
                .month-header h2 { font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 0.75rem; color: #fff; }
                .month-focus { color: #94a3b8; font-size: 1.15rem; font-weight: 400; line-height: 1.5; font-family: 'Inter', sans-serif; }
                .expand-btn { font-size: 2.5rem; font-weight: 300; color: #3b82f6; opacity: 0.8; transition: transform 0.3s; }
                .active-month .expand-btn { transform: rotate(180deg); }

                .month-body { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 3rem; }
                .concept-list h4, .app-list h4, .month-footer h4 {
                    font-size: 0.75rem; font-weight: 800; letter-spacing: 0.25em; color: #52525b; margin-bottom: 1.5rem;
                }
                .concept-list ul, .app-list ul { list-style: none; padding: 0; }
                .concept-list li, .app-list li { margin-bottom: 1rem; color: #d1d1d6; display: flex; gap: 1rem; line-height: 1.6; font-size: 1.05rem; }
                .concept-list li::before { content: '•'; color: #3b82f6; font-weight: bold; }
                .app-list li strong { color: #fff; font-weight: 600; }
                .app-list li::before { content: '⚡'; color: #fbbf24; }

                /* Deep Dive Weekly */
                .weekly-deep-dive {
                    margin: 4rem 0 2rem; padding-top: 4rem; border-top: 1px dashed #27272a; 
                    animation: reveal 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .dive-header { font-size: 0.8rem; font-weight: 900; letter-spacing: 0.3em; color: #3b82f6; margin-bottom: 2.5rem; text-align: center; opacity: 0.9; }
                .weeks-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
                
                .week-card-premium {
                    background: linear-gradient(135deg, rgba(255,255,255,0.015), rgba(255,255,255,0.005));
                    border: 1px solid rgba(255,255,255,0.05);
                    padding: 2rem; border-radius: 20px; display: flex; flex-direction: column; gap: 1rem;
                    transition: transform 0.2s, border-color 0.2s;
                }
                .week-card-premium:hover { border-color: rgba(255,255,255,0.1); transform: translateY(-3px); }
                
                .week-badge {
                    background: rgba(59, 130, 246, 0.1); color: #60a5fa; font-size: 0.7rem; font-weight: 800;
                    padding: 0.4rem 0.8rem; border-radius: 8px; letter-spacing: 0.1em;
                }
                .week-card-premium h5 { font-size: 1.25rem; font-weight: 700; margin: 0.5rem 0 0; color: #f1f5f9; letter-spacing: -0.01em; }
                .week-focus { font-size: 0.95rem; color: #94a3b8; font-style: italic; margin-bottom: 1.5rem; line-height: 1.5; font-family: 'Inter', serif; }
                
                .week-tasks { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
                .task-row { display: flex; gap: 0.75rem; font-size: 0.95rem; color: #d4d4d8; align-items: flex-start; line-height: 1.5; }
                .check-circle { 
                    width: 18px; height: 18px; border: 2px solid #52525b; border-radius: 50%; flex-shrink: 0; margin-top: 2px;
                    opacity: 0.5; transition: opacity 0.2s;
                }
                .task-row:hover .check-circle { opacity: 1; border-color: #3b82f6; }

                .lab-box {
                    background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.15);
                    padding: 1.25rem; border-radius: 16px; display: flex; gap: 1rem; align-items: flex-start;
                }
                .lab-icon { font-size: 1.4rem; transform: translateY(-2px); }
                .lab-content strong { display: block; font-size: 0.75rem; color: #fbbf24; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 0.4rem; }
                .lab-content p { margin: 0; font-size: 0.9rem; color: #e4e4e7; line-height: 1.5; }

                .month-footer { border-top: 1px solid #1f1f23; padding-top: 2.5rem; }
                .res-mini-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }
                .res-mini-tag {
                    display: flex; align-items: center; gap: 0.6rem; padding: 0.6rem 1rem;
                    background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 12px; font-size: 0.85rem; font-weight: 600; color: #94a3b8;
                    text-decoration: none; transition: 0.2s; font-family: 'Inter', sans-serif;
                }
                .res-mini-tag:hover {
                    background: rgba(255, 255, 255, 0.08); color: #fff; border-color: #3b82f6; transform: translateY(-2px);
                }
                .res-mini-icon { filter: grayscale(1) brightness(1.5); }
                .res-mini-tag:hover .res-mini-icon { filter: none; }

                /* Truth Section */
                .truth-section-v2 { margin-bottom: 6rem; }
                .truth-glass-card {
                    position: relative; background: rgba(255, 255, 255, 0.95); padding: 7rem 4rem;
                    border-radius: 64px; text-align: center; color: #000; overflow: hidden;
                    box-shadow: 0 40px 100px -20px rgba(255,255,255,0.15);
                }
                .truth-orb {
                    position: absolute; top: -100px; right: -100px; width: 300px; height: 300px;
                    background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent 70%); pointer-events: none;
                }
                .truth-content h3 { font-size: 0.9rem; font-weight: 900; letter-spacing: 0.5em; color: #94a3b8; margin-bottom: 2.5rem; }
                .truth-content p { font-size: 3.5rem; font-weight: 800; letter-spacing: -0.05em; line-height: 1; margin-bottom: 4rem; color: #020617; }
                .truth-footer {
                    display: flex; justify-content: center; align-items: center; gap: 2rem;
                    font-weight: 800; font-size: 0.85rem; color: #475569; letter-spacing: 0.1em;
                }
                .dot { width: 4px; height: 4px; background: #94a3b8; border-radius: 50%; }

                @media (max-width: 900px) {
                    .path-title { font-size: 3.5rem; }
                    .month-card { flex-direction: column; gap: 1.5rem; }
                    .month-sidebar { flex-direction: row; gap: 1rem; width: 100%; border-bottom: 1px solid #1f1f23; padding-bottom: 1rem; }
                    .month-timeline-line { width: 100%; height: 2px; }
                    .month-body { grid-template-columns: 1fr; }
                    .weeks-grid { grid-template-columns: 1fr; }
                    .principle-grid { grid-template-columns: 1fr; }
                    .truth-glass-card { padding: 4rem 2rem; }
                    .truth-content p { font-size: 2.2rem; }
                    .score-tasks { flex-direction: column; align-items: flex-start; gap: 1rem; }
                    .task-tags { flex-wrap: wrap; }
                }

                @media (max-width: 600px) {
                    .next-path-page { padding: 4rem 1.5rem; }
                    .path-header { margin-bottom: 4rem; }
                    .path-title { font-size: 2.8rem; letter-spacing: -0.05em; }
                    .path-subtitle { font-size: 1.1rem; }
                    
                    .score-card { padding: 2rem; border-radius: 24px; }
                    .score-val { font-size: 2.5rem; }
                    .score-labels { font-size: 0.65rem; }
                    .milestone { width: 3px; height: 3px; }
                    
                    .core-principle-section { padding: 2rem 1.5rem; }
                    .core-principle-section p { font-size: 1.1rem; margin-bottom: 2.5rem; }
                    
                    .month-content { padding: 2rem; }
                    .month-header h2 { font-size: 1.5rem; }
                    .month-focus { font-size: 1rem; }
                    
                    .concept-list li, .app-list li { font-size: 0.95rem; }
                    
                    .truth-content p { font-size: 1.8rem; margin-bottom: 2.5rem; }
                    .truth-footer { flex-direction: column; gap: 0.5rem; font-size: 0.75rem; }
                    .dot { display: none; }
                }
            `}</style>
        </div>
    );
};

export default NextPath;
