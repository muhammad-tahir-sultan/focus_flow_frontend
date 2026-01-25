
interface IdentityTabsProps {
    activeTab: 'plan' | 'roadmap' | 'analytics';
    setActiveTab: (tab: 'plan' | 'roadmap' | 'analytics') => void;
}

const IdentityTabs = ({ activeTab, setActiveTab }: IdentityTabsProps) => {
    return (
        <div className="flex justify-center mb-24">
            <div className="tabs-container">
                {[
                    { id: 'plan', label: '📅 Daily Plan' },
                    { id: 'roadmap', label: '🗺️ The Levels' },
                    { id: 'analytics', label: '📊 Tracker & Analytics' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default IdentityTabs;
