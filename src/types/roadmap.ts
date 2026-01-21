export interface SubTopic {
    title: string;
    description: string;
    isKey: boolean; // Highlights "Must Know" topics
}

export interface Resource {
    name: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'practice';
}

export interface NodeDetail {
    title: string;
    subtitle: string;
    timeline: string; // Estimated time to complete
    topics: SubTopic[];
    resources: Resource[];
    reasoning: {
        problem: string;
        solution: string;
        tradeoffs: string;
    };
    checklist: { title: string; checked: boolean }[];
}

export interface RoadmapNode {
    id: string;
    label: string;
    description: string;
    category: 'foundation' | 'language' | 'database' | 'architecture' | 'devops' | 'founder';
    x: number;
    y: number;
    connections: string[];
}
