
import { coreTruths, identityLevels } from '../../data/identityData';

interface IdentityRoadmapProps {
    completedLevels: number[];
    toggleLevel: (index: number) => void;
}

const IdentityRoadmap = ({ completedLevels, toggleLevel }: IdentityRoadmapProps) => {
    return (
        <div className="grid-stack">
            <div className="card-premium mb-2">
                <h2 className="heading-lg gradient-text text-center mb-12">{coreTruths.title}</h2>
                <div className="text-center space-y-2">
                    {coreTruths.content.map((line, i) => (
                        <p key={i} className="text-xl font-light">{line}</p>
                    ))}
                </div>
            </div>
            <div className="timeline-container">
                {identityLevels.map((level, i) => (
                    <div key={i} className={`card-premium mb-4 relative overflow-hidden ${completedLevels.includes(i) ? 'completed' : ''}`}>
                        <button
                            className={`level-checkbox ${completedLevels.includes(i) ? 'checked' : ''}`}
                            onClick={() => toggleLevel(i)}
                            title="Mark as Achieved"
                        >
                            <svg className="level-tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </button>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="text-6xl font-bold">{level.level}</span>
                        </div>
                        <div className="relative z-10">
                            <div className="flex-between pr-16">
                                <h3 className="text-2xl mb-12 font-bold text-accent ">{level.title}</h3>
                                <span className="badge badge-filled">{level.range}</span>
                            </div>
                            <p className="text-secondary italic mb-2">{level.newIdentity}</p>

                            {level.requirements && (
                                <ul className="mindset-list">
                                    {level.requirements.map((req, j) => (
                                        <li key={j}>{req}</li>
                                    ))}
                                </ul>
                            )}
                            {level.description && <p className="mt-4">{level.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IdentityRoadmap;
