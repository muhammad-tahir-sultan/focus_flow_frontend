import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { ChallengeData } from './types';
import { TASKS } from './types';

export const useChallengeNotifications = (data: ChallengeData | null) => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(Notification.permission === 'granted');
    const [lastNotified, setLastNotified] = useState<string | null>(null);

    const requestNotificationPermission = useCallback(async () => {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            setNotificationsEnabled(true);
            toast.success("Notifications enabled for daily reminders!");
            new Notification("Transformation Tracker", {
                body: "You'll receive daily reminders to complete your tasks!",
                icon: "/favicon.ico"
            });
        } else {
            setNotificationsEnabled(false);
            toast.error("Notification permission denied.");
        }
    }, []);

    const checkAndNotify = useCallback(() => {
        if (Notification.permission !== 'granted' || !data || data.today?.isFullyCompleted) return;

        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const todayStr = now.toDateString();
        const combinedKey = `${todayStr}-${hour}`;

        if ([10, 14, 20].includes(hour) && minute === 0 && lastNotified !== combinedKey) {
            const remainingCount = TASKS.length - (data.today?.taskLogs.filter(l => l.completed).length || 0);
            new Notification("Transformation Tracker", {
                body: `You still have ${remainingCount} tasks remaining today. Stay consistent!`,
                icon: "/favicon.ico",
                badge: "/favicon.ico"
            });
            setLastNotified(combinedKey);
        }
    }, [data, lastNotified]);

    useEffect(() => {
        const interval = setInterval(checkAndNotify, 60000);
        return () => clearInterval(interval);
    }, [checkAndNotify]);

    return {
        notificationsEnabled,
        requestNotificationPermission
    };
};
