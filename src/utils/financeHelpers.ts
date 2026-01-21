
export const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
        'Food & Dining': '🍽️',
        'Transportation': '🚗',
        'Utilities': '💡',
        'Entertainment': '🎮',
        'Healthcare': '⚕️',
        'Education': '📚',
        'Shopping': '🛍️',
        'Housing': '🏠',
        'Investment': '📈',
        'Other': '📦',
        'Salary': '💼',
        'Freelance': '💻',
        'Business': '🏢',
        'Investment Returns': '📊',
        'Rental Income': '🏘️',
        'Bonus': '🎁',
        'Gift': '🎉',
        'Refund': '↩️',
    };
    return icons[category] || '💰';
};

export const getGoalIcon = (goalType: string) => {
    const icons: Record<string, string> = {
        'Emergency Fund': '🚨',
        'Retirement': '👴',
        'Investment': '📈',
        'Education': '🎓',
        'House/Property': '🏠',
        'Vehicle': '🚗',
        'Vacation': '✈️',
        'Wedding': '💍',
        'Business': '🏢',
        'Other': '🎯',
    };
    return icons[goalType] || '🎯';
};
