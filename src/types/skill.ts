export interface SkillEntry {
    id: string;
    date: string;
    skillName: string;
    duration: string;
    category: 'Technical' | 'Soft Skill' | 'Language' | 'Other';
    notes: string;
    masteryLevel: number; // 1-10
}

export interface SkillFormData {
    skillName: string;
    duration: string;
    category: string;
    notes: string;
    masteryLevel: number;
    date: string;
}
