import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    IconMagnet, IconBrain, IconTarget, IconFire, IconSmile
} from '../../layout/NavbarIcons';

const GoalsCard = () => {
    const [expandedGoal, setExpandedGoal] = useState<number | null>(null);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleGoal = (index: number) => {
        setExpandedGoal(expandedGoal === index ? null : index);
    };

    const toggleCheck = (id: string) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const goals = [
        {
            icon: <IconMagnet className="w-6 h-6" />,
            color: '#34d399',
            bg: 'rgba(16, 185, 129, 0.2)',
            title: '1-3 Lakh / Month',
            desc: '7-Day Client Hunting Strategy',
            link: '/get-clients',
            todos: [
                { id: 'money-0', label: 'Target Audience Check (Founders/CTOs/Product Managers/Decision Makers/Investors/HR/Recruiters/Marketing Managers/Saas Founders/Startups)' },
                { id: 'money-1', label: '20-30 DMs Sent (LinkedIn/Twitter/FB/Insta)' },
                { id: 'money-2', label: '5-10 Proposals (Upwork/Jobs)' },
                { id: 'money-3', label: '3-5 Public Replies (Community)' }
            ]
        },
        {
            icon: <IconBrain className="w-6 h-6" />,
            color: '#60a5fa',
            bg: 'rgba(59, 130, 246, 0.2)',
            title: 'Seniority Level Skills',
            desc: 'Backend & Frontend Mastery',
            link: '/next-path',
            todos: [
                { id: 'skill-1', label: 'Deep Work: NestJS / Backend (2 Hours)' },
                { id: 'skill-2', label: 'Code Review Open Source / Docs' },
                { id: 'skill-3', label: 'Build Feature (Practice Project)' }
            ]
        },
        {
            icon: <IconTarget className="w-6 h-6" />,
            color: '#fbbf24',
            bg: 'rgba(245, 158, 11, 0.2)',
            title: '30+ Interviews',
            desc: 'Practice & Execution',
            todos: [
                { id: 'job-1', label: 'Apply to 5 Relevant Roles' },
                { id: 'job-2', label: 'Mock Interview (Self/Peer)' },
                { id: 'job-3', label: 'Refine Resume / Portfolio' }
            ]
        },
        {
            icon: <IconFire className="w-6 h-6" />,
            color: '#f87171',
            bg: 'rgba(239, 68, 68, 0.2)',
            title: 'Strong Physique',
            desc: '200+ Squats • 100+ Sit Ups • 100+ Pushups',
            todos: [
                { id: 'fit-1', label: '200 Squats' },
                { id: 'fit-2', label: '100 Sit Ups' },
                { id: 'fit-3', label: '100 Pushups' },
                { id: 'fit-4', label: '25 Pull Ups' },
                { id: 'fit-5', label: 'Stretching (10 Mins)' }
            ]
        },
        {
            icon: <IconSmile className="w-6 h-6" />,
            color: '#c084fc',
            bg: 'rgba(168, 85, 247, 0.2)',
            title: 'Mindset & Character',
            desc: 'Think before Say • Be Better Day by Day',
            todos: [
                { id: 'mind-1', label: 'Meditate / Silence (10 Mins)' },
                { id: 'mind-2', label: 'Journal: "Did I respond or reply?"' },
                { id: 'mind-3', label: 'Read 5 Pages (Book)' }
            ]
        }
    ];

    return (
        <div className="card-premium mb-8 goals-card">
            <div className="flex-between mb-6">
                <h3 className="heading-lg" style={{
                    margin: 0,
                    background: 'linear-gradient(to right, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    6 Months Goal Target
                </h3>
            </div>

            <div className="goals-grid" style={{ display: 'grid', gap: '1rem' }}>
                {goals.map((goal, index) => (
                    <div
                        key={index}
                        className="goal-item-premium"
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Header Section (Always Visible) */}
                        <div
                            onClick={() => toggleGoal(index)}
                            style={{
                                padding: '1.25rem',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                cursor: 'pointer',
                                background: expandedGoal === index ? 'rgba(255,255,255,0.02)' : 'transparent'
                            }}
                        >
                            <div style={{ background: goal.bg, color: goal.color, padding: '0.5rem', borderRadius: '8px' }}>
                                {goal.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f8fafc', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {goal.title}
                                        {goal.link && (
                                            <Link to={goal.link} onClick={(e) => e.stopPropagation()} style={{ fontSize: '0.75rem', padding: '0.1rem 0.5rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderRadius: '4px', textDecoration: 'none' }}>
                                                View Roadmap ↗
                                            </Link>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', transform: expandedGoal === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
                                </div>
                                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{goal.desc}</div>
                            </div>
                        </div>

                        {/* Accordion Content (Daily Todos) */}
                        {expandedGoal === index && (
                            <div style={{
                                padding: '0 1.25rem 1.25rem 4rem',
                                animation: 'fadeIn 0.3s ease'
                            }}>
                                <div style={{
                                    paddingTop: '1rem',
                                    borderTop: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    <h5 style={{
                                        fontSize: '0.85rem',
                                        textTransform: 'uppercase',
                                        color: 'var(--text-secondary)',
                                        marginBottom: '0.75rem',
                                        letterSpacing: '0.05em'
                                    }}>
                                        Daily Non-Negotiables
                                    </h5>

                                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                                        {goal.todos.map((todo) => (
                                            <div
                                                key={todo.id}
                                                onClick={() => toggleCheck(todo.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.75rem',
                                                    cursor: 'pointer',
                                                    opacity: checkedItems[todo.id] ? 0.5 : 1
                                                }}
                                            >
                                                <div style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    borderRadius: '4px',
                                                    border: `2px solid ${checkedItems[todo.id] ? goal.color : '#475569'}`,
                                                    background: checkedItems[todo.id] ? goal.color : 'transparent',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    transition: 'all 0.2s'
                                                }}>
                                                    {checkedItems[todo.id] && <span style={{ color: '#000', fontSize: '0.7rem', fontWeight: 'bold' }}>✓</span>}
                                                </div>
                                                <span style={{
                                                    fontSize: '0.9rem',
                                                    color: checkedItems[todo.id] ? '#94a3b8' : '#e2e8f0',
                                                    textDecoration: checkedItems[todo.id] ? 'line-through' : 'none'
                                                }}>
                                                    {todo.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoalsCard;
