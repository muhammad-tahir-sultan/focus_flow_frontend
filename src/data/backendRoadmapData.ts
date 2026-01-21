import type { NodeDetail, RoadmapNode } from '../types/roadmap';

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
        resources: [
            { name: 'How DNS Works', url: 'https://howdns.works/', type: 'article' },
            { name: 'HTTP/3 Explained', url: 'https://http3-explained.haxx.se/en/', type: 'documentation' }
        ],
        reasoning: {
            problem: "The web feels like magic, but without understanding how packets move through routers and how DNS resolves names, you cannot debug performance or security issues in production.",
            solution: "Learn the foundational protocols (TCP/IP, HTTP/S). Use tools like dig and nslookup to peel back the layers of DNS.",
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
        resources: [
            { name: 'Linux Journey', url: 'https://linuxjourney.com/', type: 'article' },
            { name: 'Command Line Power User', url: 'https://commandlinepoweruser.com/', type: 'video' }
        ],
        reasoning: {
            problem: "Modern backends run on Linux. Relying on GUIs or local 'Windows' environments makes deployment to production (Docker/Cloud) a nightmare of environment mismatches.",
            solution: "Abandon the mouse. Master the Shell. Learn process signals, file permissions, and streams (stdout/stderr) to manage servers efficiently.",
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
        resources: [
            { name: 'Visualizing Git', url: 'https://git-school.github.io/visualizing-git/', type: 'practice' },
            { name: 'Git Branching Game', url: 'https://learngitbranching.js.org/', type: 'practice' }
        ],
        reasoning: {
            problem: "Losing code or breaking a shared codebase due to 'merge conflicts' or 'force pushes' stops development and causes team friction.",
            solution: "Treat Git as a tree of snapshots. Learn rebase for clean history and hooks for automated quality checks before code leaves your machine.",
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
        resources: [
            { name: 'Nginx Fundamentals', url: 'https://www.nginx.com/resources/glossary/reverse-proxy-server/', type: 'article' },
            { name: 'Computer Networking (Khan Academy)', url: 'https://www.khanacademy.org/computing/computers-and-internet', type: 'video' }
        ],
        reasoning: {
            problem: "Basic request/response is easy, but scaling horizontally requires load balancers, reverse proxies, and securing the transport layer with SSL/TLS to prevent man-in-the-middle attacks.",
            solution: "Use Nginx as a gateway. Implement TLS for all connections. Understand the OSI model to troubleshoot where a connection is failing (DNS vs TCP vs Application).",
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
        resources: [
            { name: 'NestJS Official Documentation', url: 'https://docs.nestjs.com/', type: 'documentation' },
            { name: 'Node.js Event Loop Visualizer', url: 'https://www.jsv9000.app/', type: 'practice' }
        ],
        reasoning: {
            problem: "Express is great but lacks structure for large teams. Without a framework like NestJS, backends become a spaghetti mess of inconsistent patterns and difficult-to-test logic.",
            solution: "Leverage NestJS's modularity and Dependency Injection. Understand the Node.js Event Loop to avoid blocking operations that kill throughput.",
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
        resources: [
            { name: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com/', type: 'article' },
            { name: 'Postgres University', url: 'https://pganalyze.com/blog/how-to-learn-postgres-expert', type: 'article' }
        ],
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
        resources: [
            { name: 'MongoDB University', url: 'https://university.mongodb.com/', type: 'practice' },
            { name: 'MongoDB Schema Design Patterns', url: 'https://www.mongodb.com/blog/post/building-with-patterns-a-summary', type: 'article' }
        ],
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
        resources: [
            { name: 'Prisma Data Guide', url: 'https://www.prisma.io/dataguide', type: 'article' },
            { name: 'TypeORM Official Docs', url: 'https://typeorm.io/', type: 'documentation' }
        ],
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
        resources: [
            { name: 'Redis University', url: 'https://university.redis.io/', type: 'practice' },
            { name: 'Caching Strategies Guide', url: 'https://codeahoy.com/2017/08/11/caching-strategies-and-design-patterns/', type: 'article' }
        ],
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
        resources: [
            { name: 'API Design Patterns (Book)', url: 'https://www.manning.com/books/api-design-patterns', type: 'article' },
            { name: 'GraphQL Official Tutorial', url: 'https://graphql.org/learn/', type: 'documentation' }
        ],
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
        resources: [
            { name: 'OWASP Top Ten Project', url: 'https://owasp.org/www-project-top-ten/', type: 'documentation' },
            { name: 'Auth0 Blog - Security Best Practices', url: 'https://auth0.com/blog/', type: 'article' }
        ],
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
        resources: [
            { name: 'Testing Library', url: 'https://testing-library.com/', type: 'documentation' },
            { name: 'Kent C. Dodds - Testing Blog', url: 'https://kentcdodds.com/blog?q=testing', type: 'article' }
        ],
        reasoning: {
            problem: "Refactoring code without tests is like jumping without a parachute. You won't know you broke something until production crashes.",
            solution: "Adopt the Testing Pyramid: Heavy on unit tests, moderate on integration, light on E2E. Use TDD for complex business logic.",
            tradeoffs: "Writing tests takes time (20-30% overhead). Brittle tests that break on every UI change become a maintenance burden."
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
        resources: [
            { name: 'Docker Labs', url: 'https://training.play-with-docker.com/', type: 'practice' }
        ],
        reasoning: {
            problem: "The manual 'It works on my machine' syndrome. Managing dependencies and OS versions across Dev, QA, and Prod lead to 'deployment hell'.",
            solution: "Containerize the app. Docker ensures the exact same environment runs everywhere. Use multi-stage builds to keep production images tiny.",
            tradeoffs: "Layers add storage overhead. Docker on Windows/Mac runs in a VM (performance hit). Networking between containers can be complex."
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
        resources: [
            { name: 'Kubernetes Academy', url: 'https://kubernetes.academy/', type: 'video' },
            { name: 'AWS Skill Builder', url: 'https://explore.skillbuilder.aws/', type: 'practice' }
        ],
        reasoning: {
            problem: "Manually restarting crashed containers and scaling them during a traffic spike is impossible. You need a system that 'self-heals' and scales automatically.",
            solution: "Kubernetes orchestrates containers. It monitors health, restarts failed pods, and manages load balancing and storage across a cluster of machines.",
            tradeoffs: "Kubernetes is notoriously complex ('The steep wall'). Overkill for small apps. Cloud costs (EKS/GKE) add up quickly."
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
        resources: [
            { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'article' },
            { name: 'High Scalability Blog', url: 'http://highscalability.com/', type: 'article' }
        ],
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

export { NODE_DETAILS, NODES };
