import { useState } from 'react';
import { toast } from 'react-hot-toast';

const TEMPLATES = [
    {
        id: 'student',
        target: 'Students 🎓',
        title: 'The "Low Effort Side-Hustle" Script',
        message: `Hi [Name]! I saw you're studying in Germany. I'm expanding my eBay reselling business and looking for a local partner. 

The deal is simple: You provide the eBay account/bank for transparency (money lands in your account first), and I handle 100% of the product research, listings, and customer support. 

You get a solid [20-30%] cut of the profit just for keeping the account active. Zero effort from your side. Let's chat if you're interested?`
    },
    {
        id: 'jobholder',
        target: 'Job Holders 💼',
        title: 'The "Passive Wealth" Script',
        message: `Hi [Name], hope you're doing well in Germany! I'm running a successful eBay business model and I'm looking for a 'silent partner' in DE.

Since you're already settled there, you can help by hosting the business on your account. I do all the work (sourcing, management, SCM), and the revenue goes directly to your bank account. You keep a fixed % share and transfer the rest. 

It's a great way to build extra savings without extra working hours. Would love to explain the model to you.`
    },
    {
        id: 'urdu',
        target: 'Pak/Ind Community 🇵🇰🇮🇳',
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
        toast.success('Script copied!');
    };

    const activeTemplate = TEMPLATES.find(t => t.id === activeTab);

    return (
        <div className="card-premium h-full">
            <div className="flex-between mb-6">
                <h2 className="heading-lg gradient-text" style={{ margin: 0 }}>Outreach Scripts</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {TEMPLATES.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            className={`badge ${activeTab === t.id ? 'badge-filled' : 'badge-outline'}`}
                            style={{ cursor: 'pointer' }}
                        >
                            {t.target}
                        </button>
                    ))}
                </div>
            </div>

            {activeTemplate && (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                    <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--accent-color)' }}>
                        {activeTemplate.title}
                    </h3>
                    <div
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            position: 'relative',
                            fontFamily: 'inherit',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            color: 'var(--text-secondary)',
                            whiteSpace: 'pre-wrap'
                        }}
                    >
                        {activeTemplate.message}
                        <button
                            onClick={() => copyToClipboard(activeTemplate.message)}
                            style={{
                                position: 'absolute',
                                top: '0.5rem',
                                right: '0.5rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.7rem',
                                color: 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            Copy
                        </button>
                    </div>
                </div>
            )}

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                <h4 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>💡 Trust Pillars (How to close the deal)</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem', background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', borderRadius: '8px' }}>
                        <p className="text-xs font-bold" style={{ color: 'var(--success-color)', marginBottom: '0.25rem' }}>Financial Control</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Money hits *their* bank account first. They are in 100% control of the funds.</p>
                    </div>
                    <div style={{ padding: '0.75rem', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px' }}>
                        <p className="text-xs font-bold" style={{ color: 'var(--accent-color)', marginBottom: '0.25rem' }}>Zero Effort</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>You handle sourcing, listing, and shipping prep. They just host the account.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
