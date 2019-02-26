import fetch from 'cross-fetch';
import { format as urlFormat } from 'url';
import { EventResponse, EventsRequest, EventsResponse } from './typings/timepad';
import * as express from 'express';
import * as http from 'http';
import * as queryString from 'query-string'

function createUrl(context: {
    pathname: string;
    query?: {
        [key: string]: any
    },
    req?: http.IncomingMessage
}) {
    const protocol = context.req ? (context.req as express.Request).protocol : window.location.protocol;
    const host = context.req ? context.req.headers.host : window.location.host;
    const url = urlFormat({
        protocol,
        host,
        pathname: context.pathname,
    });

    if(typeof context.query === 'undefined') {
        return url;
    }

    const query = queryString.stringify(context.query, {
        arrayFormat: 'bracket'
    });

    return `${url}?${query}`
}

function fixDatetimeString(value: string) {
    return value.replace(/(\d{2})(\d{2})$/, '$1:$2');
}

export const events = async (req?: http.IncomingMessage) => {
    const response = await fetch(
        createUrl({
            req,
            pathname: '/api/timepad/v1/events',
            query: {
                organization_ids: [81520],
                starts_at_min: new Date(0).toISOString(),
                fields: ['description_short', 'ticket_types'],
                limit: 100,
                sort: ['-starts_at']
            } as EventsRequest
        })
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    const eventsResponse = await (response.json() as Promise<EventsResponse<'description_short' | 'ticket_types'>>);

    return eventsResponse.values.map(event => ({
        id: event.id,
        name: event.name,
        startsAt: fixDatetimeString(event.starts_at),
        descriptionShort: event.description_short,
        ticketTypes: event.ticket_types ? event.ticket_types.map(ticketType => ({
            price: ticketType.price,
            isActive: ticketType.is_active,
            requirePromocode: ticketType.is_promocode_locked
        })) : []
    }));
};

export const event = async (id: number, req?: http.IncomingMessage) => {
    const response = await fetch(
        createUrl({
            req,
            pathname: `/api/timepad/v1/events/${id}`
        })
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    const event = await (response.json() as Promise<EventResponse>);

    if (typeof event.organization === 'undefined' || event.organization.id !== 81520) {
        throw new Error('Event not found');
    }

    return {
        id: event.id,
        name: event.name,
        startsAt: fixDatetimeString(event.starts_at),
        location: event.location && {
            ...event.location,
            coordinates: {
                lng: event.location.coordinates[0],
                lat: event.location.coordinates[1],
            },
        },
        descriptionHtml: event.description_html,
        url: event.url,
        isRegistrationOpened: event.registration_data ? event.registration_data.is_registration_open : false,
        ticketTypes: event.ticket_types ? event.ticket_types.map(ticketType => ({
            price: ticketType.price,
            isActive: ticketType.is_active,
            requirePromocode: ticketType.is_promocode_locked
        })) : []
    };
};
