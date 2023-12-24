import { IncomingMessage } from 'http';

let context: IncomingMessage | undefined;

export function setContext(ctx: IncomingMessage) {
    context = ctx;
}

export function getContext() {
    return context;
}
