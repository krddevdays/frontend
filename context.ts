import { NextPageContext } from 'next';

let context: NextPageContext | undefined;

export function setContext(ctx: NextPageContext) {
    context = ctx;
}

export function getContext() {
    return context;
}
