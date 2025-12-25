import { useState } from 'react';
import { createPortal } from 'react-dom';

interface SubTopic {
    title: string;
    description: string;
    isKey: boolean; // Highlights "Must Know" topics
}

interface NodeDetail {
    title: string;
    subtitle: string;
    timeline: string; // Estimated time to complete
    topics: SubTopic[];
    resources: string[];
    reasoning: {
        problem: string;
        solution: string;
        tradeoffs: string;
    };
    checklist: { title: string; checked: boolean }[];
}

interface RoadmapNode {
    id: string;
    label: string;
    description: string;
    category: 'foundation' | 'language' | 'database' | 'architecture' | 'devops' | 'founder';
    x: number;
    y: number;
    connections: string[];
}

// Detailed content for each node
const NODE_DETAILS: Record<string, NodeDetail> = {
    'internet': {
        title: 'How the Internet Works',
        subtitle: 'The invisible infrastructure of the web',
        timeline: '3 - 5 Days',
        topics: [
            { title: 'DNS Resolution', description: 'How domain names map to IP addresses (A, CNAME, AAAA records).', isKey: true },
            { title: 'HTTP/HTTPS Protocol', description: 'Headers, Methods (GET, POST), Status Codes, Handshakes.', isKey: true },
            { title: 'TCP/IP Model', description: 'Packets, subnets, and reliable data delivery.', isKey: false },
            { title: 'Browsers & Rendering', description: 'How browsers parse HTML, CSS, and execute JS.', isKey: false }
        ],
        resources: ['MDN Web Docs', 'CS50 Introduction to Networks'],
        reasoning: {
            problem: "Computers only understand numbers (IPs), but humans remember names. Sending data across the world requires a standardized, reliable delivery system.",
            solution: "DNS solves the naming problem. TCP/IP solves the delivery problem by slicing data into packets. HTTP provides a common language for browsers and servers to talk.",
            tradeoffs: "The abstraction layers (OSI Model) add overhead. HTTPS adds latency due to handshakes but is non-negotiable for security. DNS propagation can be slow."
        },
        checklist: [
            { title: "Day 1: Read about the journey of a DNS Request", checked: false },
            { title: "Day 2: Use browser DevTools 'Network' tab to analyze HTTP headers", checked: false },
            { title: "Day 3: Use 'curl' and 'ping' in terminal to query servers manually", checked: false },
            { title: "Day 4: Deep dive into SSL/TLS Handshake steps", checked: false }
        ]
    },
    'linux': {
        title: 'Linux & Terminal Mastery',
        subtitle: 'Command the server like a pro',
        timeline: '1 - 2 Weeks',
        topics: [
            { title: 'Bash Scripting', description: 'Automating tasks with shell scripts.', isKey: true },
            { title: 'Process Management', description: 'ps, top, kill, nice, background jobs (&).', isKey: true },
            { title: 'File Permissions', description: 'chmod, chown, users, groups.', isKey: true },
            { title: 'SSH & Keys', description: 'Secure remote access and key management.', isKey: false }
        ],
        resources: ['Linux Journey', 'OverTheWire Wargames'],
        reasoning: {
            problem: "Servers don't have GUIs. Managing thousands of servers manually via mouse clicks is impossible and inefficient.",
            solution: "The CLI (Command Line Interface) allows robust automation, remote management via SSH, and direct interaction with the OS kernel for performance tuning.",
            tradeoffs: "Steep learning curve compared to GUIs. One wrong command (rm -rf /) can be catastrophic. Requires memorization of arcane syntax."
        },
        checklist: [
            { title: "Day 1-2: Navigate file system (ls, cd, pwd, mkdir) without a mouse", checked: false },
            { title: "Day 3: Master file permissions (chmod 777 is forbidden!)", checked: false },
            { title: "Day 4: Learn grep, cat, tail, head for log analysis", checked: false },
            { title: "Week 2: Write your first Bash script to automate a backup", checked: false },
            { title: "Week 2: Set up an SSH key pair and login to a remote server", checked: false }
        ]
    },
    'git': {
        title: 'Git Version Control',
        subtitle: 'Collaborate and manage history safely',
        timeline: '1 Week',
        topics: [
            { title: 'Branching Strategies', description: 'GitFlow, Trunk-based development.', isKey: true },
            { title: 'Rebasing vs Merging', description: 'Keeping a clean history.', isKey: true },
            { title: 'Stashing & Cherry-picking', description: 'Advanced history manipulation.', isKey: false },
            { title: 'Hooks', description: 'Pre-commit, pre-push automation.', isKey: false }
        ],
        resources: ['Pro Git Book', 'Git Krazen'],
        reasoning: {
            problem: "Without VC, overwriting co-workers' code is rampant. 'Final_Final_v2.zip' is not a strategy. You need to travel back in time to debug regressions.",
            solution: "Git provides a distributed history of every change. Branching allows isolation of features. Rebasing keeps history linear and readable.",
            tradeoffs: "Git's conceptual model (DAG) is complex. Merge conflicts are painful. Submodules are notoriously difficult to manage."
        },
        checklist: [
            { title: "Day 1: Initialize a repo and commit changes", checked: false },
            { title: "Day 2: Create a merge conflict intentionally and resolve it", checked: false },
            { title: "Day 3: Learn interactive rebase (git rebase -i)", checked: false },
            { title: "Day 4: Practice undoing changes (reset, revert, checkout)", checked: false },
            { title: "Day 5: Set up a pre-commit hook with Husky", checked: false }
        ]
    },
    'networking': {
        title: 'Advanced Networking',
        subtitle: 'Security and connection architecture',
        timeline: '2 Weeks',
        topics: [
            { title: 'OSI Model', description: 'The 7 layers of networking.', isKey: false },
            { title: 'Load Balancers', description: 'L4 vs L7 load balancing (Nginx, HAProxy).', isKey: true },
            { title: 'Firewalls & Proxies', description: 'Reverse proxies, forward proxies, WAF.', isKey: true },
            { title: 'SSL/TLS Handshake', description: 'Symmetric vs Asymmetric encryption.', isKey: true }
        ],
        resources: ['Cloudflare Learning Center'],
        reasoning: {
            problem: "Directly exposing application servers to the internet is dangerous and unscalable. Single servers cannot handle 100k+ concurrent connections.",
            solution: "Reverse Proxies (Nginx) and Load Balancers distribute traffic and handle SSL termination, relieving the app server. Firewalls block malicious traffic.",
            tradeoffs: "Adds another hop in the network request (latency). Introducing a Load Balancer introduces a new single point of failure if not redundant."
        },
        checklist: [
            { title: "Week 1: Configure Nginx as a Reverse Proxy", checked: false },
            { title: "Week 1: Set up a self-signed SSL certificate", checked: false },
            { title: "Week 2: Simulate Load Balancing between two Node apps", checked: false },
            { title: "Week 2: Inspect packet flow with Wireshark (optional)", checked: false }
        ]
    },
    'node': {
        title: 'Node.js & NestJS Expert',
        subtitle: 'Mastering the Runtime and Framework',
        timeline: '4 - 6 Weeks',
        topics: [
            { title: 'Event Loop & Libuv', description: 'Phases, Macrotasks vs Microtasks.', isKey: true },
            { title: 'Streams & Buffers', description: 'Handling large data efficiently without memory bloat.', isKey: true },
            { title: 'Dependency Injection', description: 'Inversion of Control in NestJS.', isKey: true },
            { title: 'Modules & Decorators', description: 'Metaprogramming in TypeScript.', isKey: false }
        ],
        resources: ['Node.js Design Patterns Book', 'NestJS Official Docs'],
        reasoning: {
            problem: "Traditional blocking I/O (Thread-per-request) runs out of memory efficiently under high concurrency (e.g., 10k connections).",
            solution: "Node.js uses a Single-Threaded Event Loop with non-blocking I/O, perfect for I/O-bound apps. NestJS adds structure (Angular-like) to the unopinionated Node ecosystem.",
            tradeoffs: "Nodejs is terrible at CPU-intensive tasks (image processing, ML) as it blocks the event loop. NestJS adds boilerplate and learning curve over Express."
        },
        checklist: [
            { title: "Week 1: Deep dive into Event Loop phases", checked: false },
            { title: "Week 2: Build a file upload service using Streams", checked: false },
            { title: "Week 3: Build a complete NestJS CRUD API with DTOs", checked: false },
            { title: "Week 4: Implement Custom Decorators and Interceptors", checked: false },
            { title: "Week 5: Master Dependency Injection scopes", checked: false }
        ]
    },
    'rdbms': {
        title: 'PostgreSQL & ACID',
        subtitle: 'Relational Database Engineering',
        timeline: '3 - 4 Weeks',
        topics: [
            { title: 'ACID Properties', description: 'Atomicity, Consistency, Isolation, Durability.', isKey: true },
            { title: 'Indexing Strategies', description: 'B-Tree, Hash, GIN, GiST indexes.', isKey: true },
            { title: 'Normalization', description: '1NF, 2NF, 3NF to avoid redundancy.', isKey: false },
            { title: 'Transactions & Locking', description: 'Row-level locking, Deadlocks, Isolation levels.', isKey: true }
        ],
        resources: ['Postgres Weekly', 'The Art of PostgreSQL'],
        reasoning: {
            problem: "Data integrity is critical for financial/user data. Example: Deducting money from User A but crashing before adding to User B destroys value.",
            solution: "ACID transactions guarantee all-or-nothing execution. Relational schemas enforce strict data structure and consistency.",
            tradeoffs: "Vertical scaling has limits. Horizontal scaling (Sharding) is extremely complex. Rigid schema makes rapid prototyping harder compared to NoSQL."
        },
        checklist: [
            { title: "Week 1: Design a normalized DB schema for an E-commerce app", checked: false },
            { title: "Week 2: Write complex JOIN queries with aggregations", checked: false },
            { title: "Week 3: Analyze query performance with EXPLAIN ANALYZE", checked: false },
            { title: "Week 4: Implement a transaction with rollback scenario", checked: false }
        ]
    },
    'nosql': {
        title: 'MongoDB & NoSQL',
        subtitle: 'Handling unstructured data at scale',
        timeline: '2 Weeks',
        topics: [
            { title: 'Aggregation Framework', description: 'Pipelines, $match, $group, $lookup.', isKey: true },
            { title: 'Sharding & Replication', description: 'Horizontal scaling architecture.', isKey: true },
            { title: 'Schema Design', description: 'Embedding vs Referencing trade-offs.', isKey: true },
            { title: 'Geospatial Queries', description: 'Location-based services.', isKey: false }
        ],
        resources: ['MongoDB University'],
        reasoning: {
            problem: "Relational databases struggle with massive volumes of unstructured data (logs, IoT) and require complex JOINs for hierarchical data.",
            solution: "MongoDB (Document stores) allow flexible schemas and fast read/writes. Sharding is built-in for massive horizontal scale.",
            tradeoffs: "No multi-document ACID transactions (historically, though improved). Eventual consistency can lead to stale reads. Data duplication is common."
        },
        checklist: [
            { title: "Week 1: Model User profiles with embedded documents", checked: false },
            { title: "Week 1: Build a complex aggregation pipeline for stats", checked: false },
            { title: "Week 2: Set up a Replica Set locally", checked: false },
            { title: "Week 2: Perform a geospatial 'nearest store' query", checked: false }
        ]
    },
    'orm': {
        title: 'ORMs (Prisma / TypeORM)',
        subtitle: 'Bridging Objects and Tables',
        timeline: '1 Week',
        topics: [
            { title: 'N+1 Problem', description: 'Detection and prevention (DataLoader).', isKey: true },
            { title: 'Migrations', description: 'Versioning database schema changes.', isKey: true },
            { title: 'Query Builders', description: 'When to drop down to raw SQL.', isKey: false }
        ],
        resources: ['Prisma Docs', 'TypeORM Docs'],
        reasoning: {
            problem: "Writing raw SQL is error-prone, vulnerable to SQL injection, and lacks type safety in TS codebases.",
            solution: "ORMs provide a type-safe abstraction, handle basic security sanitization, and manage schema migrations automatically.",
            tradeoffs: "The 'Abstraction Leak': ORMs generate inefficient queries (n+1 problem). Complex queries are often harder to write in ORM syntax than raw SQL."
        },
        checklist: [
            { title: "Day 1-2: Connect NestJS to Postgres using Prisma", checked: false },
            { title: "Day 3: Create, run, and rollback a migration", checked: false },
            { title: "Day 4: Seed the database with fake data", checked: false },
            { title: "Day 5: Fix an N+1 query issue", checked: false }
        ]
    },
    'caching': {
        title: 'Redis & Caching',
        subtitle: 'Speeding up data access',
        timeline: '1 Week',
        topics: [
            { title: 'Caching Strategies', description: 'Write-through, Write-back, Cache-aside.', isKey: true },
            { title: 'Eviction Policies', description: 'LRU, LFU, TTL.', isKey: true },
            { title: 'Redis Data Structures', description: 'Strings, Hashes, Lists, Sets, Sorted Sets.', isKey: false },
            { title: 'Pub/Sub', description: 'Real-time messaging with Redis.', isKey: false }
        ],
        resources: ['Redis University'],
        reasoning: {
            problem: "Database operations are slow (disk I/O). Calculating the same dashboard stats on every page refresh kills the database.",
            solution: "Redis stores data in RAM (Sub-millisecond access). Caching frequently accessed read-heavy data drastically reduces DB load.",
            tradeoffs: "Cache Invalidation is one of the hardest problems in CS. Stale data can confuse users. RAM is more expensive than Disk."
        },
        checklist: [
            { title: "Day 1: Cache a heavy API response with TTL", checked: false },
            { title: "Day 2: Implement Cache-Aside pattern manually", checked: false },
            { title: "Day 3: Use Redis Lists for a simple job queue", checked: false },
            { title: "Day 4: Implement a rate limiter using Redis keys", checked: false }
        ]
    },
    'api': {
        title: 'API Architecture',
        subtitle: 'Designing robust interfaces',
        timeline: '2 Weeks',
        topics: [
            { title: 'RESTful Design', description: 'Resource naming, HATEOAS, Status codes.', isKey: true },
            { title: 'GraphQL', description: 'Schema, Resolvers, Federation.', isKey: true },
            { title: 'gRPC & Protobuf', description: 'High-performance microservices comms.', isKey: true },
            { title: 'WebSockets', description: 'Bidirectional full-duplex communication.', isKey: false }
        ],
        resources: ['API Design Patterns Book'],
        reasoning: {
            problem: "Frontends and Backends need a contract to communicate. REST is standard but suffers from over-fetching. WebSockets are needed for real-time.",
            solution: "GraphQL solves over-fetching. gRPC solves internal microservice latency with binary serialization. WebSockets enable chat/live-updates.",
            tradeoffs: "GraphQL adds complexity (Caching is hard, N+1 is default). WebSockets require stateful connections, making scaling harder than stateless REST."
        },
        checklist: [
            { title: "Week 1: Document an API using Swagger/OpenAPI", checked: false },
            { title: "Week 1: Convert a REST endpoint to GraphQL", checked: false },
            { title: "Week 2: Build a real-time chat with Socket.io", checked: false },
            { title: "Week 2: Implement a simple gRPC microservice communication", checked: false }
        ]
    },
    'security': {
        title: 'Web Security (OWASP)',
        subtitle: 'Protecting your application',
        timeline: '2 Weeks',
        topics: [
            { title: 'Authentication', description: 'JWT, OAuth2, OpenID Connect.', isKey: true },
            { title: 'Common Vulnerabilities', description: 'XSS, CSRF, SQL Injection.', isKey: true },
            { title: 'Rate Limiting', description: 'Preventing DDoS and abuse.', isKey: false },
            { title: 'Encryption', description: 'Hashing passwords (Argon2, Bcrypt).', isKey: true }
        ],
        resources: ['OWASP Top 10'],
        reasoning: {
            problem: "The web is hostile. Script kiddies and bots will scan your API for vulnerabilities 24/7. Data breaches destroy trust.",
            solution: "Implement OWASP standards. Use established libraries for Auth (Passport/Auth0). Never roll your own crypto.",
            tradeoffs: "Security adds friction to User Experience (MFA, Captcha). Implementation time is high. Performance impact of encryption."
        },
        checklist: [
            { title: "Week 1: Implement JWT Authentication with Refresh Tokens", checked: false },
            { title: "Week 1: Secure headers using Helmet.js", checked: false },
            { title: "Week 2: Implement Rate Limiting middleware", checked: false },
            { title: "Week 2: Sanitize all inputs against XSS and NoSQL Injection", checked: false }
        ]
    },
    'testing': {
        title: 'Testing & QA',
        subtitle: 'Ensuring reliability',
        timeline: '2 Weeks',
        topics: [
            { title: 'Unit vs Integration', description: 'Testing pyramid strategy.', isKey: true },
            { title: 'TDD', description: 'Test Driven Development workflow.', isKey: false },
            { title: 'E2E Testing', description: 'Cypress / Playwright flows.', isKey: false },
            { title: 'Mocking', description: 'Isolating dependencies.', isKey: true }
        ],
        resources: ['Jest Docs', 'Testing Trophy'],
        reasoning: {
            problem: "Manual testing is slow, inconsistent, and unscalable. Fear of breaking existing code freezes development speed.",
            solution: "Automated tests provide a safety net (CI/CD). Unit tests catch logic bugs. Integration tests verify DB connections.",
            tradeoffs: "Writing tests doubles the initial development time. Maintaining brittle tests (that break on every CSS change) is a nightmare."
        },
        checklist: [
            { title: "Week 1: Write Unit Tests for all Service methods", checked: false },
            { title: "Week 1: Mock Repository dependencies using Jest", checked: false },
            { title: "Week 2: Write Integration Tests for API controllers", checked: false },
            { title: "Week 2: Set up a CI pipeline (GitHub Actions) to run tests", checked: false }
        ]
    },
    'docker': {
        title: 'Docker & Containers',
        subtitle: 'Package once, run anywhere',
        timeline: '1 - 2 Weeks',
        topics: [
            { title: 'Dockerfiles', description: 'Multi-stage builds for small images.', isKey: true },
            { title: 'Docker Compose', description: 'Orchestrating local dev environments.', isKey: true },
            { title: 'Networking', description: 'Bridge, Host, Overlay networks.', isKey: false },
            { title: 'Volumes', description: 'Persisting data.', isKey: false }
        ],
        resources: ['Docker Mastery Course'],
        reasoning: {
            problem: "'It works on my machine' syndrome. Different OS versions and dependencies between Dev, Stage, and Prod cause crashes.",
            solution: "Containers package the code + OS + Dependencies together. Guaranteed consistency across all environments.",
            tradeoffs: "Adds complexity to the build pipeline. Learning curve for filesystem/networking inside containers. Docker performance overhead on Mac/Windows."
        },
        checklist: [
            { title: "Day 1-2: Write a multi-stage Dockerfile for NestJS", checked: false },
            { title: "Day 3: Set up docker-compose for App + DB + Redis", checked: false },
            { title: "Day 4: Persist DB data using Docker Volumes", checked: false },
            { title: "Week 2: Optimize image size (Alpine, Distroless)", checked: false }
        ]
    },
    'k8s': {
        title: 'Kubernetes & AWS',
        subtitle: 'Orchestration at scale',
        timeline: '3 - 4 Weeks',
        topics: [
            { title: 'Core Concepts', description: 'Pods, Deployments, Services, Ingress.', isKey: true },
            { title: 'Helm Charts', description: 'Package management for K8s.', isKey: false },
            { title: 'Serverless', description: 'AWS Lambda, API Gateway.', isKey: true },
            { title: 'Infrastructure as Code', description: 'Terraform / CDK.', isKey: true }
        ],
        resources: ['Kubernetes.io', 'AWS Certified Solutions Architect'],
        reasoning: {
            problem: "Managing 100 docker containers manually is impossible. What happens when a node crashes? How do you zero-downtime deploy?",
            solution: "K8s automates deployment, scaling, and management of containerized apps. It self-heals crashing pods.",
            tradeoffs: "Extreme complexity ('K8s is hard'). Overkill for small apps. Operational cost of managing the control plane."
        },
        checklist: [
            { title: "Week 1: Deploy a simple pod and service using Minikube", checked: false },
            { title: "Week 2: Create a Deployment with 3 replicas and rolling updates", checked: false },
            { title: "Week 3: Configure Ingress and TLS", checked: false },
            { title: "Week 4: Explore AWS Lambda functions for event-driven tasks", checked: false }
        ]
    },
    'system-design': {
        title: 'System Design & Scalability',
        subtitle: 'The Founder / Architect Level',
        timeline: 'Ongoing / 4+ Weeks',
        topics: [
            { title: 'CAP Theorem', description: 'Trade-offs in distributed systems.', isKey: true },
            { title: 'Microservices Patterns', description: 'Saga, CQRS, Event Sourcing.', isKey: true },
            { title: 'Scalability', description: 'Vertical vs Horizontal scaling.', isKey: true },
            { title: 'Message Queues', description: 'Kafka, RabbitMQ decoupling.', isKey: true }
        ],
        resources: ['System Design Primer', 'Designing Data-Intensive Applications'],
        reasoning: {
            problem: "Monoliths become unmaintainable as teams grow. Single DB becomes the bottleneck at millions of users.",
            solution: "Microservices decouple domains. Message queues handle backpressure. Eventual consistency allows massive scale.",
            tradeoffs: "Distributed systems introduce 'distributed transactions' (hard). Debugging across services is painful. Network latency becomes a major factor."
        },
        checklist: [
            { title: "Study: Analyze the architecture of Twitter/Uber", checked: false },
            { title: "Design: Draw a system design for a URL Shortener", checked: false },
            { title: "Design: Draw a system design for a Chat App", checked: false },
            { title: "Practice: Implement a simple Message Queue worker", checked: false }
        ]
    }
};

