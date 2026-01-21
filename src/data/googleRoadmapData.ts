import type { Phase } from '../types/googleRoadmap';

export const phases: Phase[] = [
    {
        id: 'phase-1',
        number: 1,
        title: 'Foundations: Algorithmic Mastery',
        duration: 'Months 1â€“3',
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
        duration: 'Months 4â€“5',
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
                id: 'p3-2', text: 'STAR Method: Prepare 3â€“5 stories for behavioral rounds', completed: false,
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
