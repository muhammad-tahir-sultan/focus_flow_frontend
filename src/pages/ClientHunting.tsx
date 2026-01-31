import React from 'react';
import './ClientHunting.css';

const ClientHunting: React.FC = () => {
    return (
        <div className="client-hunting-page">
            {/* Hero Section */}
            <header className="ch-hero">
                <div className="container">
                    <h1>⚡ Get Clients in 7 Days</h1>
                    <p className="ch-subtitle">Don’t sell development. Sell pain relief.</p>
                </div>
            </header>

            {/* Step 1 */}
            <section className="ch-section container">
                <div className="ch-section-header">
                    <div className="ch-step-number">1</div>
                    <h2 className="ch-section-header-title">Pick ONE Problem (Day 1)</h2>
                </div>
                
                <div className="ch-cards-grid">
                    <div className="ch-card">
                        <span className="ch-card-icon">🐢</span>
                        <h3>Slow APIs</h3>
                        <p>Detailed backend performance optimization for better UX.</p>
                    </div>
                    <div className="ch-card">
                        <span className="ch-card-icon">🔐</span>
                        <h3>Auth & Role Bugs</h3>
                        <p>Fixing security vulnerabilities and access control issues.</p>
                    </div>
                    <div className="ch-card">
                        <span className="ch-card-icon">🕸️</span>
                        <h3>Messy Backend</h3>
                        <p>Refactoring spaghetti code into clean architecture.</p>
                    </div>
                    <div className="ch-card">
                        <span className="ch-card-icon">📈</span>
                        <h3>Scaling Issues</h3>
                        <p>Resolving timeouts and database bottlenecks.</p>
                    </div>
                </div>

                <div className="ch-offer-box">
                    <p className="ch-offer-text">"I help startups fix slow or broken backends so their product doesn’t crash."</p>
                    <div className="ch-badges">
                        <span className="ch-badge bad">❌ Full-stack developer</span>
                        <span className="ch-badge good">✅ Problem solver</span>
                    </div>
                </div>
            </section>

            {/* Step 2 */}
            <section className="ch-section container">
                <div className="ch-section-header">
                    <div className="ch-step-number">2</div>
                    <h2 className="ch-section-header-title">Where to Find Clients</h2>
                </div>

                <div className="ch-sources-grid">
                    <div className="ch-source-card">
                        <div className="ch-source-header">
                            <span style={{ color: '#0077b5' }}>LI</span> LinkedIn (Top Priority)
                        </div>
                        <ul className="ch-source-list">
                            <li>Target: Founders, CTOs, PMs</li>
                            <li>Search: "Founder", "CTO", "SaaS"</li>
                            <li>Filter: Recently active</li>
                        </ul>
                    </div>

                    <div className="ch-source-card">
                        <div className="ch-source-header">
                            <span style={{ color: '#1da1f2' }}>X</span> Twitter / X
                        </div>
                        <ul className="ch-source-list">
                            <li>Search: "API slow", "Scaling issues"</li>
                            <li>Action: Reply → DM</li>
                        </ul>
                    </div>

                    <div className="ch-source-card">
                        <div className="ch-source-header">
                            <span style={{ color: '#1877f2' }}>FB</span> Facebook Groups
                        </div>
                        <ul className="ch-source-list">
                            <li>Startup / SaaS groups</li>
                            <li>Look for: "Need developer", "Backend issue"</li>
                        </ul>
                    </div>

                    <div className="ch-source-card">
                        <div className="ch-source-header">
                            <span style={{ color: '#6fda44' }}>UP</span> Upwork
                        </div>
                        <ul className="ch-source-list">
                            <li>Search: "Fix backend", "API optimization"</li>
                            <li>Apply to fresh jobs ({'<'} 1 hour)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Step 3 */}
            <section className="ch-section container">
                <div className="ch-section-header">
                    <div className="ch-step-number">3</div>
                    <h2 className="ch-section-header-title">Outreach (Simple DM)</h2>
                </div>

                <div className="ch-message-card">
                    <p>Hey <span className="ch-variable">{`{{Name}}`}</span>,</p>
                    <br />
                    <p>Are you facing backend issues like slow APIs or scaling problems?</p>
                    <p>I help startups fix these without rebuilding everything.</p>
                    <p>Happy to take a quick look.</p>
                    <br />
                    <p>– Tahir</p>
                </div>

                <div className="ch-rules-row">
                    <div className="ch-rule-item">⚠️ No links</div>
                    <div className="ch-rule-item">⚠️ No CV</div>
                    <div className="ch-rule-item">⚠️ No begging</div>
                </div>
            </section>

            {/* Step 4 */}
            <section className="ch-section container">
                <div className="ch-section-header">
                    <div className="ch-step-number">4</div>
                    <h2 className="ch-section-header-title">Daily Numbers</h2>
                </div>

                <div className="ch-stats-container">
                    <div className="ch-stat-item">
                        <span className="ch-stat-value">20-30</span>
                        <span className="ch-stat-label">DMs Sent</span>
                    </div>
                    <div className="ch-stat-item">
                        <span className="ch-stat-value">5-10</span>
                        <span className="ch-stat-label">Proposals</span>
                    </div>
                    <div className="ch-stat-item">
                        <span className="ch-stat-value">3-5</span>
                        <span className="ch-stat-label">Public Replies</span>
                    </div>
                </div>
                <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>Rule: Numbers {'>'} emotions</p>
            </section>

            {/* Step 5 & 6 */}
            <section className="ch-section container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <div className="ch-section-header">
                            <div className="ch-step-number">5</div>
                            <h2 className="ch-section-header-title">First Call</h2>
                        </div>
                        <div className="ch-card">
                            <ul className="ch-source-list">
                                <li>Talk about pain, not tech</li>
                                <li>Repeat their problem clearly</li>
                                <li>Give 1–2 insights</li>
                                <li><strong>Ask: "Do you want me to handle this?"</strong></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div>
                        <div className="ch-section-header">
                            <div className="ch-step-number">6</div>
                            <h2 className="ch-section-header-title">Pricing Rule</h2>
                        </div>
                        <div className="ch-card">
                            <ul className="ch-source-list">
                                <li><strong>Fixed price</strong> primarily</li>
                                <li>Start fair → raise fast</li>
                                <li>Say: "I focus on clean, long-term fixes."</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 7 */}
            <section className="ch-section container">
                <div className="ch-section-header">
                    <div className="ch-step-number">7</div>
                    <h2 className="ch-section-header-title">7-Day Plan</h2>
                </div>

                <div className="ch-timeline">
                    <div className="ch-timeline-day">
                        <span className="ch-day-label">Day 1</span>
                        <div className="ch-day-content">Offer + Profile</div>
                    </div>
                    <div className="ch-timeline-day">
                        <span className="ch-day-label">Day 2</span>
                        <div className="ch-day-content">Outreach</div>
                    </div>
                    <div className="ch-timeline-day">
                        <span className="ch-day-label">Day 3</span>
                        <div className="ch-day-content">Outreach</div>
                    </div>
                    <div className="ch-timeline-day">
                        <span className="ch-day-label">Day 4</span>
                        <div className="ch-day-content">Outreach</div>
                    </div>
                    <div className="ch-timeline-day">
                        <span className="ch-day-label">Day 5</span>
                        <div className="ch-day-content">Calls</div>
                    </div>
                    <div className="ch-timeline-day">
                        <span className="ch-day-label">Day 6</span>
                        <div className="ch-day-content">Close</div>
                    </div>
                    <div className="ch-timeline-day">
                        <span className="ch-day-label">Day 7</span>
                        <div className="ch-day-content">Deliver Fast</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="ch-footer">
                <div className="container">
                    <h3 className="ch-quote">"Clients don’t care about skills. They care about relief from pain."</h3>
                    <span className="ch-quote-author">🔥 FocusFlow Rule</span>
                </div>
            </footer>
        </div>
    );
};

export default ClientHunting;