const NODES: RoadmapNode[] = [
    // ROW 1: Foundations
    { id: 'internet', label: 'How the Internet Works', description: 'DNS, HTTP/HTTPS, TCP/IP, Browsers', category: 'foundation', x: 50, y: 1, connections: ['linux'] },

    // ROW 2: OS & Tools
    { id: 'linux', label: 'Linux & Terminal mastery', description: 'Bash scripting, Cron, Process management', category: 'foundation', x: 50, y: 2, connections: ['git', 'networking'] },

    // ROW 3: Branching
    { id: 'git', label: 'Git & Version Control', description: 'Branching strategies, Rebase, CI hooks', category: 'foundation', x: 30, y: 3, connections: ['node'] },
    { id: 'networking', label: 'Advanced Networking', description: 'OSI Model, Subnetting, Firewalls, SSL/TLS', category: 'foundation', x: 70, y: 3, connections: ['node'] },

    // ROW 4: Language (The Core)
    { id: 'node', label: 'Node.js & NestJS Expert', description: 'Event Loop, Streams, Buffers, DI, Modules', category: 'language', x: 50, y: 4, connections: ['rdbms', 'nosql'] },

    // ROW 5: Data Persistence
    { id: 'rdbms', label: 'PostgreSQL & ACID', description: 'Indexing, Normalization, Transactions, PL/SQL', category: 'database', x: 30, y: 5, connections: ['orm'] },
    { id: 'nosql', label: 'MongoDB & Aggregations', description: 'Sharding, Replication Sets, GeoSpatial', category: 'database', x: 70, y: 5, connections: ['caching'] },

    // ROW 6: Data Handling
    { id: 'orm', label: 'Prisma / TypeORM', description: 'Schema management, Migrations, Seeding', category: 'database', x: 30, y: 6, connections: ['api'] },
    { id: 'caching', label: 'Redis & Caching', description: 'Pub/Sub, Eviction policies, Rate limiting', category: 'database', x: 70, y: 6, connections: ['api'] },

    // ROW 7: API Architecture
    { id: 'api', label: 'API Architecture', description: 'REST, GraphQL, gRPC, WebSockets', category: 'architecture', x: 50, y: 7, connections: ['security', 'testing'] },

    // ROW 8: Quality & Security
    { id: 'security', label: 'Web Security (OWASP)', description: 'JWT, OAuth2, XSS, CSRF, Rate Limiting', category: 'architecture', x: 30, y: 8, connections: ['docker'] },
    { id: 'testing', label: 'Testing & QA', description: 'Unit, Integration, E2E, TDD, Jest', category: 'architecture', x: 70, y: 8, connections: ['docker'] },

    // ROW 9: DevOps Layout
    { id: 'docker', label: 'Docker & Containers', description: 'Multi-stage builds, Docker Compose, Networking', category: 'devops', x: 50, y: 9, connections: ['k8s'] },

    // ROW 10: Orchestration
    { id: 'k8s', label: 'Kubernetes & AWS', description: 'Pods, Services, Ingress, EKS, Lambda', category: 'devops', x: 50, y: 10, connections: ['system-design'] },

    // ROW 11: The Founder Level
    { id: 'system-design', label: 'System Design & Scalability', description: 'Load Balancing, CAP Theorem, CDN, Microservices', category: 'founder', x: 50, y: 11, connections: [] },
];

