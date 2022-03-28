declare global {
    interface Window {
        VK?: {
            Retargeting?: {
                Hit: () => void,
                Event: (eventName: string) => void,
                Add: (audienceID: number) => void
            }
        };
    }
}

export function hit() {
    window?.VK?.Retargeting?.Hit();
}

export function event(name: string) {
    window?.VK?.Retargeting?.Event(name);
}

export function add(id: number) {
    window?.VK?.Retargeting?.Add(id);
}
