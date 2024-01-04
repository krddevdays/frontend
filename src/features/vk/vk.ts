declare global {
    type TmrEvent = {
        id?: string;
        params?: object;
        url?: string;
    } & (
        | {
              type: 'pageView';
          }
        | {
              type: 'reachGoal';
              goal: string;
              value?: number;
          }
    );

    interface Window {
        VK?: {
            Goal: (conversionName: string, parameters?: object) => void;
            Retargeting: {
                Hit: () => void;
                Event: (eventName: string) => void;
                Add: (audienceID: number) => void;
            };
        };

        _tmr: {
            push(data: TmrEvent): void;
        };
    }
}

export function goal(conversionName: string, parameters?: object) {
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
