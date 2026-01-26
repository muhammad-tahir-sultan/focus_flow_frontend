
export interface ProjectTask {
    id: string;
    text: string;
    subtasks?: ProjectTask[];
}

export interface ProjectSection {
    title: string;
    icon: string;
    color: string;
    items: ProjectTask[];
}

export interface PracticeProject {
    id: string;
    title: string;
    description?: string;
    sections: ProjectSection[];
}

export const practiceProjects: PracticeProject[] = [
    {
        id: 'project-1',
        title: '1️⃣ Slow API Rescue Project (Performance Optimization)',
        sections: [
            {
                title: 'Problem',
                icon: '❌',
                color: '#ff6b6b',
                items: [
                    { id: '1-prob-1', text: 'A startup API takes 800–1500ms for simple list endpoints.' }
                ]
            },
            {
                title: 'What you practice',
                icon: '🎯',
                color: '#4ecdc4',
                items: [
                    { id: '1-prac-1', text: 'Query optimization' },
                    { id: '1-prac-2', text: 'Indexing' },
                    { id: '1-prac-3', text: 'Pagination strategies' },
                    { id: '1-prac-4', text: 'Response shaping' },
                ]
            },
            {
                title: 'Project Tasks',
                icon: '📌',
                color: '#ffe66d',
                items: [
                    {
                        id: '1-task-1', text: 'Build an API with:', subtasks: [
                            { id: '1-task-1a', text: 'Users' },
                            { id: '1-task-1b', text: 'Orders' },
                            { id: '1-task-1c', text: 'Products' },
                        ]
                    },
                    {
                        id: '1-task-2', text: 'Intentionally make it slow:', subtasks: [
                            { id: '1-task-2a', text: 'N+1 queries' },
                            { id: '1-task-2b', text: 'No indexes' },
                            { id: '1-task-2c', text: 'Overfetching data' },
                        ]
                    }
                ]
            },
            {
                title: 'Fixes to Implement',
                icon: '✅',
                color: '#95e1d3',
                items: [
                    { id: '1-fix-1', text: 'MongoDB indexes / PostgreSQL indexes' },
                    { id: '1-fix-2', text: 'Select only required fields' },
                    { id: '1-fix-3', text: 'Cursor-based pagination' },
                    { id: '1-fix-4', text: 'Batch queries' },
                    { id: '1-fix-5', text: 'DataLoader (for GraphQL)' },
                ]
            },
            {
                title: 'Success Criteria',
                icon: '🧪',
                color: '#a8d8ea',
                items: [
                    { id: '1-succ-1', text: 'Reduce response time from >800ms → <200ms' },
                    { id: '1-succ-2', text: 'Measure with logs' },
                    {
                        id: '1-succ-3', text: 'Client-like outcome:', subtasks: [
                            { id: '1-succ-3a', text: '“Reduced API response time by 70%”' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'project-2',
        title: '2️⃣ Authentication & Role Chaos Fix',
        sections: [
            {
                title: 'Problem',
                icon: '❌',
                color: '#ff6b6b',
                items: [
                    {
                        id: '2-prob-1', text: 'Auth works but:', subtasks: [
                            { id: '2-prob-1a', text: 'Roles are hardcoded' },
                            { id: '2-prob-1b', text: 'Guards are duplicated' },
                            { id: '2-prob-1c', text: 'Permissions break when roles change' },
                        ]
                    }
                ]
            },
            {
                title: 'What you practice',
                icon: '🎯',
                color: '#4ecdc4',
                items: [
                    { id: '2-prac-1', text: 'Clean RBAC design' },
                    { id: '2-prac-2', text: 'JWT best practices' },
                    { id: '2-prac-3', text: 'NestJS Guards & Decorators' },
                ]
            },
            {
                title: 'Project Tasks',
                icon: '📌',
                color: '#ffe66d',
                items: [
                    {
                        id: '2-task-1', text: 'Roles:', subtasks: [
                            { id: '2-task-1a', text: 'Admin' },
                            { id: '2-task-1b', text: 'Manager' },
                            { id: '2-task-1c', text: 'User' },
                        ]
                    },
                    {
                        id: '2-task-2', text: 'Permissions:', subtasks: [
                            { id: '2-task-2a', text: 'Create / Read / Update / Delete' }
                        ]
                    }
                ]
            },
            {
                title: 'Fixes to Implement',
                icon: '✅',
                color: '#95e1d3',
                items: [
                    { id: '2-fix-1', text: 'Role-permission mapping' },
                    { id: '2-fix-2', text: '@Roles() decorator' },
                    { id: '2-fix-3', text: 'Global auth guard' },
                    { id: '2-fix-4', text: 'Refresh token rotation' },
                    { id: '2-fix-5', text: 'Token invalidation on role change' },
                ]
            },
            {
                title: 'Success Criteria',
                icon: '🧪',
                color: '#a8d8ea',
                items: [
                    { id: '2-succ-1', text: 'No controller has role logic inside' },
                    { id: '2-succ-2', text: 'Roles are configurable via DB' },
                    {
                        id: '2-succ-3', text: 'Client-like outcome:', subtasks: [
                            { id: '2-succ-3a', text: '“Fixed broken role-based access and made auth scalable”' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'project-3',
        title: '3️⃣ Messy Backend Refactor (Architecture Cleanup)',
        sections: [
            {
                title: 'Problem',
                icon: '❌',
                color: '#ff6b6b',
                items: [
                    {
                        id: '3-prob-1', text: 'A backend where:', subtasks: [
                            { id: '3-prob-1a', text: 'Controllers are fat' },
                            { id: '3-prob-1b', text: 'Business logic everywhere' },
                            { id: '3-prob-1c', text: 'No separation of concerns' },
                        ]
                    }
                ]
            },
            {
                title: 'What you practice',
                icon: '🎯',
                color: '#4ecdc4',
                items: [
                    { id: '3-prac-1', text: 'Clean architecture' },
                    { id: '3-prac-2', text: 'Service boundaries' },
                    { id: '3-prac-3', text: 'Modular NestJS design' },
                ]
            },
            {
                title: 'Project Tasks',
                icon: '📌',
                color: '#ffe66d',
                items: [
                    {
                        id: '3-task-1', text: 'Take a bad codebase and refactor:', subtasks: [
                            { id: '3-task-1a', text: 'Controllers → thin' },
                            { id: '3-task-1b', text: 'Services → business logic' },
                            { id: '3-task-1c', text: 'Repositories → DB access' },
                        ]
                    }
                ]
            },
            {
                title: 'Refactor Rules',
                icon: '✅',
                color: '#95e1d3',
                items: [
                    { id: '3-fix-1', text: 'No DB logic in controllers' },
                    { id: '3-fix-2', text: 'No HTTP logic in services' },
                    { id: '3-fix-3', text: 'Reusable modules' },
                ]
            },
            {
                title: 'Success Criteria',
                icon: '🧪',
                color: '#a8d8ea',
                items: [
                    { id: '3-succ-1', text: 'Easy to add new feature in <30 mins' },
                    { id: '3-succ-2', text: 'Clear folder structure' },
                    {
                        id: '3-succ-3', text: 'Client-like outcome:', subtasks: [
                            { id: '3-succ-3a', text: '“Refactored messy backend into scalable architecture”' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'project-4',
        title: '4️⃣ Production Bug Debugging Simulator',
        sections: [
            {
                title: 'Problem',
                icon: '❌',
                color: '#ff6b6b',
                items: [
                    {
                        id: '4-prob-1', text: 'Random production errors:', subtasks: [
                            { id: '4-prob-1a', text: 'Users get logged out' },
                            { id: '4-prob-1b', text: 'Some requests fail' },
                            { id: '4-prob-1c', text: 'Data inconsistency' },
                        ]
                    }
                ]
            },
            {
                title: 'What you practice',
                icon: '🎯',
                color: '#4ecdc4',
                items: [
                    { id: '4-prac-1', text: 'Debugging skills' },
                    { id: '4-prac-2', text: 'Logs' },
                    { id: '4-prac-3', text: 'Root-cause analysis' },
                ]
            },
            {
                title: 'Project Tasks',
                icon: '📌',
                color: '#ffe66d',
                items: [
                    {
                        id: '4-task-1', text: 'Simulate:', subtasks: [
                            { id: '4-task-1a', text: 'Token expiry edge cases' },
                            { id: '4-task-1b', text: 'Race conditions' },
                            { id: '4-task-1c', text: 'Unhandled promise rejections' },
                        ]
                    }
                ]
            },
            {
                title: 'Fixes to Implement',
                icon: '✅',
                color: '#95e1d3',
                items: [
                    { id: '4-fix-1', text: 'Structured logging' },
                    { id: '4-fix-2', text: 'Centralized error handling' },
                    { id: '4-fix-3', text: 'Retry logic' },
                    { id: '4-fix-4', text: 'Graceful fallbacks' },
                ]
            },
            {
                title: 'Success Criteria',
                icon: '🧪',
                color: '#a8d8ea',
                items: [
                    { id: '4-succ-1', text: 'No unhandled exceptions' },
                    { id: '4-succ-2', text: 'Clear error messages' },
                    {
                        id: '4-succ-3', text: 'Client-like outcome:', subtasks: [
                            { id: '4-succ-3a', text: '“Helped debug and stabilize production backend”' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'project-5',
        title: '5️⃣ Database Performance Doctor',
        sections: [
            {
                title: 'Problem',
                icon: '❌',
                color: '#ff6b6b',
                items: [
                    { id: '5-prob-1', text: 'Database slows down as data grows.' }
                ]
            },
            {
                title: 'What you practice',
                icon: '🎯',
                color: '#4ecdc4',
                items: [
                    { id: '5-prac-1', text: 'Query analysis' },
                    { id: '5-prac-2', text: 'Index strategies' },
                    { id: '5-prac-3', text: 'Schema decisions' },
                ]
            },
            {
                title: 'Project Tasks',
                icon: '📌',
                color: '#ffe66d',
                items: [
                    { id: '5-task-1', text: '1M+ fake records' },
                    {
                        id: '5-task-2', text: 'Slow queries on:', subtasks: [
                            { id: '5-task-2a', text: 'Search' },
                            { id: '5-task-2b', text: 'Filtering' },
                            { id: '5-task-2c', text: 'Sorting' },
                        ]
                    }
                ]
            },
            {
                title: 'Fixes to Implement',
                icon: '✅',
                color: '#95e1d3',
                items: [
                    { id: '5-fix-1', text: 'Compound indexes' },
                    { id: '5-fix-2', text: 'Query rewriting' },
                    { id: '5-fix-3', text: 'Denormalization where needed' },
                    { id: '5-fix-4', text: 'Aggregation pipelines' },
                ]
            },
            {
                title: 'Success Criteria',
                icon: '🧪',
                color: '#a8d8ea',
                items: [
                    { id: '5-succ-1', text: 'Queries stay fast at scale' },
                    {
                        id: '5-succ-2', text: 'Client-like outcome:', subtasks: [
                            { id: '5-succ-2a', text: '“Improved database performance for growing product”' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'project-6',
        title: '6️⃣ GraphQL Performance & N+1 Killer',
        sections: [
            {
                title: 'Problem',
                icon: '❌',
                color: '#ff6b6b',
                items: [
                    { id: '6-prob-1', text: 'GraphQL APIs are flexible but slow.' }
                ]
            },
            {
                title: 'What you practice',
                icon: '🎯',
                color: '#4ecdc4',
                items: [
                    { id: '6-prac-1', text: 'N+1 problem' },
                    { id: '6-prac-2', text: 'Query complexity limits' },
                    { id: '6-prac-3', text: 'Caching' },
                ]
            },
            {
                title: 'Project Tasks',
                icon: '📌',
                color: '#ffe66d',
                items: [
                    { id: '6-task-1', text: 'User → Orders → Products graph' },
                    { id: '6-task-2', text: 'Cause N+1 intentionally' },
                ]
            },
            {
                title: 'Fixes to Implement',
                icon: '✅',
                color: '#95e1d3',
                items: [
                    { id: '6-fix-1', text: 'DataLoader batching' },
                    { id: '6-fix-2', text: 'Depth limits' },
                    { id: '6-fix-3', text: 'Persisted queries' },
                ]
            },
            {
                title: 'Success Criteria',
                icon: '🧪',
                color: '#a8d8ea',
                items: [
                    { id: '6-succ-1', text: 'Constant DB calls regardless of query depth' },
                    {
                        id: '6-succ-2', text: 'Client-like outcome:', subtasks: [
                            { id: '6-succ-2a', text: '“Optimized GraphQL API and eliminated N+1 queries”' }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'project-7',
        title: '7️⃣ Scalability Stress Test Project',
        sections: [
            {
                title: 'Problem',
                icon: '❌',
                color: '#ff6b6b',
                items: [
                    { id: '7-prob-1', text: 'Backend works fine locally but dies under load.' }
                ]
            },
            {
                title: 'What you practice',
                icon: '🎯',
                color: '#4ecdc4',
                items: [
                    { id: '7-prac-1', text: 'Scalability thinking' },
                    { id: '7-prac-2', text: 'Rate limiting' },
                    { id: '7-prac-3', text: 'Connection pooling' },
                ]
            },
            {
                title: 'Project Tasks',
                icon: '📌',
                color: '#ffe66d',
                items: [
                    { id: '7-task-1', text: 'Simulate 1k+ concurrent users' },
                    { id: '7-task-2', text: 'Heavy API usage' },
                ]
            },
            {
                title: 'Fixes to Implement',
                icon: '✅',
                color: '#95e1d3',
                items: [
                    { id: '7-fix-1', text: 'Caching (Redis)' },
                    { id: '7-fix-2', text: 'Rate limiting' },
                    { id: '7-fix-3', text: 'DB connection tuning' },
                ]
            },
            {
                title: 'Success Criteria',
                icon: '🧪',
                color: '#a8d8ea',
                items: [
                    { id: '7-succ-1', text: 'Stable performance under load' },
                    {
                        id: '7-succ-2', text: 'Client-like outcome:', subtasks: [
                            { id: '7-succ-2a', text: '“Made backend scalable and production-ready”' }
                        ]
                    }
                ]
            }
        ]
    }
];
