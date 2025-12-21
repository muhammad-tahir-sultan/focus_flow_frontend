export interface RoadmapItem {
    id: string;
    title: string;
    description: string;
    dailyRoutine: {
        morning: string[];
        afternoon: string[];
        evening: string[];
    };
    weeklyMilestones?: string[];
    resources?: string[];
}

export const roadmaps: Record<string, RoadmapItem> = {
    'income': {
        id: 'income',
        title: '1-Lakh Per Month Income',
        description: 'Generate ₹1,00,000/month from sources other than primary job (Salary: 50k). Focus on freelancing, consulting, or digital products.',
        dailyRoutine: {
            morning: [
                'Check emails/messages for potential leads (15 mins)',
                'Post 1 valuable content piece on LinkedIn/Twitter (30 mins)'
            ],
            afternoon: [
                'Client work or Skill application (1-2 hours)',
                'Proposal writing for 2-3 new prospects'
            ],
            evening: [
                'Follow up with morning leads',
                'Review daily earnings/progress',
                'Plan next day\'s outreach'
            ]
        },
        weeklyMilestones: [
            'Send 50 proposals/week',
            'Secure 1 new meeting/call',
            'Complete 1 small project or milestone'
        ],
        resources: ['Upwork/Fiverr Profiles', 'LinkedIn Sales Navigator', 'Cold Email Templates']
    },
    'physique': {
        id: 'physique',
        title: 'Good Physique',
        description: 'Achieve a healthy, aesthetic, and strong body through consistent training and nutrition.',
        dailyRoutine: {
            morning: [
                'Drink 500ml water immediately',
                'Healthy breakfast (High Protein)',
                'Stretching/Mobility (10 mins)'
            ],
            afternoon: [
                'Lunch (Balanced Macros)',
                'Hydration check (2L so far)'
            ],
            evening: [
                'Workout Session (45-60 mins)',
                'Post-workout protein',
                '7-8 hours of sleep'
            ]
        },
        weeklyMilestones: [
            '4-5 Workout sessions',
            'Meal prep for the week',
            'Measure weight and body fat (optional)'
        ]
    },
    'degree': {
        id: 'degree',
        title: 'Degree Completion',
        description: 'Successfully complete current academic degree with good grades.',
        dailyRoutine: {
            morning: [
                'Review today\'s lecture topics (15 mins)'
            ],
            afternoon: [
                'Attend classes/lectures',
                'Note-taking and active listening'
            ],
            evening: [
                'Study block (1-2 hours)',
                'Complete assignments/projects',
                'Review notes from the day'
            ]
        },
        weeklyMilestones: [
            'Complete all pending assignments',
            'Review one full subject module',
            'Prepare for upcoming quizzes/exams'
        ]
    },
    'english': {
        id: 'english',
        title: 'Good English Communication',
        description: 'Master professional English speaking and writing skills.',
        dailyRoutine: {
            morning: [
                'Read 5 pages of an English book (Fiction/Non-fiction)',
                'Listen to an English podcast (15 mins)'
            ],
            afternoon: [
                'Practice thinking in English during commute/breaks'
            ],
            evening: [
                'Watch 1 English video/episode without subtitles',
                'Mirror technique: Speak to yourself for 10 mins',
                'Write a journal entry in English'
            ]
        },
        resources: ['Duolingo', 'BBC Learning English', 'TED Talks']
    },
    'client-hunting': {
        id: 'client-hunting',
        title: 'Daily Client Hunting',
        description: 'Consistent outreach to find high-paying clients.',
        dailyRoutine: {
            morning: [
                'Identify 5 new potential clients',
                'Research their business/pain points'
            ],
            afternoon: [
                'Send 10 personalized DMs/Emails',
                'Engage with their content (Comments/Likes)'
            ],
            evening: [
                'Track outreach in CRM/Excel',
                'Refine pitch based on responses'
            ]
        },
        weeklyMilestones: [
            '50 Outreach messages sent',
            'Follow up with previous week\'s leads',
            'A/B test different outreach templates'
        ]
    },
    'better-day': {
        id: 'better-day',
        title: 'Being Better Day by Day',
        description: 'Continuous self-improvement and personal growth.',
        dailyRoutine: {
            morning: [
                'Meditation (10 mins)',
                'Gratitude journaling (3 things)'
            ],
            afternoon: [
                'Kindness act (Help someone, compliment)',
                'Mindful breathing break'
            ],
            evening: [
                'Reflection: What went well?',
                'Reflection: What can be improved?',
                'Plan tomorrow'
            ]
        }
    },
    'rate-myself': {
        id: 'rate-myself',
        title: 'Rate Myself (Feedback)',
        description: 'Daily self-assessment to track progress and accountability.',
        dailyRoutine: {
            morning: [
                'Set intention for the day (Score target: 10/10)'
            ],
            afternoon: [
                'Mid-day check-in: Am I on track?'
            ],
            evening: [
                'Rate Productivity (1-10)',
                'Rate Discipline (1-10)',
                'Rate Happiness/Mood (1-10)',
                'Write one sentence on why the score is what it is'
            ]
        }
    },
    'skills': {
        id: 'skills',
        title: 'Add New Skills in me',
        description: 'Mastering modern tech stack: NestJS (Advanced), GraphQL, Prisma, DB Mastery, System Design.',
        dailyRoutine: {
            morning: [
                '40 min: Deep dive into one "Must Master" skill (NestJS, GraphQL, Prisma, DB, System Design). No fluff.'
            ],
            afternoon: [
                '20 min: Apply the learned concept immediately to Focus Flow or a mini-project.'
            ],
            evening: [
                'Review: Explain the concept to yourself (Feynman technique) or document it.'
            ]
        },
        weeklyMilestones: [
            'Week 1-4: NestJS Advanced (Guards, Interceptors, Pipes, Clean Arch)',
            'Week 5-8: GraphQL (Schema, Resolvers, Auth, Pagination)',
            'Week 9-12: Prisma & DB Mastery (Modeling, Migrations, Aggregations, Transactions)',
            'Week 13-16: System Design (API Design, Auth Flows, Caching, Scaling)',
            'Week 17-20: Redis & Queues (Basics & Implementation)',
            'Week 21-24: CI/CD & Cloud Deployment (GitHub Actions, Env Mgmt)'
        ],
        resources: [
            'NestJS Documentation (Official)',
            'GraphQL Official Site',
            'Prisma Docs',
            'System Design Primer (GitHub)',
            'Redis Crash Course',
            'GitHub Actions Docs'
        ]
    }
};
