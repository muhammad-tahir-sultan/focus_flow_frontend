export const calculateExpectedDate = (horizon: string) => {
    const date = new Date();
    switch (horizon) {
        case 'Daily': date.setDate(date.getDate() + 1); break;
        case '30 Days': date.setDate(date.getDate() + 30); break;
        case '3 Months': date.setMonth(date.getMonth() + 3); break;
        case '6 Months': date.setMonth(date.getMonth() + 6); break;
        case '1 Year': date.setFullYear(date.getFullYear() + 1); break;
        case '2 Years': date.setFullYear(date.getFullYear() + 2); break;
        case '3 Years': date.setFullYear(date.getFullYear() + 3); break;
        case '5 Years': date.setFullYear(date.getFullYear() + 5); break;
        default: date.setDate(date.getDate() + 30);
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const formatTimeRemaining = (endDate: string) => {
    const now = new Date().getTime();
    const target = new Date(endDate).getTime();
    const diff = target - now;

    if (diff <= 0) return 'ELAPSED';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
};

export const formatHours = (hours: number) => {
    if (!hours || hours <= 0) return '0h';
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);

    if (h > 0 && m > 0) return `${h}h ${m}m`;
    if (h > 0) return `${h}h`;
    return `${m}m`;
};
