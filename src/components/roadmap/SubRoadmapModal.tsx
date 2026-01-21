import { createPortal } from 'react-dom';
import type { NodeDetail } from '../../types/roadmap';

interface SubRoadmapModalProps {
    nodeId: string;
    nodeDetails: Record<string, NodeDetail>;
    onClose: () => void;
}

const SubRoadmapModal = ({ nodeId, nodeDetails, onClose }: SubRoadmapModalProps) => {
    const detail = nodeDetails[nodeId];
    if (!detail) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content-roadmap" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                <header className="modal-header">
                    <div className="header-top-row">
                        <div className="modal-subtitle">{detail.subtitle}</div>
                        <div className="time-badge">
                            <span className="time-icon">⏱️</span>
                            {detail.timeline}
                        </div>
                    </div>
                    <h2 className="modal-title">{detail.title}</h2>
                </header>

                <div className="modal-body">
                    {/* Reasoning Section */}
                    <div className="reasoning-section">
                        <div className="reasoning-grid">
                            <div className="reasoning-card problem">
                                <h4 className="reasoning-title">☠️ The Problem</h4>
                                <p>{detail.reasoning.problem}</p>
                            </div>
                            <div className="reasoning-card solution">
                                <h4 className="reasoning-title">💡 The Solution</h4>
                                <p>{detail.reasoning.solution}</p>
                            </div>
                            <div className="reasoning-card tradeoffs">
                                <h4 className="reasoning-title">⚖️ Trade-offs</h4>
                                <p>{detail.reasoning.tradeoffs}</p>
                            </div>
                        </div>
                    </div>

                    {/* Daily Action Plan */}
                    <div className="checklist-section">
                        <h3 className="section-heading">✅ Daily Action Plan</h3>
                        <div className="checklist-grid">
                            {detail.checklist?.map((item, idx) => (
                                <div key={idx} className="checklist-item">
                                    <input type="checkbox" id={`chk-${idx}`} className="custom-checkbox" defaultChecked={item.checked} />
                                    <label htmlFor={`chk-${idx}`}>{item.title}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className="section-heading">Detailed Learning Path</h3>
                    <div className="topics-grid">
                        {detail.topics.map((topic, idx) => (
                            <div key={idx} className={`topic-card ${topic.isKey ? 'key-topic' : ''}`}>
                                <div className="topic-header">
                                    <span className="topic-title">{topic.title}</span>
                                    {topic.isKey && <span className="key-badge">MUST KNOW</span>}
                                </div>
                                <p className="topic-desc">{topic.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="resources-section">
                        <h3 className="section-heading">Recommended Resources</h3>
                        <div className="resources-grid-modal">
                            {detail.resources.map((res, idx) => (
                                <a
                                    key={idx}
                                    href={res.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`resource-card-link ${res.type}`}
                                >
                                    <span className="res-icon">
                                        {res.type === 'video' ? '📺' :
                                            res.type === 'article' ? '📝' :
                                                res.type === 'practice' ? '🧪' : '📚'}
                                    </span>
                                    <div className="res-info">
                                        <span className="res-name">{res.name}</span>
                                        <span className="res-type-label">{res.type}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SubRoadmapModal;
