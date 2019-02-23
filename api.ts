import fetch from 'cross-fetch';
import * as url from 'url';
import { EventRequest, EventResponse, EventsRequest, EventsResponse } from './typings/timepad';
import * as express from 'express';
import * as http from 'http';
import { UrlObject } from 'url';

function createUrl({ pathname, query, req }: Pick<UrlObject, 'pathname' | 'query'> & { req?: http.IncomingMessage }) {
    return url.format({
        protocol: req ? (req as express.Request).protocol : window.location.protocol,
        host: req ? req.headers.host : window.location.host,
        pathname,
        query
    });
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

    const eventsResponse = await (response.json() as Promise<EventsResponse>);

    return eventsResponse.values.map(event => ({
        id: event.id,
        name: event.name,
        startsAt: event.starts_at.replace(/(\d{2})(\d{2})$/, '$1:$2'),
        descriptionShort: event.description_short!,
        ticketTypes: event.ticket_types!.map(ticketType => ({
            price: ticketType.price,
            isActive: ticketType.is_active,
            requirePromocode: ticketType.is_promocode_locked
        }))
    }));
};

export const event = async (id: number, req?: http.IncomingMessage) => {
    const response = await fetch(
        createUrl({
            req,
            pathname: `/api/timepad/v1/events/${id}`,
            query: {
                fields: ['description_html', 'ticket_types', 'organization']
            } as EventRequest
        })
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    const event = await (response.json() as Promise<EventResponse>);

    if (event.organization!.id !== 81520) {
        throw new Error('Event not found');
    }

    return {
        id: event.id,
        name: event.name,
        startsAt: event.starts_at.replace(/(\d{2})(\d{2})$/, '$1:$2'),
        descriptionHtml: event.description_html!,
        ticketTypes: event.ticket_types!.map(ticketType => ({
            price: ticketType.price,
            isActive: ticketType.is_active,
            requirePromocode: ticketType.is_promocode_locked
        }))
    };
};
