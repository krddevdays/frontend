import fetch from 'cross-fetch';
import { format as urlFormat } from 'url';
import * as express from 'express';
import * as http from 'http';
import * as queryString from 'query-string';

function createUrl(context: {
    pathname: string;
    query?: {
        [key: string]: any;
    };
    req?: http.IncomingMessage;
}) {
    const protocol = context.req ? (context.req as express.Request).protocol : window.location.protocol;
    const host = context.req ? context.req.headers.host : window.location.host;
    const url = urlFormat({
        protocol,
        host,
        pathname: context.pathname
    });

    if (typeof context.query === 'undefined') {
        return url;
    }

    const query = queryString.stringify(context.query, {
        arrayFormat: 'bracket'
    });

    return `${url}?${query}`;
}

export const events = async (req?: http.IncomingMessage) => {
    const response = await fetch(
        createUrl({
            req,
            pathname: '/api/events'
        })
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};

export const event = async (id: number, req?: http.IncomingMessage) => {
    const response = await fetch(
        createUrl({
            req,
            pathname: `/api/events/${id}`
        })
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};
