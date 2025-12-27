export interface Goal {
    _id: string;
    title: string;
    category: string;
    horizon: string;
    endDate: string;
    status: string;
    dropReason?: string;
}

export interface GoalFormData {
    title: string;
    category: string;
    horizon: string;
}
