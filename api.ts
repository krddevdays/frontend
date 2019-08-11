import fetch from 'cross-fetch';
import { format as urlFormat } from 'url';
import * as queryString from 'query-string';
import getConfig from 'next/config';
import { NextPageContext } from 'next';
import * as Cookie from 'js-cookie';

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

export const events = async (filter?: { date_from?: Date }): Promise<EventsResponse> => {
    const response = await fetch(
        createUrl({
            pathname: '/events/',
            query: {
                date_from: filter && filter.date_from ? filter.date_from.toISOString().slice(0, 10) : undefined
            }
        }),
        {
            headers: {
                Accept: 'application/json'
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};

type TalkResponse = {
    description: string | null;
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
    poster_image?: string;
};

type TalksResponse = Array<TalkResponse>;

export const talks = async (filter?: { event_id?: number }): Promise<TalksResponse> => {
    const response = await fetch(
        createUrl({
            pathname: '/talks/',
            query: {
                event_id: filter && filter.event_id ? filter.event_id : undefined
            }
        }),
        {
            headers: {
                Accept: 'application/json'
            }
        }
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
          thing: TalkResponse;
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
        }),
        {
            headers: {
                Accept: 'application/json'
            }
        }
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
        }),
        {
            headers: {
                Accept: 'application/json'
            }
        }
    );

    if (response.status !== 200) {
        throw new Error(await response.text());
    }

    return response.json();
};

type EventTicketsResponse = {
    is_active: boolean;
    sale_start_date: string | null;
    sale_finish_date: string;
    payments: Array<{
        id: number;
        type: 'card' | 'invoice';
        agree_url: string;
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
        }),
        {
            headers: {
                Accept: 'application/json'
            }
        }
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

export const eventOrder = async (
    id: number,
    order: Order
): Promise<{
    id: string;
    payment_url: string;
    cancel_url: string;
    reserved_to: string;
    currency_id: string;
    price: string;
}> => {
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

type Profile = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    work: string | null;
    position: string | null;
};

export const getProfile = async (ctx?: NextPageContext): Promise<Profile> => {
    const headers: HeadersInit = {
        Accept: 'application/json'
    };

    if (typeof window === 'undefined' && ctx && ctx.req) {
        headers.Cookie = ctx.req.headers.cookie as string;
    }

    const response = await fetch(
        createUrl({
            pathname: `/users/me/`
        }),
        {
            credentials: 'include',
            headers
        }
    );

    if (response.status !== 200) {
        throw response;
    }

    return response.json();
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.getProfile = getProfile;
}

type PatchProfile = {
    first_name?: string;
    last_name?: string;
    work?: string;
    position?: string;
};

export const patchProfile = async (profile: PatchProfile): Promise<Profile> => {
    const data: Partial<Omit<Profile, 'email' | 'username'>> = {};

    (Object.keys(profile) as Array<keyof typeof profile>).forEach(key => {
        const value = profile[key];

        switch (key) {
            case 'work':
            case 'position':
                if (value === '') {
                    data[key] = null;
                    break;
                }
            default:
                data[key] = value;
        }
    });

    const response = await fetch(
        createUrl({
            pathname: `/users/me/`
        }),
        {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    if (response.status !== 200) {
        throw response;
    }

    return response.json();
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.patchProfile = patchProfile;
}

export const login = async (credentials: { username: string; password: string }): Promise<true> => {
    const response = await fetch(
        createUrl({
            pathname: `/users/login/`
        }),
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
    );

    if (response.status !== 200) {
        throw response;
    }

    return true;
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.login = login;
}

export const logout = async (): Promise<true> => {
    const response = await fetch(
        createUrl({
            pathname: `/users/logout/`
        }),
        {
            method: 'POST',
            credentials: 'include'
        }
    );

    if (response.status !== 200) {
        throw response;
    }

    return true;
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.logout = logout;
}

type Registration = Profile & {
    password1: string;
    password2: string;
};

export const registration = async (profile: Registration): Promise<never> => {
    const response = await fetch(
        createUrl({
            pathname: `/users/registration/`
        }),
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        }
    );

    if (response.status !== 200) {
        throw response;
    }

    return void 0 as never;
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.registration = registration;
}

type DiscussionsResponse = Array<{
    event_id: number;
    title: string;
    description: string;
    votes_count: number;
}>;

export const discussions = async (filter?: { event_id?: number }): Promise<DiscussionsResponse> => {
    const response = await fetch(
        createUrl({
            pathname: `/discussions/`,
            query: {
                event_id: filter && filter.event_id ? filter.event_id : undefined
            }
        }),
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );

    if (response.status !== 200) {
        throw response;
    }

    return await response.json();
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.discussions = discussions;
}

function getCSRFToken(): string {
    return Cookie.get('csrftoken') as string;
}

export const voteDiscussion = async (id: number): Promise<any> => {
    const response = await fetch(
        createUrl({
            pathname: `/discussions/${id}/vote/`
        }),
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'X-CSRFToken': getCSRFToken()
            }
        }
    );

    if (response.status !== 200) {
        throw response;
    }

    return await response.json();
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.voteDiscussion = voteDiscussion;
}

type Discussion = {
    event_id: number;
    title: string;
    description: string;
};

export const addDiscussion = async (data: Discussion): Promise<any> => {
    const response = await fetch(
        createUrl({
            pathname: `/discussions/`
        }),
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken()
            },
            body: JSON.stringify(data)
        }
    );

    if (response.status !== 200) {
        throw response;
    }

    return await response.json();
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.addDiscussion = addDiscussion;
}
