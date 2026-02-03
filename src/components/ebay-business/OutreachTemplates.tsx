import { useState } from 'react';
import { toast } from 'react-hot-toast';

const TEMPLATES = [
    {
        id: 'student',
        target: 'STUDENTS 🎓',
        title: 'The "Low Effort Side-Hustle" Script',
        message: `Hi [Name]! I saw you're studying in Germany. I'm expanding my eBay reselling business and looking for a local partner. 

The deal is simple: You provide the eBay account/bank for transparency (money lands in your account first), and I handle 100% of the product research, listings, and customer support. 

You get a solid [20-30%] cut of the profit just for keeping the account active. Zero effort from your side. Let's chat if you're interested?`
    },
    {
        id: 'jobholder',
        target: 'JOB HOLDERS 💼',
        title: 'The "Passive Wealth" Script',
        message: `Hi [Name], hope you're doing well in Germany! I'm running a successful eBay business model and I'm looking for a 'silent partner' in DE.

Since you're already settled there, you can help by hosting the business on your account. I do all the work (sourcing, management, SCM), and the revenue goes directly to your bank account. You keep a fixed % share and transfer the rest. 

It's a great way to build extra savings without extra working hours. Would love to explain the model to you.`
    },
    {
        id: 'urdu',
        target: 'PAK/IND COMMUNITY 🇵🇰',
        title: 'The "Trust & Transparency" Script',
        message: `Assalam o Alaikum / Hi [Name], umeed hai aap khariat se honge. Main Germany mein eBay business scale kar raha hoon aur mujhe ek trustworthy partner ki zaroorat hai.

Model simple hai: Account aapka hoga, bank aapka hoga. Saara paisa pehle aapke paas aayega. Kaam saara (Listing, Research, SOPs) main karunga. 

Profit share basis pe kaam karenge, aapka share aap rakh kar baaki mujhe transfer karenge. Totally transparent and clean. Agar aap free hain toh details discuss karte hain?`
    }
];

export default function OutreachTemplates() {
    const [activeTab, setActiveTab] = useState(TEMPLATES[0].id);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Script copied to clipboard!');
    };

    const activeTemplate = TEMPLATES.find(t => t.id === activeTab);

    return (
        <div className="card-premium ebay-card-premium" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Header with Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="flex-between mobile-stack">
                    <div>
                        <h2 className="heading-lg gradient-text" style={{ margin: 0 }}>Outreach Scripts</h2>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>High-conversion templates</p>
                    </div>
                </div>

                <div className="outreach-tabs-container">
                    {TEMPLATES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`tab-btn ${activeTab === t.id ? 'active' : ''}`}
                            style={{
                                padding: '0.6rem 1.2rem',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                background: activeTab === t.id ? 'var(--accent-color)' : 'transparent',
                                color: activeTab === t.id ? '#fff' : 'var(--text-secondary)',
                                boxShadow: activeTab === t.id ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {t.target}
                        </button>
                    ))}
                </div>
            </div>

            {activeTemplate && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.4s ease-out' }}>
                    <div className="flex-between mobile-stack">
                        <h3 className="text-sm font-bold" style={{ color: 'var(--accent-color)', letterSpacing: '0.02em', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="mobile-hide" style={{ width: '12px', height: '2px', background: 'currentColor', borderRadius: '1px' }}></span>
                            {activeTemplate.title}
                        </h3>
                        <button
                            onClick={() => copyToClipboard(activeTemplate.message)}
                            className="btn-icon"
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.75rem',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: 'var(--text-primary)',
                                background: 'rgba(255,255,255,0.05)',
                                fontWeight: 600,
                                width: 'fit-content'
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            Copy Script
                        </button>
                    </div>

                    <div
                        style={{
                            background: 'rgba(5, 5, 5, 0.4)',
                            padding: 'clamp(1rem, 5vw, 2rem)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            fontSize: '1rem',
                            lineHeight: '1.7',
                            color: 'var(--text-primary)',
                            whiteSpace: 'pre-wrap',
                            boxShadow: 'inset 0 2px 40px rgba(0,0,0,0.2)',
                            position: 'relative',
                            wordBreak: 'break-word'
                        }}
                    >
                        {activeTemplate.message}
                    </div>
                </div>
            )}

            <div style={{ marginTop: '0.5rem' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                    <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>💡</span> Trust Pillars (How to close the deal)
                    </h4>
                </div>

                <div className="trust-pillars-grid">
                    <div className="card-premium" style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.02) 100%)',
                        border: '1px solid rgba(34, 197, 94, 0.15)',
                        borderRadius: '16px',
                        transition: 'transform 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <p className="text-sm font-bold" style={{ color: '#4ade80', margin: 0 }}>Financial Control</p>
                        </div>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Money hits <strong>their bank</strong> first. They have absolute leverage and safety over the funds.</p>
                    </div>

                    <div className="card-premium" style={{
                        padding: '1.5rem',
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 100%)',
                        border: '1px solid rgba(59, 130, 246, 0.15)',
                        borderRadius: '16px',
                        transition: 'transform 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-color)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <p className="text-sm font-bold" style={{ color: 'var(--accent-color)', margin: 0 }}>Zero Risk Model</p>
                        </div>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)', margin: 0, lineHeight: '1.5' }}>Explain that you handle all listings & shipping logistics. They just act as the <strong>silent host</strong>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
