import { useState } from 'react';
import SubRoadmapModal from '../components/roadmap/SubRoadmapModal';
import { NODE_DETAILS, NODES } from '../data/backendRoadmapData';
import '../styles/backendRoadmap.css';

const BackendMasteryGraph = () => {
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [activeNode, setActiveNode] = useState<string | null>(null);

    const handleNodeClick = (id: string) => {
        setActiveNode(id); // For highlighting in graph
        setSelectedNodeId(id); // For modal
    };

    // Calculate strict coordinates for SVGs and Lines
    const ROW_HEIGHT = 160;

    return (
        <div className="backend-graph-page">
            <header className="graph-header">
                <div className="badge-founder">FOUNDER OF BACKEND</div>
                <h1>Architectural Mastery Roadmap</h1>
                <p>The visual path from "Hello World" to "CTO / Founder" Level.</p>
            </header>

            <div className="graph-scroll-container">
                <div className="graph-diagram" style={{ height: (NODES.length / 1.5) * ROW_HEIGHT + 200 }}>

                    {/* SVG Layer for Connectors */}
                    <svg className="connections-layer">
                        {NODES.map(node =>
                            node.connections.map(targetId => {
                                const target = NODES.find(n => n.id === targetId);
                                if (!target) return null;

                                return (
                                    <line
                                        key={`${node.id}-${targetId}`}
                                        x1={`${node.x}%`}
                                        y1={node.y * ROW_HEIGHT + 30}
                                        x2={`${target.x}%`}
                                        y2={target.y * ROW_HEIGHT + 30}
                                        className="connector-line"
                                    />
                                );
                            })
                        )}
                    </svg>

                    {/* Nodes Layer */}
                    {NODES.map(node => (
                        <div
                            key={node.id}
                            className={`roadmap-node-wrapper category-${node.category} ${activeNode === node.id ? 'active' : ''}`}
                            style={{
                                left: `${node.x}%`,
                                top: `${node.y * ROW_HEIGHT}px`
                            }}
                            onClick={() => handleNodeClick(node.id)}
                        >
                            <div className="node-box">
                                <span className="node-label">{node.label}</span>
                                <div className="click-hint">Click for details</div>
                            </div>
                            <div className="node-dot"></div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedNodeId && (
                <SubRoadmapModal
                    nodeId={selectedNodeId}
                    nodeDetails={NODE_DETAILS}
                    onClose={() => setSelectedNodeId(null)}
                />
            )}
        </div>
    );
};

export default BackendMasteryGraph;
