export interface RoadmapItem {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low'; // high = Core, medium = Rotational
    active: boolean;
    dailyRoutine: {
        morning: string[];
        afternoon: string[];
        evening: string[];
    };
    minimumRoutine?: {
        daily: string[];
    };
    weeklyMilestones?: string[];
    resources?: string[];
}

export const roadmaps: Record<string, RoadmapItem> = {
    'revenue-engine': {
        id: 'revenue-engine',
        title: 'Revenue Engine (Income + Clients)',
        description: 'Combined system to generate ₹1,00,000/month. Focus on high-value agency connections and consistent follow-ups.',
        priority: 'high',
        active: true,
        dailyRoutine: {
            morning: [
                '10 Agency Connections (LinkedIn/Email)',
                '1 Value Post (LinkedIn)'
            ],
            afternoon: [
                '5 Follow-ups with previous leads',
                'Skill Application (Client work or Portfolio)'
            ],
            evening: [
                'Review responses & plan next day'
            ]
        },
        minimumRoutine: {
            daily: [
                '✔ 3 Connections sent',
                '✔ 1 Post (or engage with 5 others)'
            ]
        },
        weeklyMilestones: [
            '50 New Agency Connections',
            '25 Follow-ups sent',
            '1 Discovery Call booked'
        ],
        resources: ['LinkedIn Sales Nav', 'Cold Email Scripts', 'Agency Directories']
    },
    'skills': {
        id: 'skills',
        title: 'Tech Skills (Phase 1: NestJS)',
        description: 'Mastering NestJS Advanced concepts. Focus on depth over breadth for the first 4 weeks.',
        priority: 'high',
        active: true,
        dailyRoutine: {
            morning: [
                '40 min: Deep dive NestJS (Guards, Interceptors, Pipes)'
            ],
            afternoon: [
                '20 min: Apply concept to Focus Flow'
            ],
            evening: [
                'Feynman Technique: Explain what you learned'
            ]
        },
        minimumRoutine: {
            daily: [
                '✔ 15 min reading docs or code',
                '✔ Write 1 line of code/notes'
            ]
        },
        weeklyMilestones: [
            'Week 1: Module Boundaries & Clean Arch',
            'Week 2: Guards & Interceptors',
            'Week 3: Pipes & Validation',
            'Week 4: Build a mini-module'
        ],
        resources: ['NestJS Docs', 'Official Course']
    },
    'physique': {
        id: 'physique',
        title: 'Physique & Energy',
        description: 'Maintain high energy levels and discipline through physical activity.',
        priority: 'high',
        active: true,
        dailyRoutine: {
            morning: [
                'Hydrate (500ml)',
                'High Protein Breakfast'
            ],
            afternoon: [
                'Walk / Movement break'
            ],
            evening: [
                'Workout (45 mins)',
                '7-8 hours sleep'
            ]
        },
        minimumRoutine: {
            daily: [
                '✔ 10 Pushups OR 15 min Walk',
                '✔ Drink 2L Water'
            ]
        },
        weeklyMilestones: [
            '4 Workouts completed',
            'No junk food streak'
        ]
    },
    'english': {
        id: 'english',
        title: 'English Communication',
        description: 'Professional fluency. Practice 3x/week.',
        priority: 'medium',
        active: true,
        dailyRoutine: {
            morning: [
                'Read 5 pages (Fiction/Non-fiction)'
            ],
            afternoon: [],
            evening: [
                'Watch 1 English video (No subtitles)'
            ]
        },
        minimumRoutine: {
            daily: [
                '✔ Read 1 page',
                '✔ Listen to 1 podcast segment'
            ]
        }
    },
    'degree': {
        id: 'degree',
        title: 'Degree Completion',
        description: 'Academic responsibilities. Focus on class days.',
        priority: 'medium',
        active: true,
        dailyRoutine: {
            morning: [],
            afternoon: [
                'Attend Classes'
            ],
            evening: [
                '1 Hour Study Block'
            ]
        },
        minimumRoutine: {
            daily: [
                '✔ Attend mandatory classes',
                '✔ 15 min review'
            ]
        }
    },
    'better-day': {
        id: 'better-day',
        title: 'Better Day (Mindset)',
        description: 'Daily gratitude and stoic reflection.',
        priority: 'medium',
        active: true,
        dailyRoutine: {
            morning: [
                'Gratitude (3 things)'
            ],
            afternoon: [],
            evening: [
                'Control List Review'
            ]
        },
        minimumRoutine: {
            daily: [
                '✔ Write 1 thing you are grateful for'
            ]
        }
    },
    'rate-myself': {
        id: 'rate-myself',
        title: 'Self-Rating',
        description: 'Binary accountability: Did I show up?',
        priority: 'medium',
        active: true,
        dailyRoutine: {
            morning: [],
            afternoon: [],
            evening: [
                'Binary Check: Did I do the minimums? (Y/N)'
            ]
        },
        minimumRoutine: {
            daily: [
                '✔ Answer: Did I show up today?'
            ]
        }
    }
};
