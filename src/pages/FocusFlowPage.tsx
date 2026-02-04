import { useState } from 'react';
import '../styles/focusFlow.css'; // We'll create this for specific styles

const FocusFlowPage = () => {
    const [checklist, setChecklist] = useState({
        skills: false,
        action: false,
        comparison: false,
        calm: false,
        trust: false,
        improved: false
    });

    const toggleCheck = (key: keyof typeof checklist) => {
        setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <div className="master-roadmap-hero">
                <div className="hero-glow"></div>
                <div className="hero-content text-center">
                    <span className="hero-badge">📌 FocusFlow Page</span>
                    <h1 className="hero-title">
                        Don’t Chase — <span className="gradient-text">Only Attract</span>
                    </h1>
                    <div className="card-premium identity-card mt-8 mx-auto" style={{ maxWidth: '600px' }}>
                        <h2 className="heading-lg text-center gradient-text" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>I AM THE MAGNET.</h2>
                        <p className="text-secondary text-center">Identity Statement</p>
                    </div>
                </div>
            </div>

            <div className="grid-responsive-2">
                {/* Core Principle */}
                <div className="card-premium">
                    <div className="flex-between mb-4">
                        <h2 className="heading-lg">🧠 Core Principle</h2>
                    </div>
                    <div className="principle-content text-center py-4">
                        <p className="text-xl mb-4" style={{ fontSize: '1.25rem' }}>"I don’t chase what I want."</p>
                        <p className="text-xl gradient-text font-bold" style={{ fontSize: '1.5rem' }}>"I become the person who attracts it."</p>
                    </div>
                </div>

                {/* Faith Reminder */}
                <div className="card-premium flex-center-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="mb-4 text-center w-full">
                        <h2 className="heading-lg">🌙 Faith Reminder</h2>
                    </div>
                    <blockquote className="quote-box text-center">
                        “What Allah has written for me cannot miss me.”
                    </blockquote>
                </div>
            </div>

            <div className="grid-responsive-2" style={{ marginTop: '3rem' }}>
                {/* Daily Mindset Rules */}
                <div className="card-premium" style={{ gridRow: 'span 2' }}>
                    <h2 className="heading-lg mb-6">🔑 Daily Mindset Rules</h2>
                    <ul className="mindset-list">
                        <li>I act from abundance, not desperation</li>
                        <li>I focus on becoming valuable, not seeking validation</li>
                        <li>I build skills, discipline, and character every day</li>
                        <li>I trust Allah’s timing — not my emotions</li>
                        <li>I stay calm, patient, and consistent</li>
                        <li>I detach from outcomes and focus on effort</li>
                        <li>I solve problems — money follows solutions</li>
                        <li>I work in silence, let results speak</li>
                        <li>I control habits, not people or situations</li>
                        <li>I believe: what’s meant for me will find me</li>
                    </ul>
                </div>

                {/* Daily Checklist */}
                <div className="card-premium">
                    <h2 className="heading-lg mb-4">✅ Daily Checklist <span className="text-sm font-normal text-secondary">(Tick Every Day)</span></h2>
                    <div className="checklist-container">
                        <label className="checklist-item">
                            <input type="checkbox" checked={checklist.skills} onChange={() => toggleCheck('skills')} />
                            <span className="checkmark"></span>
                            <span>Worked on my skills</span>
                        </label>
                        <label className="checklist-item">
                            <input type="checkbox" checked={checklist.action} onChange={() => toggleCheck('action')} />
                            <span className="checkmark"></span>
                            <span>Took aligned action (no chasing)</span>
                        </label>
                        <label className="checklist-item">
                            <input type="checkbox" checked={checklist.comparison} onChange={() => toggleCheck('comparison')} />
                            <span className="checkmark"></span>
                            <span>Avoided comparison</span>
                        </label>
                        <label className="checklist-item">
                            <input type="checkbox" checked={checklist.calm} onChange={() => toggleCheck('calm')} />
                            <span className="checkmark"></span>
                            <span>Stayed emotionally calm</span>
                        </label>
                        <label className="checklist-item">
                            <input type="checkbox" checked={checklist.trust} onChange={() => toggleCheck('trust')} />
                            <span className="checkmark"></span>
                            <span>Trusted the process</span>
                        </label>
                        <label className="checklist-item">
                            <input type="checkbox" checked={checklist.improved} onChange={() => toggleCheck('improved')} />
                            <span className="checkmark"></span>
                            <span>Improved 1% today</span>
                        </label>
                    </div>
                </div>

                {/* Daily Affirmations */}
                <div className="card-premium">
                    <h2 className="heading-lg mb-4">🔁 Daily Affirmations <span className="text-sm font-normal text-secondary">(Read Aloud)</span></h2>
                    <ul className="affirmation-list">
                        <li>I attract opportunities effortlessly</li>
                        <li>My value speaks louder than my words</li>
                        <li>I am becoming unstoppable with patience</li>
                        <li>Money is attracted to the problems I solve</li>
                        <li>I am aligned with success and abundance</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FocusFlowPage;
