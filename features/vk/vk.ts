declare global {
    interface Window {
        VK?: {
            Goal: (conversionName: string, parameters?: Object) => void;
            Retargeting: {
                Hit: () => void;
                Event: (eventName: string) => void;
                Add: (audienceID: number) => void;
            };
        };
    }
}

export function goal(conversionName: string, parameters?: Object) {
    window?.VK?.Goal(conversionName, parameters);
}

export function hit() {
    window?.VK?.Retargeting.Hit();
}

export function event(name: string) {
    window?.VK?.Retargeting.Event(name);
}

export function add(id: number) {
    window?.VK?.Retargeting?.Add(id);
}
