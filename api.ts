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

export type EventsResponse = Array<EventResponse>;

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

export type EventResponse = {
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

export type EventActivitiesResponse = Array<
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

export const event = async (id: number): Promise<EventResponse> => {
    const response = await fetch(
        createUrl({
            pathname: `/events/${id}/`
        })
    );

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
