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

export type EventsResponse = {
    id: number;
    name: string;
    startsAt: string;
    descriptionShort: string | undefined;
    ticketTypes: {
        price: number;
        isActive: boolean;
        requirePromocode: boolean;
    }[];
}[];

export const events = async (req?: http.IncomingMessage): Promise<EventsResponse> => {
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

export type EventResponse = {
    id: number;
    name: string;
    startsAt: string;
    descriptionHtml: string | undefined;
    url: string;
    isRegistrationOpened: boolean;
    location?: {
        country: string;
        city: string;
        address: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
    ticketTypes: {
        price: number;
        isActive: boolean;
        requirePromocode: boolean;
    }[];
};

export const event = async (id: number, req?: http.IncomingMessage): Promise<EventResponse> => {
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
