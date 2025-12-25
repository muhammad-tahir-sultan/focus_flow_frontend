import { useState } from 'react';
import { createPortal } from 'react-dom';

// ------------------- TYPES -------------------

interface SubTopic {
    title: string;
    description: string;
    isKey: boolean;
}

interface ProjectValues {
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    timeline: string;
    techStack: string[];
}

interface ProjectDetail {
    title: string;
    subtitle: string;
    values: ProjectValues;
    objectives: SubTopic[];
    reasoning: {
        scenario: string;
        challenge: string;
        solution: string;
    };
    milestones: { title: string; checked: boolean }[];
}

interface RoadmapNode {
    id: string;
    label: string;
    description: string;
    x: number;
    y: number;
    connections: string[];
    category: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// ------------------- DATA -------------------

const PROJECT_DETAILS: Record<string, ProjectDetail> = {
    'task-api': {
        title: 'Task Management API',
        subtitle: 'The "Hello World" of Backend Engineering',
        values: {
            difficulty: 'Beginner',
            timeline: '1 Week',
            techStack: ['Node.js', 'Express/NestJS', 'PostgreSQL', 'JWT']
        },
        objectives: [
            { title: 'CRUD Operations', description: 'Create, Read, Update, Delete tasks efficiently.', isKey: true },
            { title: 'Authentication', description: 'Secure user login with JWT & bcrypt.', isKey: true },
            { title: 'Data Validation', description: 'Using Zod or class-validator to sanitize inputs.', isKey: true },
            { title: 'Error Handling', description: 'Global error filters and status codes.', isKey: false }
        ],
        reasoning: {
            scenario: "Every app needs a way to store and retrieve data securely for specific users.",
            challenge: "Handling basic HTTP request flows, validating untrusted user input, and managing user sessions without storing passwords in plain text.",
            solution: "A RESTful API with a structured controller-service-repository pattern and robust middleware for AuthN/AuthZ."
        },
        milestones: [
            { title: "Day 1: Setup NestJS/Express project & DB Connection", checked: false },
            { title: "Day 2: Implement User Registration & Login (JWT)", checked: false },
            { title: "Day 3: CRUD for Tasks (protected routes)", checked: false },
            { title: "Day 4: Add Validation Pipes & Error Handling", checked: false },
            { title: "Day 5: Write Integration Tests for endpoints", checked: false }
        ]
    },
    'chat-app': {
        title: 'Real-time Chat System',
        subtitle: 'Breaking the Request-Response Cycle',
        values: {
            difficulty: 'Intermediate',
            timeline: '2 Weeks',
            techStack: ['WebSockets (Socket.io)', 'Redis', 'MongoDB']
        },
        objectives: [
            { title: 'WebSockets', description: 'Bidirectional communication for instant messaging.', isKey: true },
            { title: 'Redis Pub/Sub', description: 'Scaling WebSockets across multiple server instances.', isKey: true },
            { title: 'Message Persistence', description: 'Storing chat history efficiently.', isKey: false },
            { title: 'Online Presence', description: 'Tracking who is currently active.', isKey: false }
        ],
        reasoning: {
            scenario: "Users expect instant updates. Refreshing the page to see new messages is unacceptable.",
            challenge: "HTTP is stateless and request-driven. Maintaining open connections for thousands of users and broadcasting messages in real-time is resource-intensive.",
            solution: "Stateful WebSocket connections handled by an event-driven architecture, using Redis to broadcast events between disparate server nodes."
        },
        milestones: [
            { title: "Week 1: Build basic Socket.io server & client", checked: false },
            { title: "Week 1: Implement 1-on-1 private messaging", checked: false },
            { title: "Week 2: Integrate Redis Adapter for horizontal scaling", checked: false },
            { title: "Week 2: Add 'Typing...' indicators and Read Receipts", checked: false }
        ]
    },
    'ecommerce': {
        title: 'E-commerce Engine',
        subtitle: 'Handling Money & Complex Data',
        values: {
            difficulty: 'Intermediate',
            timeline: '3 Weeks',
            techStack: ['PostgreSQL', 'Stripe API', 'BullMQ (Queues)', 'Redis']
        },
        objectives: [
            { title: 'ACID Transactions', description: 'Ensuring inventory and payments are perfectly synced.', isKey: true },
            { title: 'Complex Queries', description: 'Filtering, sorting, and paginating thousands of products.', isKey: true },
            { title: 'Payment Integration', description: 'Securely handling webhooks from Stripe.', isKey: true },
            { title: 'Background Jobs', description: 'Sending order confirmation emails asynchronously.', isKey: false }
        ],
        reasoning: {
            scenario: "A user buys the last item. Concurrently, another user tries to buy it. Double-selling is a disaster.",
            challenge: "Race conditions in inventory management and ensuring distributed integrity between your DB and the Payment Gateway.",
            solution: "Database transactions (Row-level locking) alongside idempotent webhook handlers and message queues for non-critical side effects."
        },
        milestones: [
            { title: "Week 1: Database Schema Design (Products, Orders, Users)", checked: false },
            { title: "Week 1: Advanced Filtering API (Price, Category, Ratings)", checked: false },
            { title: "Week 2: Implement Stripe Checkout & Webhook handling", checked: false },
            { title: "Week 3: Use BullMQ for transactional emails", checked: false }
        ]
    },
    'social-feed': {
        title: 'High-Scale Social Feed',
        subtitle: 'Optimization & Caching Strategies',
        values: {
            difficulty: 'Advanced',
            timeline: '3 - 4 Weeks',
            techStack: ['Neo4j/Postgres', 'Redis (Caching)', 'ElasticSearch']
        },
        objectives: [
            { title: 'Feed Generation', description: 'Fan-out-on-write vs Fan-out-on-read strategies.', isKey: true },
            { title: 'Caching Patterns', description: 'Implement Cache-Aside and Thundering Herd protection.', isKey: true },
            { title: 'Search', description: 'Full-text search implementation.', isKey: false },
            { title: 'Pagination', description: 'Cursor-based pagination for infinite scroll.', isKey: true }
        ],
        reasoning: {
            scenario: "Fetching a timeline by querying 'Friends of Friends' via SQL JOINs is too slow at scale.",
            challenge: "Generating feeds for users with 1M+ followers instantly while maintaining fresh content.",
            solution: "Hybrid approach: Pre-computing feeds (Push) for active users and caching them in Redis, while using specialized search engines (Elastic) for discovery."
        },
        milestones: [
            { title: "Week 1: Implement Cursor-based pagination API", checked: false },
            { title: "Week 2: Build 'Fan-out-on-write' service for post distribution", checked: false },
            { title: "Week 3: Integrate Redis for feed caching", checked: false },
            { title: "Week 4: Add Full-text search for posts/users", checked: false }
        ]
    },
    'video-stream': {
        title: 'Video Streaming Service',
        subtitle: 'Handling Large Binary Data',
        values: {
            difficulty: 'Advanced',
            timeline: '3 Weeks',
            techStack: ['Node.js Streams', 'FFmpeg', 'AWS S3', 'CDN']
        },
        objectives: [
            { title: 'Streaming API', description: 'Implement HTTP Range requests (206 Partial Content).', isKey: true },
            { title: 'Transcoding', description: 'Converting video formats with FFmpeg.', isKey: true },
            { title: 'Storage', description: 'Uploading large files to S3 with multipart upload.', isKey: true },
            { title: 'CDN', description: 'Serving content from the edge.', isKey: false }
        ],
        reasoning: {
            scenario: "You can't load a 2GB movie into RAM to serve it. Users want to seek/skip instantly.",
            challenge: "Memory management and bandwidth optimization. Processing video requires heavy CPU usage that blocks the Node.js event loop.",
            solution: "Using Node.js Streams to pipe data directly to response. Offloading CPU tasks (FFmpeg) to child processes or worker threads."
        },
        milestones: [
            { title: "Week 1: Implement basic video streaming (Range headers)", checked: false },
            { title: "Week 2: File upload service (Chunked uploads)", checked: false },
            { title: "Week 3: Integrate FFmpeg for quality transcoding", checked: false }
        ]
    },
    'uber-clone': {
        title: 'Ride-Sharing System',
        subtitle: 'Geo-spatial & Microservices',
        values: {
            difficulty: 'Expert',
            timeline: '4+ Weeks',
            techStack: ['Microservices', 'Kafka', 'PostGIS', 'gRPC']
        },
        objectives: [
            { title: 'Geo-spatial Queries', description: 'Finding nearest drivers efficiently.', isKey: true },
            { title: 'Event-Driven', description: 'Kafka for matching engine events.', isKey: true },
            { title: 'Microservices', description: 'Separating Auth, Rides, and Payments services.', isKey: true },
            { title: 'Distributed Tracing', description: 'Observability across services.', isKey: false }
        ],
        reasoning: {
            scenario: "Matching a rider with a driver in seconds while tracking location updates in real-time.",
            challenge: "Geospatial indexing updates at high frequency. Coordinating state across multiple independent services.",
            solution: "PostGIS for spatial data. Event sourcing with Kafka to handle high-throughput location updates. gRPC for low-latency inter-service communication."
        },
        milestones: [
            { title: "Week 1: Design Microservices Arch & Proto files", checked: false },
            { title: "Week 2: Implement Driver Location service with PostGIS", checked: false },
            { title: "Week 3: Build Matching Engine with Kafka consumer/producer", checked: false },
            { title: "Week 4: Tie it all together with an API Gateway", checked: false }
        ]
    },
    'cicd-platform': {
        title: 'CI/CD & Monitoring',
        subtitle: 'Automating the Path to Production',
        values: {
            difficulty: 'Intermediate',
            timeline: '2 Weeks',
            techStack: ['Docker', 'GitHub Actions', 'Prometheus', 'Grafana']
        },
        objectives: [
            { title: 'Pipeline as Code', description: 'Automated testing and building with yaml.', isKey: true },
            { title: 'Containerization', description: 'Optimizing Docker images for production.', isKey: true },
            { title: 'Observability', description: 'Scraping metrics and visualizing dashboards.', isKey: true },
            { title: 'Alerting', description: 'Notifying on high error rates or latency.', isKey: false }
        ],
        reasoning: {
            scenario: "Code works on your machine, but crashes in production. You find out 4 hours later from angry user emails.",
            challenge: "Manual deployments are slow and error-prone. Blindly running servers without metrics is a recipe for disaster.",
            solution: "A fully automated CI/CD pipeline for reliable deployments, paired with a Prometheus/Grafana stack for real-time visibility."
        },
        milestones: [
            { title: "Week 1: Write Dockerfiles & Compose for an existing app", checked: false },
            { title: "Week 1: Create a GitHub Action to run tests & build images", checked: false },
            { title: "Week 2: Deploy Prometheus & integrate node-exporter", checked: false },
            { title: "Week 2: Build a Grafana dashboard for API latency/RPS", checked: false }
        ]
    },
    'collab-editor': {
        title: 'Collaborative Text Editor',
        subtitle: 'Mastering Concurrency & CRDTs',
        values: {
            difficulty: 'Advanced',
            timeline: '3 Weeks',
            techStack: ['WebSockets', 'CRDTs (Yjs)', 'Redis', 'React']
        },
        objectives: [
            { title: 'Conflict Resolution', description: 'Handling simultaneous edits without locking.', isKey: true },
            { title: 'CRDTs', description: 'Conflict-free Replicated Data Types deep dive.', isKey: true },
            { title: 'Presence', description: 'Showing live cursors of other users.', isKey: false },
            { title: 'Snapshots', description: 'Saving document state efficiently.', isKey: false }
        ],
        reasoning: {
            scenario: "Two users type 'Hello' at the same time. One sees 'HHello', the other sees 'Hehllo'.",
            challenge: "Real-time synchronization without a central locking mechanism (which kills UX). Latency makes ordering events difficult.",
            solution: "Using CRDTs (like Yjs) to mathematically guarantee eventual consistency across all clients, regardless of network timing."
        },
        milestones: [
            { title: "Week 1: Implement basic WebSocket sync", checked: false },
            { title: "Week 2: Integrate Yjs for simple text sync", checked: false },
            { title: "Week 2: Add Awareness (Cursors/Selection) support", checked: false },
            { title: "Week 3: Persist document updates to a Database", checked: false }
        ]
    },
    'kv-store': {
        title: 'Distributed Key-Value Store',
        subtitle: 'Build your own Redis',
        values: {
            difficulty: 'Expert',
            timeline: '4 - 5 Weeks',
            techStack: ['TCP/UDP', 'C++ or Node', 'Raft Consensus', 'WAL']
        },
        objectives: [
            { title: 'Custom Protocol', description: 'Designing a binary wire protocol.', isKey: true },
            { title: 'Storage Engine', description: 'LSM Trees or Hash Maps for persistence.', isKey: true },
            { title: 'Replication', description: 'Leader-Follower replication logic.', isKey: true },
            { title: 'Consensus', description: 'Implementing Raft for fault tolerance.', isKey: true }
        ],
        reasoning: {
            scenario: "You rely on Redis/Postgres, but do you know how they handle data corruption or network partitions?",
            challenge: "Building a database requires understanding file I/O, memory management, and distributed consensus algorithms from scratch.",
            solution: "A custom in-memory KV store that supports SET/GET, persistence via Write-Ahead-Logs (WAL), and basic replication."
        },
        milestones: [
            { title: "Week 1: Build a TCP server handling custom commands", checked: false },
            { title: "Week 2: Implement an in-memory Hash Table", checked: false },
            { title: "Week 3: Add Write-Ahead-Logging (WAL) for durability", checked: false },
            { title: "Week 4: Implement basic Master-Slave Replication", checked: false }
        ]
    },
    'notification-sys': {
        title: 'Distributed Notification Service',
        subtitle: 'The Central Nervous System',
        values: {
            difficulty: 'Intermediate',
            timeline: '2 Weeks',
            techStack: ['RabbitMQ/Kafka', 'Redis', 'Twilio/SendGrid', 'Webhooks']
        },
        objectives: [
            { title: 'Message Queues', description: 'Decoupling producers from consumers.', isKey: true },
            { title: 'Rate Limiting', description: 'Preventing span for users.', isKey: true },
            { title: 'Preferences', description: 'Managing user opt-ins for Email/SMS/Push.', isKey: false },
            { title: 'Retry Logic', description: 'Exponential backoff for failed deliveries.', isKey: true }
        ],
        reasoning: {
            scenario: "A user gets 50 emails in 1 minute because a loop went wrong. Or the system crashes trying to send 1M distinct newsletters.",
            challenge: "High throughput delivery, preventing duplication (idempotency), and respecting third-party API rate limits.",
            solution: "An asynchronous queue-based architecture with separate workers for each channel (Email, SMS) and a robust retry mechanism."
        },
        milestones: [
            { title: "Week 1: Setup RabbitMQ/Kafka producer", checked: false },
            { title: "Week 1: Build flexible templating engine", checked: false },
            { title: "Week 2: Implement Rate Limiting middleware", checked: false },
            { title: "Week 2: Add failure queues (DLQ) and retries", checked: false }
        ]
    },
    'rate-limiter': {
        title: 'API Rate Limiter Service',
        subtitle: 'Middleware at Scale',
        values: {
            difficulty: 'Advanced',
            timeline: '1 - 2 Weeks',
            techStack: ['Redis (Lua)', 'Go/Node', 'Nginx']
        },
        objectives: [
            { title: 'Algorithms', description: 'Token Bucket, Leaky Bucket, Fixed Window.', isKey: true },
            { title: 'Distributed Counting', description: 'Synchronizing limits across multiple server nodes.', isKey: true },
            { title: 'Low Latency', description: 'Adding <10ms overhead to requests.', isKey: true },
            { title: 'Configuration', description: 'Dynamic rules per user/IP/Route.', isKey: false }
        ],
        reasoning: {
            scenario: "Competitor scrapes your API 1000 times/second, bringing down the DB for legit users.",
            challenge: "Counting requests accurately in a distributed environment without locking the database or slowing down requests.",
            solution: "High-performance in-memory counting (Redis) using atomic operations or Lua scripts to enforce quotas."
        },
        milestones: [
            { title: "Week 1: Implement Fixed Window counter", checked: false },
            { title: "Week 1: Upgrade to Sliding Window (Token Bucket)", checked: false },
            { title: "Week 2: Write Lua scripts for atomicity", checked: false }
        ]
    },
    'file-storage': {
        title: 'File Storage System',
        subtitle: 'Dropbox/Google Drive Clone',
        values: {
            difficulty: 'Advanced',
            timeline: '3 Weeks',
            techStack: ['S3/MinIO', 'CDC (Chunking)', 'Merkle Trees']
        },
        objectives: [
            { title: 'Chunking', description: 'Content-Defined Chunking for deduplication.', isKey: true },
            { title: 'Sync Algorithm', description: 'Efficiently syncing changed parts of files.', isKey: true },
            { title: 'Metadata', description: 'Separating file structure from binary blobs.', isKey: false },
            { title: 'Resumable Uploads', description: 'Handling network interruptions.', isKey: true }
        ],
        reasoning: {
            scenario: "Uploading a 10GB file fails at 99%. Do you restart? Storing the same viral video 1M times wastes petabytes.",
            challenge: "Bandwidth efficiency, storage costs, and reliability of large binary transfers.",
            solution: "Breaking files into chunks based on content (CDC), hashing them for deduplication, and adhering to the S3 multipart upload protocol."
        },
        milestones: [
            { title: "Week 1: Basic multipart upload/download API", checked: false },
            { title: "Week 2: Implement Deduplication logic", checked: false },
            { title: "Week 3: Build a Sync client (CLI or Desktop)", checked: false }
        ]
    },
    'web-crawler': {
        title: 'Distributed Web Crawler',
        subtitle: 'Indexing the Internet',
        values: {
            difficulty: 'Expert',
            timeline: '4 Weeks',
            techStack: ['Kafka', 'Puppeteer/Playwright', 'Cassandra', 'Bloom Filters']
        },
        objectives: [
            { title: 'Frontier Management', description: 'URL scheduling and prioritization.', isKey: true },
            { title: 'Politeness', description: 'Respecting robots.txt and rate limits.', isKey: true },
            { title: 'Duplicate Detection', description: 'Bloom filters for visited URLs.', isKey: true },
            { title: 'Parsing', description: 'Extracting data from messy HTML.', isKey: false }
        ],
        reasoning: {
            scenario: "Build a search engine for a niche topic. You need to visit 1M pages without getting banned or stuck in loops.",
            challenge: "The web is infinite and messy. Managing a queue of URLs to visit across multiple workers is a graph traversal problem at massive scale.",
            solution: "A URL Frontier managed by Kafka/Redis, distributed workers for fetching/parsing, and probabalistic data structures (Bloom Filters) to track history."
        },
        milestones: [
            { title: "Week 1: Build URL Frontier and basic fetcher", checked: false },
            { title: "Week 2: Implement Robots.txt parsing & Politeness", checked: false },
            { title: "Week 3: Add Bloom Filter for visited set", checked: false },
            { title: "Week 4: Scale to multiple worker nodes", checked: false }
        ]
    },
    'deployment-platform': {
        title: 'Serverless Platform (Vercel Clone)',
        subtitle: 'Container Orchestration & Build Systems',
        values: {
            difficulty: 'Expert',
            timeline: '5+ Weeks',
            techStack: ['Kubernetes/Nomad', 'Docker API', 'AWS Firecracker', 'Wildcard DNS']
        },
        objectives: [
            { title: 'Isolation', description: 'Running untrusted user code securely.', isKey: true },
            { title: 'Build Pipeline', description: 'Converting Git repos to Docker images.', isKey: true },
            { title: 'Traffic Routing', description: 'Mapping subdomains to containers dynamically.', isKey: true },
            { title: 'Cold Starts', description: 'Optimizing startup time.', isKey: true }
        ],
        reasoning: {
            scenario: "Users want to push code and see it live on a custom domain in seconds.",
            challenge: "Security (running arbitrary code) and multi-tenancy. Routing traffic instantly to ephemeral containers.",
            solution: "Using lightweight micro-VMs (Firecracker) or containers for isolation. A reverse proxy that dynamically routes `project.platform.com` to internal container IPs."
        },
        milestones: [
            { title: "Week 1: Build service to clone repo & build Docker image", checked: false },
            { title: "Week 2: Dynamic reverse proxy for subdomains", checked: false },
            { title: "Week 3: Orchestrate containers on demand", checked: false },
            { title: "Week 4: Scale down to zero (Serverless)", checked: false }
        ]
    },
    'ticket-booking': {
        title: 'High-Concurrency Ticket System',
        subtitle: 'Solving the "Taylor Swift" Problem',
        values: {
            difficulty: 'Expert',
            timeline: '3 - 4 Weeks',
            techStack: ['Postgres (Isolation Levels)', 'Redis Locks', 'WebSockets']
        },
        objectives: [
            { title: 'Concurrency Control', description: 'Optimistic vs Pessimistic Locking.', isKey: true },
            { title: 'Inventory Management', description: 'Preventing overselling of seats.', isKey: true },
            { title: 'Virtual Queue', description: 'Throttling users before they enter.', isKey: true },
            { title: 'Payment State', description: 'Handling payment timeouts.', isKey: false }
        ],
        reasoning: {
            scenario: "100,000 fans click 'Buy' on 500 seats at the exact same millisecond.",
            challenge: "Race conditions. Standard logic will oversell the venue instantly.",
            solution: "Database row-locking, distributed locks with Redis for hold-reservations, and a virtual waiting room to smooth out traffic spikes."
        },
        milestones: [
            { title: "Week 1: basic booking flow (with race conditions)", checked: false },
            { title: "Week 2: Implement Redis Distributed Locks", checked: false },
            { title: "Week 3: Add Virtual Queue mechanism", checked: false },
            { title: "Week 4: Stress test with JMeter/k6", checked: false }
        ]
    }
};

const NODES: RoadmapNode[] = [
    // Phase 1: Beginner
    { id: 'task-api', label: '1. Task API', description: 'Auth, CRUD, DB', category: 'beginner', x: 50, y: 1, connections: ['notification-sys', 'chat-app'] },

    // Phase 2: Intermediate (Communication)
    { id: 'notification-sys', label: '2. Notification Sys', description: 'Queues & Retries', category: 'intermediate', x: 25, y: 2, connections: ['ecommerce'] },
    { id: 'chat-app', label: '3. Real-time Chat', description: 'WebSockets', category: 'intermediate', x: 75, y: 2, connections: ['collab-editor'] },

    // Phase 3: Intermediate (Logic)
    { id: 'ecommerce', label: '4. E-commerce API', description: 'Transactions', category: 'intermediate', x: 25, y: 3, connections: ['rate-limiter', 'cicd-platform'] },
    { id: 'collab-editor', label: '5. Collab Editor', description: 'CRDTs', category: 'advanced', x: 75, y: 3, connections: ['video-stream'] },

    // Phase 4: Advanced (Infrastructure)
    { id: 'rate-limiter', label: '6. Rate Limiter', description: 'Caching & Lua', category: 'advanced', x: 15, y: 4, connections: ['deployment-platform'] },
    { id: 'cicd-platform', label: '7. CI/CD Pipeline', description: 'Docker & Metrics', category: 'intermediate', x: 50, y: 4, connections: ['deployment-platform'] },
    { id: 'video-stream', label: '8. Video Streaming', description: 'Streams & I/O', category: 'advanced', x: 85, y: 4, connections: ['file-storage'] },

    // Phase 5: Advanced (Storage)
    { id: 'deployment-platform', label: '9. Vercel Clone', description: 'Orchestration', category: 'expert', x: 30, y: 5, connections: ['kv-store'] },
    { id: 'file-storage', label: '10. Storage System', description: 'Dedup & Sync', category: 'advanced', x: 70, y: 5, connections: ['social-feed'] },

    // Phase 6: Expert (Internals)
    { id: 'kv-store', label: '11. KV Store', description: 'DB Internals', category: 'expert', x: 30, y: 6, connections: ['uber-clone'] },
    { id: 'social-feed', label: '12. Social Feed', description: 'Massive Scale', category: 'advanced', x: 70, y: 6, connections: ['web-crawler'] },

    // Phase 7: Expert (Systems)
    { id: 'uber-clone', label: '13. Uber Clone', description: 'Geo & Microservices', category: 'expert', x: 30, y: 7, connections: ['ticket-booking'] },
    { id: 'web-crawler', label: '14. Web Crawler', description: 'Distributed Graph', category: 'expert', x: 70, y: 7, connections: ['ticket-booking'] },

    // Phase 8: Mastery
    { id: 'ticket-booking', label: '15. Ticket System', description: 'Extreme Concurrency', category: 'expert', x: 50, y: 8, connections: [] },
];


// ------------------- COMPONENT -------------------

const ProjectModal = ({ nodeId, onClose }: { nodeId: string; onClose: () => void }) => {
    const detail = PROJECT_DETAILS[nodeId];
    if (!detail) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-roadmap" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <header className="modal-header">
                    <div className="header-top-row">
                        <div className="modal-subtitle">{detail.subtitle}</div>
                        <div className="difficulty-badge" data-level={detail.values.difficulty}>
                            {detail.values.difficulty}
                        </div>
                    </div>
                    <h2 className="modal-title">{detail.title}</h2>

                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="stat-icon">⏱️</span>
                            <span>{detail.values.timeline}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">🛠️</span>
                            <span>{detail.values.techStack.join(', ')}</span>
                        </div>
                    </div>
                </header>

                <div className="modal-body">
                    {/* Reasoning Section relative to Project */}
                    <div className="reasoning-section">
                        <div className="reasoning-grid">
                            <div className="reasoning-card problem">
                                <h4 className="reasoning-title">🎯 The Scenario</h4>
                                <p>{detail.reasoning.scenario}</p>
                            </div>
                            <div className="reasoning-card solution">
                                <h4 className="reasoning-title">🔥 The Challenge</h4>
                                <p>{detail.reasoning.challenge}</p>
                            </div>
                            <div className="reasoning-card tradeoffs">
                                <h4 className="reasoning-title">💡 The Solution</h4>
                                <p>{detail.reasoning.solution}</p>
                            </div>
                        </div>
                    </div>

                    {/* Milestones */}
                    <div className="checklist-section">
                        <h3 className="section-heading">🚩 Project Milestones</h3>
                        <div className="checklist-grid">
                            {detail.milestones.map((item, idx) => (
                                <div key={idx} className="checklist-item">
                                    <input type="checkbox" id={`chk-${idx}`} className="custom-checkbox" defaultChecked={item.checked} />
                                    <label htmlFor={`chk-${idx}`}>{item.title}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className="section-heading">Key Technical Objectives</h3>
                    <div className="topics-grid">
                        {detail.objectives.map((topic, idx) => (
                            <div key={idx} className={`topic-card ${topic.isKey ? 'key-topic' : ''}`}>
                                {topic.isKey && <div className="key-badge">CRITICAL</div>}
                                <h4>{topic.title}</h4>
                                <p>{topic.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
};

const ProjectMasteryGraph = () => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    return (
        <div className="backend-graph-page">
            <style>{`
                .backend-graph-page {
                    min-height: 100vh;
                    background: #09090b;
                    color: #fff;
                    padding: 2rem;
                    font-family: 'Inter', sans-serif;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .page-title {
                    font-size: 2.5rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.5rem;
                }

                .page-subtitle {
                    color: #a1a1aa;
                    font-size: 1.1rem;
                }

                .graph-scroll-container {
                    background: #0f0f13;
                    border: 1px solid #27272a;
                    border-radius: 20px;
                    padding: 2rem;
                    overflow: auto;
                    position: relative;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                .graph-scroll-container::-webkit-scrollbar {
                    display: none;
                }

                .graph-diagram {
                    position: relative;
                    min-width: 1000px;
                    margin: 0 auto;
                    width: 100%;
                    height: 1400px; /* Increased height for 8 levels */
                }

                .connections-layer {
                    position: absolute;
                    top: 0; left: 0; width: 100%; height: 100%;
                    z-index: 0; pointer-events: none;
                }

                .connector-line {
                    stroke: #3f3f46; stroke-width: 2; stroke-dasharray: 4;
                    animation: dash 60s linear infinite;
                }

                @keyframes dash { to { stroke-dashoffset: 1000; } }

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
                    padding: 1.25rem 1.5rem;
                    border-radius: 12px;
                    min-width: 240px;
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

                .node-label {
                    font-weight: 700;
                    font-size: 1rem;
                    color: #e4e4e7;
                    margin-bottom: 0.25rem;
                }

                .node-desc {
                    font-size: 0.8rem;
                    color: #71717a;
                }
                
                /* Categories */
                .category-beginner .node-box { border-left: 4px solid #34d399; }
                .category-intermediate .node-box { border-left: 4px solid #60a5fa; }
                .category-advanced .node-box { border-left: 4px solid #f472b6; }
                .category-expert .node-box { border-left: 4px solid #fb923c; background: linear-gradient(135deg, #1f1f22 0%, #2a2a2e 100%); }

                /* Modal Styles Reuse */
                .modal-overlay {
                    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    z-index: 9999;
                    display: flex; align-items: center; justify-content: center;
                    padding: 1rem;
                    animation: fadeIn 0.3s ease;
                }

                .modal-content-roadmap {
                    background: #18181b;
                    width: 100%; max-width: 900px; max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 24px;
                    border: 1px solid #3f3f46;
                    position: relative;
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(50px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .close-btn {
                    position: absolute; top: 1.5rem; right: 1.5rem;
                    background: rgba(255,255,255,0.1); border: none;
                    width: 36px; height: 36px; border-radius: 50%;
                    color: white; font-size: 1.5rem; cursor: pointer;
                    transition: background 0.2s; z-index: 10;
                }
                .close-btn:hover { background: rgba(255,255,255,0.2); }

                .modal-header {
                    padding: 3rem 2.5rem;
                    background: linear-gradient(to bottom, #27272a, #18181b);
                    border-bottom: 1px solid #3f3f46;
                }

                .header-top-row {
                    display: flex; justify-content: space-between; align-items: flex-start;
                    margin-bottom: 0.5rem;
                }

                .modal-subtitle {
                    color: #a1a1aa; text-transform: uppercase;
                    font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em;
                }

                .difficulty-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 99px;
                    font-size: 0.75rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }
                
                .difficulty-badge[data-level="Beginner"] { background: rgba(52, 211, 153, 0.1); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.2); }
                .difficulty-badge[data-level="Intermediate"] { background: rgba(96, 165, 250, 0.1); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.2); }
                .difficulty-badge[data-level="Advanced"] { background: rgba(244, 114, 182, 0.1); color: #f472b6; border: 1px solid rgba(244, 114, 182, 0.2); }
                .difficulty-badge[data-level="Expert"] { background: rgba(251, 146, 60, 0.1); color: #fb923c; border: 1px solid rgba(251, 146, 60, 0.2); }

                .modal-title {
                    font-size: 2.5rem; font-weight: 800; color: white; margin: 0.5rem 0 1.5rem 0;
                    letter-spacing: -0.02em;
                }

                .stats-row {
                    display: flex; gap: 1.5rem; flex-wrap: wrap;
                }
                
                .stat-item {
                    display: flex; align-items: center; gap: 0.5rem;
                    background: rgba(255, 255, 255, 0.05);
                    padding: 0.5rem 1rem; border-radius: 8px;
                    font-size: 0.9rem; color: #e4e4e7;
                }

                .modal-body { padding: 2.5rem; }

                /* Reasoning Grid */
                .reasoning-section { margin-bottom: 3rem; }
                .reasoning-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
                .reasoning-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 1.25rem; border-radius: 12px;
                }
                .reasoning-title { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; color: #fff; }
                .reasoning-card p { font-size: 0.9rem; color: #a1a1aa; line-height: 1.6; margin: 0; }
                
                .reasoning-card.problem { border-top: 3px solid #60a5fa; }
                .reasoning-card.solution { border-top: 3px solid #f87171; }
                .reasoning-card.tradeoffs { border-top: 3px solid #34d399; }

                /* Checklist/Milestones */
                .checklist-section { margin-bottom: 3rem; }
                .section-heading {
                    font-size: 1.2rem; font-weight: 700; color: white;
                    margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;
                }
                .checklist-grid { display: grid; grid-template-columns: 1fr; gap: 0.5rem; }
                .checklist-item {
                    display: flex; align-items: center; gap: 1rem;
                    padding: 1rem; background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;
                    transition: background 0.2s;
                }
                .checklist-item:hover { background: rgba(255,255,255,0.06); }
                .checklist-item label { color: #d4d4d8; font-size: 0.95rem; cursor: pointer; flex: 1; }
                .custom-checkbox { width: 1.2rem; height: 1.2rem; accent-color: #8b5cf6; cursor: pointer; }

                /* Topics Grid */
                .topics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
                .topic-card {
                    background: #27272a; padding: 1.5rem; border-radius: 16px; border: 1px solid #3f3f46;
                    position: relative; overflow: hidden;
                }
                .topic-card.key-topic { border-color: #8b5cf6; background: linear-gradient(145deg, #27272a 0%, #2e2e33 100%); }
                .key-badge {
                    position: absolute; top: 1rem; right: 1rem;
                    background: #8b5cf6; color: white; font-size: 0.65rem;
                    font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 99px;
                }
                .topic-card h4 { color: white; margin: 0 0 0.5rem 0; font-size: 1rem; }
                .topic-card p { color: #a1a1aa; font-size: 0.9rem; margin: 0; line-height: 1.5; }

                @media (max-width: 768px) {
                    .reasoning-grid, .topics-grid { grid-template-columns: 1fr; }
                    .modal-title { font-size: 1.75rem; }
                    .stats-row { flex-direction: column; gap: 0.75rem; }
                }
            `}</style>

            <header className="page-header">
                <h1 className="page-title">Project Mastery Roadmap</h1>
                <p className="page-subtitle">Build these 6 systems to prove your engineering expertise.</p>
            </header>

            <div className="graph-scroll-container">
                <div className="graph-diagram">
                    <svg className="connections-layer">
                        {NODES.map(node =>
                            node.connections.map(targetId => {
                                const target = NODES.find(n => n.id === targetId);
                                if (!target) return null;
                                return (
                                    <line
                                        key={`${node.id}-${targetId}`}
                                        x1={`${node.x}%`} y1={(node.y * 150)}
                                        x2={`${target.x}%`} y2={(target.y * 150)}
                                        className="connector-line"
                                    />
                                );
                            })
                        )}
                    </svg>

                    {NODES.map(node => (
                        <div
                            key={node.id}
                            className={`roadmap-node-wrapper category-${node.category}`}
                            style={{ left: `${node.x}%`, top: `${node.y * 150}px` }}
                            onClick={() => setSelectedNodeId(node.id)}
                        >
                            <div className="node-box">
                                <div className="node-label">{node.label}</div>
                                <div className="node-desc">{node.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedNodeId && (
                <ProjectModal
                    nodeId={selectedNodeId}
                    onClose={() => setSelectedNodeId(null)}
                />
            )}
        </div>
    );
};

export default ProjectMasteryGraph;
