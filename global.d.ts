declare let _tmr: TMRCounter | UninitializedTMRCounter;

interface TMRSendCustomEvent {
    type: 'reachGoal';
    goal: string;
    params?: IMRCustomEventParams;
    value?: number;
}

interface IMRCustomEventParams {
    [key: string]: string | number | boolean;
}

interface TMRPageView {
    type: 'pageView';
}

interface TMRCounter {
    push(instruction: TMRSendCustomEvent | TMRPageView): void;
}

type UninitializedTMRCounter = Array<TMRSendCustomEvent | TMRPageView>;
