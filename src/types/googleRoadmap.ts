export interface Resource {
    name: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'practice';
}

export interface Task {
    id: string;
    text: string;
    completed: boolean;
    resources?: Resource[];
}

export interface Phase {
    id: string;
    number: number;
    title: string;
    duration: string;
    theme: string;
    color: string;
    tasks: Task[];
    details?: string;
}
