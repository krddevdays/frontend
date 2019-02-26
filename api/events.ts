import fetch from 'cross-fetch';
import { EventResponse, EventsRequest, EventsResponse } from '../typings/timepad';
import * as express from 'express';
import * as queryString from 'query-string';

function createUrl(context: {
    url: string;
    query?: {
        [key: string]: any;
    };
}) {
    if (typeof context.query === 'undefined') {
        return context.url;
    }

    const query = queryString.stringify(context.query, {
        arrayFormat: 'bracket'
    });

    return `${context.url}?${query}`;
}

function fixDatetimeString(value: string) {
    return value.replace(/(\d{2})(\d{2})$/, '$1:$2');
}

const events = async () => {
    const response = await fetch(
        createUrl({
            url: 'https://api.timepad.ru/v1/events',
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
        ticketTypes: event.ticket_types
            ? event.ticket_types.map(ticketType => ({
                  price: ticketType.price,
                  isActive: ticketType.is_active,
                  requirePromocode: ticketType.is_promocode_locked
              }))
            : []
    }));
};

const event = async (id: number) => {
    const response = await fetch(
        createUrl({
            url: `https://api.timepad.ru/v1/events/${id}`
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
        descriptionHtml: event.description_html,
        url: event.url,
        isRegistrationOpened: event.registration_data ? event.registration_data.is_registration_open : false,
        ticketTypes: event.ticket_types
            ? event.ticket_types.map(ticketType => ({
                  price: ticketType.price,
                  isActive: ticketType.is_active,
                  requirePromocode: ticketType.is_promocode_locked
              }))
            : []
    };
};

export default express
    .Router()
    .get('/', (_, res, next) =>
        events()
            .then(events => {
                res.json(events);
            })
            .catch(error => next(error))
    )
    .get('/:id', (req, res, next) =>
        event(req.params.id)
            .then(event => {
                res.json(event);
            })
            .catch(error => next(error))
    );
