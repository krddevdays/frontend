import fetch from 'cross-fetch';
import { format as urlFormat } from 'url';
import * as queryString from 'query-string';
import getConfig from 'next/config';

function createUrl(context: {
    pathname: string;
    query?: {
        [key: string]: any;
    };
}) {
    const url = urlFormat({
        protocol: getConfig().publicRuntimeConfig.backendProtocol,
        host: getConfig().publicRuntimeConfig.backendDomain,
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

type EventsResponse = Array<EventResponse>;

export const events = async (): Promise<EventsResponse> => {
    const response = await fetch(
        createUrl({
            pathname: '/events/'
        })
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};

type EventResponse = {
    id: number;
    name: string;
    start_date: string;
    finish_date: string;
    short_description: string;
    image: string;
    venue: {
        name: string;
        address: string;
        latitude: number;
        longitude: number;
    };
    full_description?: string;
    ticket_description?: string;
    image_vk?: string;
    image_facebook?: string;
};

type EventActivitiesResponse = Array<
    | {
          finish_date: string;
          start_date: string;
          thing: { title: string };
          type: 'WELCOME';
          zone: string;
      }
    | {
          finish_date: string;
          start_date: string;
          thing: {
              description: string;
              presentation_offline: string | null;
              speaker: {
                  first_name: string;
                  last_name: string;
                  avatar: string | null;
                  work: string | null;
                  position: string | null;
              };
              title: string;
              video: string | null;
          };
          type: 'TALK';
          zone: string;
      }
    | {
          finish_date: string;
          start_date: string;
          thing: {
              title: string;
          };
          type: 'COFFEE';
          zone: string;
      }
    | {
          finish_date: string;
          start_date: string;
          thing: { title: string };
          type: 'LUNCH';
          zone: string;
      }
>;

export const event = async (id: number): Promise<EventResponse | null> => {
    const response = await fetch(
        createUrl({
            pathname: `/events/${id}/`
        })
    );

    if (response.status === 404) {
        return null;
    }

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};

export const eventActivities = async (id: number): Promise<EventActivitiesResponse> => {
    const response = await fetch(
        createUrl({
            pathname: `/events/${id}/activities/`
        })
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};

type EventTicketsResponse = {
    is_active: boolean;
    sale_finish_date: string;
    sale_start_date: string | null;
    payments: Array<{
        id: number;
        type: 'card' | 'invoice';
    }>;
    types: Array<{
        id: number;
        disabled: boolean;
        name: string;
        price: {
            current_value: string;
            default_value: string;
            modifiers: Array<
                | {
                      value: string;
                      type: 'sales_count';
                      sales_count: number;
                  }
                | {
                      value: string;
                      type: 'date';
                      active_from: string;
                      active_to: string;
                  }
            >;
        };
    }>;
};

export const eventTickets = async (id: number): Promise<EventTicketsResponse | null> => {
    const response = await fetch(
        createUrl({
            pathname: `/events/${id}/tickets/`
        })
    );

    if (response.status === 404) {
        return null;
    }

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};

type Order = {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    tickets: Array<{
        type_id: string;
        first_name: string;
        last_name: string;
        email: string;
    }>;
    payment_id: string;
};

export const eventOrder = async (id: number, order: Order): Promise<{ url: 'string' }> => {
    const response = await fetch(
        createUrl({
            pathname: `/events/${id}/order/`
        }),
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }
    );

    if (response.status === 400) {
        throw response;
    }

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};
