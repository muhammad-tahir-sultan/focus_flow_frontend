import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * Lazy load a component with retry logic
 * This helps handle chunk loading failures in production
 */
export function lazyWithRetry<T extends ComponentType<any>>(
    componentImport: () => Promise<{ default: T }>,
    retries = 3,
    interval = 1000
): LazyExoticComponent<T> {
    return lazy(async () => {
        const pageHasAlreadyBeenForceRefreshed = JSON.parse(
            window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
        );

        try {
            const component = await componentImport();

            window.sessionStorage.setItem('page-has-been-force-refreshed', 'false');

            return component;
        } catch (error) {
            if (!pageHasAlreadyBeenForceRefreshed) {
                // Assuming that the user is not on the latest version of the application.
                // Let's refresh the page immediately to get the latest version.
                window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
                window.location.reload();
                // Return a never-resolving promise to prevent rendering
                return new Promise(() => { });
            }

            // The page has already been reloaded
            // Assuming that user is already using the latest version of the application.
            // Let's try to load the component again with retries
            for (let i = 0; i < retries; i++) {
                try {
                    return await componentImport();
                } catch (err) {
                    console.error(`Retry ${i + 1}/${retries} failed:`, err);
                    if (i < retries - 1) {
                        await new Promise(resolve => setTimeout(resolve, interval));
                    }
                }
            }

            // All retries failed
            throw error;
        }
    });
}