const SubRoadmapModal = ({ nodeId, onClose }: { nodeId: string; onClose: () => void }) => {
    const detail = NODE_DETAILS[nodeId];
    if (!detail) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-roadmap" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <header className="modal-header">
                    <div className="header-top-row">
                        <div className="modal-subtitle">{detail.subtitle}</div>
                        <div className="time-badge">
                            <span className="time-icon">⏱️</span>
                            {detail.timeline}
                        </div>
                    </div>
                    <h2 className="modal-title">{detail.title}</h2>
                </header>

                <div className="modal-body">
                    {/* Reasoning Section */}
                    <div className="reasoning-section">
                        <div className="reasoning-grid">
                            <div className="reasoning-card problem">
                                <h4 className="reasoning-title">☠️ The Problem</h4>
                                <p>{detail.reasoning.problem}</p>
                            </div>
                            <div className="reasoning-card solution">
                                <h4 className="reasoning-title">💡 The Solution</h4>
                                <p>{detail.reasoning.solution}</p>
                            </div>
                            <div className="reasoning-card tradeoffs">
                                <h4 className="reasoning-title">⚖️ Trade-offs</h4>
                                <p>{detail.reasoning.tradeoffs}</p>
                            </div>
                        </div>
                    </div>

                    {/* Daily Action Plan (NEW) */}
                    <div className="checklist-section">
                        <h3 className="section-heading">✅ Daily Action Plan</h3>
                        <div className="checklist-grid">
                            {detail.checklist?.map((item, idx) => (
                                <div key={idx} className="checklist-item">
                                    <input type="checkbox" id={`chk-${idx}`} className="custom-checkbox" defaultChecked={item.checked} />
                                    <label htmlFor={`chk-${idx}`}>{item.title}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className="section-heading">Detailed Learning Path</h3>
                    <div className="topics-grid">
                        {detail.topics.map((topic, idx) => (
                            <div key={idx} className={`topic-card ${topic.isKey ? 'key-topic' : ''}`}>
                                <div className="topic-header">
                                    <span className="topic-title">{topic.title}</span>
                                    {topic.isKey && <span className="key-badge">MUST KNOW</span>}
                                </div>
                                <p className="topic-desc">{topic.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="resources-section">
                        <h3 className="section-heading">Recommended Resources</h3>
                        <div className="resources-list">
                            {detail.resources.map((res, idx) => (
                                <span key={idx} className="resource-tag">📚 {res}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

const BackendMasteryGraph = () => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [activeNode, setActiveNode] = useState<string | null>(null);

    const handleNodeClick = (id: string) => {
        setActiveNode(id); // For highlighting in graph
        setSelectedNodeId(id); // For modal
    };

    // Calculate strict coordinates for SVGs and Lines
    const ROW_HEIGHT = 160;

    return (
        <div className="backend-graph-page">
            <header className="graph-header">
                <div className="badge-founder">FOUNDER OF BACKEND</div>
                <h1>Architectural Mastery Roadmap</h1>
                <p>The visual path from "Hello World" to "CTO / Founder" Level.</p>
            </header>

            <div className="graph-scroll-container">
                <div className="graph-diagram" style={{ height: (NODES.length / 1.5) * ROW_HEIGHT + 200 }}>

                    {/* SVG Layer for Connectors */}
                    <svg className="connections-layer">
                        {NODES.map(node =>
                            node.connections.map(targetId => {
                                const target = NODES.find(n => n.id === targetId);
                                if (!target) return null;

                                return (
                                    <line
                                        key={`${node.id}-${targetId}`}
                                        x1={`${node.x}%`}
                                        y1={node.y * ROW_HEIGHT + 30}
                                        x2={`${target.x}%`}
                                        y2={target.y * ROW_HEIGHT + 30}
                                        className="connector-line"
                                    />
                                );
                            })
                        )}
                    </svg>

                    {/* Nodes Layer */}
                    {NODES.map(node => (
                        <div
                            key={node.id}
                            className={`roadmap-node-wrapper category-${node.category} ${activeNode === node.id ? 'active' : ''}`}
                            style={{
                                left: `${node.x}%`,
                                top: `${node.y * ROW_HEIGHT}px`
                            }}
                            onClick={() => handleNodeClick(node.id)}
                        >
                            <div className="node-box">
                                <span className="node-label">{node.label}</span>
                                <div className="click-hint">Click for details</div>
                            </div>
                            <div className="node-dot"></div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedNodeId && (
                <SubRoadmapModal
                    nodeId={selectedNodeId}
                    onClose={() => setSelectedNodeId(null)}
                />
            )}

            <style>{`
                .backend-graph-page {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 2rem 1rem;
                    color: var(--text-primary);
                }

                .graph-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .graph-header h1 {
                    font-size: 3rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(to right, #60a5fa, #a78bfa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .badge-founder {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(255, 215, 0, 0.1);
                    color: #ffd700;
                    border: 1px solid rgba(255, 215, 0, 0.3);
                    border-radius: 99px;
                    font-weight: 800;
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    margin-bottom: 1rem;
                }

                .graph-scroll-container {
                    background: #0f0f13;
                    border: 1px solid #27272a;
                    border-radius: 20px;
                    padding: 2rem;
                    overflow: auto;
                    position: relative;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE/Edge */
                }
                
                .graph-scroll-container::-webkit-scrollbar {
                    display: none; /* Chrome/Safari */
                }

                .graph-diagram {
                    position: relative;
                    min-width: 800px; /* Ensure horizontal scroll on mobile */
                    margin: 0 auto;
                    width: 100%;
                }

                .connections-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                }

                .connector-line {
                    stroke: #3f3f46;
                    stroke-width: 2;
                    stroke-dasharray: 4;
                    animation: dash 60s linear infinite;
                }
                
                @keyframes dash {
                    to { stroke-dashoffset: 1000; }
                }

                .roadmap-node-wrapper {
                    position: absolute;
                    transform: translate(-50%, 0);
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .node-box {
                    background: #18181b;
                    border: 1px solid #3f3f46;
                    padding: 1rem 1.5rem;
                    border-radius: 12px;
                    min-width: 200px;
                    text-align: center;
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    position: relative;
                    overflow: hidden;
                }

                .roadmap-node-wrapper:hover .node-box {
                    transform: translateY(-5px);
                    border-color: var(--accent-color);
                    box-shadow: 0 10px 30px -10px rgba(139, 92, 246, 0.5);
                }

                .click-hint {
                    font-size: 0.65rem;
                    color: rgba(255,255,255,0.3);
                    margin-top: 0.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    opacity: 0;
                    transition: opacity 0.2s;
                }

                .roadmap-node-wrapper:hover .click-hint {
                    opacity: 1;
                }

                .node-label {
                    font-weight: 700;
                    font-size: 0.95rem;
                    color: #e4e4e7;
                }

                .node-dot {
                    width: 12px;
                    height: 12px;
                    background: #3f3f46;
                    border-radius: 50%;
                    margin-top: 1rem;
                    border: 2px solid #18181b;
                    position: relative;
                    z-index: 2;
                }
                
                /* Coloring by Category */
                .category-foundation .node-box { border-left: 3px solid #60a5fa; }
                .category-language .node-box { border-left: 3px solid #34d399; }
                .category-database .node-box { border-left: 3px solid #f87171; }
                .category-architecture .node-box { border-left: 3px solid #c084fc; }
                .category-devops .node-box { border-left: 3px solid #fb923c; }
                .category-founder .node-box { border-left: 3px solid #ffd700; background: linear-gradient(135deg, #1f1f22 0%, #2a2a2e 100%); }

                /* Connection Dots Coloring */
                .category-foundation .node-dot { background: #60a5fa; }
                .category-language .node-dot { background: #34d399; }
                .category-database .node-dot { background: #f87171; }
                .category-architecture .node-dot { background: #c084fc; }
                .category-devops .node-dot { background: #fb923c; }
                .category-founder .node-dot { background: #ffd700; box-shadow: 0 0 10px #ffd700; }

                /* MODAL STYLES */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    animation: fadeIn 0.3s ease;
                }

                .modal-content-roadmap {
                    background: #18181b;
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 24px;
                    border: 1px solid #3f3f46;
                    position: relative;
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(50px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .close-btn {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    background: rgba(255,255,255,0.1);
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    z-index: 10;
                }

                .close-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: rotate(90deg);
                }

                .modal-header {
                    padding: 3rem 2.5rem;
                    background: linear-gradient(to bottom, #27272a, #18181b);
                    border-bottom: 1px solid #3f3f46;
                }

                .header-top-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 0.5rem;
                }

                .time-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 0.35rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--accent-color);
                    letter-spacing: 0.05em;
                }

                .modal-subtitle {
                    color: var(--accent-color);
                    text-transform: uppercase;
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                }

                .modal-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin: 0;
                    line-height: 1.1;
                }

                .modal-body {
                    padding: 2.5rem;
                }

                .section-heading {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    border-left: 4px solid var(--accent-color);
                    padding-left: 1rem;
                }

                .topics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 3rem;
                }

                .topic-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 1.5rem;
                    border-radius: 12px;
                    transition: all 0.2s;
                }

                .topic-card.key-topic {
                    border-color: rgba(139, 92, 246, 0.4);
                    background: rgba(139, 92, 246, 0.05);
                }

                .topic-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.75rem;
                }

                .topic-title {
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: var(--text-primary);
                }

                .key-badge {
                    font-size: 0.6rem;
                    background: var(--accent-color);
                    color: white;
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                }

                .topic-desc {
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                }

                .resources-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .resource-tag {
                    background: #27272a;
                    padding: 0.5rem 1rem;
                    border-radius: 99px;
                    font-size: 0.9rem;
                    color: #e4e4e7;
                    border: 1px solid #3f3f46;
                    cursor: default;
                    transition: all 0.2s;
                }

                .resource-tag:hover {
                    border-color: var(--text-primary);
                }

                @media (max-width: 768px) {
                    .modal-header { padding: 2rem 1.5rem; }
                    .modal-body { padding: 1.5rem; }
                    .modal-title { font-size: 1.75rem; }
                    .topics-grid { grid-template-columns: 1fr; }
                    .reasoning-grid { grid-template-columns: 1fr; }
                }

                /* REASONING SECTION STYLES */
                .reasoning-section {
                    margin-bottom: 3rem;
                }

                .reasoning-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                .checklist-section {
                    margin-bottom: 3rem;
                }

                .checklist-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem 1rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    margin-bottom: 0.5rem;
                    transition: background 0.2s;
                }

                .checklist-item:hover {
                    background: rgba(255, 255, 255, 0.06);
                }

                .checklist-item label {
                    color: #d4d4d8;
                    font-size: 0.9rem;
                    cursor: pointer;
                    flex: 1;
                }

                .custom-checkbox {
                    accent-color: var(--accent-color);
                    width: 1.1rem;
                    height: 1.1rem;
                    cursor: pointer;
                }

                .reasoning-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1.25rem;
                    border-radius: 12px;
                    transition: transform 0.2s;
                }

                .reasoning-card:hover {
                    transform: translateY(-2px);
                }

                .reasoning-title {
                    font-size: 0.95rem;
                    font-weight: 700;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .reasoning-card p {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    margin: 0;
                }

                /* Specific Colors for Reasoning Cards */
                .reasoning-card.problem {
                    border-top: 3px solid #f87171; /* Red for Problem */
                }

                .reasoning-card.solution {
                    border-top: 3px solid #34d399; /* Green for Solution */
                }

                .reasoning-card.tradeoffs {
                    border-top: 3px solid #fb923c; /* Orange for Trade-offs */
                }

            `}</style>
        </div>
    );
};

export default BackendMasteryGraph;
