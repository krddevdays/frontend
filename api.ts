import crossFetch from 'cross-fetch';
import { format as urlFormat } from 'url';
import queryString from 'query-string';
import getConfig from 'next/config';
import { getContext } from './context';

type FetchInit = RequestInit & {
    headers?: Record<string, string>;
};

function fetch(input: RequestInfo, init?: FetchInit): ReturnType<typeof crossFetch> {
    if (typeof init === 'undefined') {
        init = {};
    }

    const newHeaders: Record<string, string> = { ...init.headers };
    const ctx = getContext();

    if (typeof window === 'undefined' && ctx && ctx && ctx.headers.cookie) {
        newHeaders.Cookie = ctx.headers.cookie;
    }

    init.headers = newHeaders;
    init.credentials = 'include';

    return crossFetch(input, init);
}

function createUrl(context: {
    pathname: string;
    query?: {
        [key: string]: any;
    };
}) {
    const url = urlFormat({
        protocol: getConfig().publicRuntimeConfig.backendProtocol,
        host: getConfig().publicRuntimeConfig.backendDomain,
        pathname: context.pathname,
    });

    if (typeof context.query === 'undefined') {
        return url;
    }

    const query = queryString.stringify(context.query, {
        arrayFormat: 'bracket',
    });

    return `${url}?${query}`;
}

type EventsResponse = Array<EventResponse>;

export const events = async (filter?: { date_from?: Date }): Promise<EventsResponse> => {
    const response = await fetch(
        createUrl({
            pathname: '/events/',
            query: {
                date_from: filter && filter.date_from ? filter.date_from.toISOString().slice(0, 10) : undefined,
            },
        }),
        {
            headers: {
                Accept: 'application/json',
            },
        },
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
                event_id: filter && filter.event_id ? filter.event_id : undefined,
            },
        }),
        {
            headers: {
                Accept: 'application/json',
            },
        },
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
    | {
          finish_date: string;
          start_date: string;
          thing: { title: string } | null;
          type: 'DISCUSSION';
          zone: string;
      }
>;

export const event = async (id: number): Promise<EventResponse | null> => {
    const response = await fetch(
        createUrl({
            pathname: `/events/${id}/`,
        }),
        {
            headers: {
                Accept: 'application/json',
            },
        },
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
            pathname: `/events/${id}/activities/`,
        }),
        {
            headers: {
                Accept: 'application/json',
            },
        },
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
            pathname: `/events/${id}/tickets/`,
        }),
        {
            headers: {
                Accept: 'application/json',
            },
        },
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
    order: Order,
): Promise<{
    id: string;
    payment_url: string;
    cancel_url: string;
    reserved_to: string;
    currency_id: string;
    price: number;
}> => {
    const response = await fetch(
        createUrl({
            pathname: `/events/${id}/order/`,
        }),
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        },
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

export const getProfile = async (): Promise<Profile> => {
    const response = await fetch(
        createUrl({
            pathname: `/users/me/`,
        }),
        {
            headers: {
                Accept: 'application/json',
            },
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return response.json();
};

type PatchProfile = {
    first_name?: string;
    last_name?: string;
    work?: string;
    position?: string;
};

export const patchProfile = async (profile: PatchProfile): Promise<Profile> => {
    const data: Partial<Omit<Profile, 'email' | 'username'>> = {};

    (Object.keys(profile) as Array<keyof typeof profile>).forEach((key) => {
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
            pathname: `/users/me/`,
        }),
        {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return response.json();
};

export const login = async (credentials: { username: string; password: string }): Promise<true> => {
    const response = await fetch(
        createUrl({
            pathname: `/users/login/`,
        }),
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return true;
};

export const logout = async (): Promise<true> => {
    const response = await fetch(
        createUrl({
            pathname: `/users/logout/`,
        }),
        {
            method: 'POST',
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return true;
};

type Registration = Profile & {
    password1: string;
    password2: string;
};

export const registration = async (profile: Registration): Promise<never> => {
    const response = await fetch(
        createUrl({
            pathname: `/users/registration/`,
        }),
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return void 0 as never;
};

type Discussion = {
    id: number;
    event_id: number;
    title: string;
    description: string;
    votes_count: number;
    my_vote: boolean;
};

type DiscussionsResponse = Array<Discussion>;

export const getDiscussions = async (filter?: { event_id?: number }): Promise<DiscussionsResponse> => {
    const response = await fetch(
        createUrl({
            pathname: `/discussions/`,
            query: {
                event_id: filter && filter.event_id ? filter.event_id : undefined,
            },
        }),
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return await response.json();
};

export const getDiscussion = async (id: number): Promise<Discussion> => {
    const response = await fetch(
        createUrl({
            pathname: `/discussions/${id}/`,
        }),
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return await response.json();
};

export const voteDiscussion = async (id: number): Promise<Discussion> => {
    const response = await fetch(
        createUrl({
            pathname: `/discussions/${id}/vote/`,
        }),
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return await response.json();
};

type PostDiscussion = {
    event_id: number;
    title: string;
    description: string;
};

export const addDiscussion = async (data: PostDiscussion): Promise<Discussion> => {
    const response = await fetch(
        createUrl({
            pathname: `/discussions/`,
        }),
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );

    if (response.status !== 201) {
        throw response;
    }

    return await response.json();
};

type LinkTicket = {
    id: string;
    email: string;
};

export const linkTicket = async (data: LinkTicket): Promise<LinkTicket> => {
    const response = await fetch(
        createUrl({
            pathname: `/checkout/link/`,
        }),
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return data;
};

type Ticket = {
    number: number;
    price: number;
    pdf_url: string | null;
    passbook_url: string | null;
};

export const getTickets = async (): Promise<Ticket[]> => {
    const response = await fetch(
        createUrl({
            pathname: `/me/tickets/`,
        }),
        {
            headers: {
                Accept: 'application/json',
            },
        },
    );

    if (response.status !== 200) {
        throw response;
    }

    return response.json();
};
