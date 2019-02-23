type EventsRequest = {
    fields?: Array<EventResponseOptionalFields>;
    limit?: number; // min 1, max 100, default 10
    skip?: number;
    sort?: Array<'+name' | '-name' | '+starts_at' | '-starts_at'>;
    organization_ids?: number[];
    moderation_status?: ModerationStatus[];
    access_statuses?: AccessStatus[];
    starts_at_min?: string; // Date
    starts_at_max?: string; // Date
    created_at_min?: string; // Date
    created_at_max?: string; // Date
};

type ImageResponse = {
    default_url: string;
    uploadcare_url: string;
};

type CategoryResponse = {
    id: number;
    name: string;
};

type ModerationStatus = 'featured' | 'shown' | 'hidden' | 'not_moderated';
type AccessStatus = 'private' | 'draft' | 'link_only' | 'public';

type TicketTypeResponse = {
    id: number;
    name: string;
    description?: string;
    buy_amount_min: number;
    buy_amount_max: number;
    price: number;
    is_promocode_locked: boolean;
    remaining: number;
    sale_ends_at: string; // Date
    sale_starts_at?: string; // Date
    public_key: string;
    is_active: boolean;
    ad_partner_profit?: number;
    send_personal_links: boolean; // optional in docs
    sold: number; // optional without token with access to this data
    attended: number; // optional without token with access to this data
    limit?: number;
    status: 'ok' | 'deleted' | 'protected' | 'late' | 'notstarted' | 'crowd'; // optional in docs
};

type QuestionResponse = {
    field_id: number;
    name: string;
    comment?: string;
    type: 'text' | 'multiline_text' | 'select_one' | 'select_many' | 'upload' | 'agree';
    possible_answers: Array<{
        id: number;
        name: string;
    }>;
    is_mandatory: boolean;
    is_for_every_visitor: boolean;
    meta: object; // TODO
};

type LocationResponse = {
    country: string;
    city: string;
    address: string;
    coordinates: [number, number];
};

type OrganizationResponse = {
    id: number;
    name: string;
    description_html: string;
    url: string;
    logo_image: ImageResponse;
    subdomain: string;
    permissions?: string[]; // TODO: enum
};

type RegistrationDataResponse = {
    price_max: number;
    price_min: number;
    sale_ends_at: string; // Date
    tickets_total: number;
    tickets_limit: number;
    is_registration_open: boolean;
};

type WidgetResponse = {
    code_html: string;
};

type EventResponseOptional = {
    created_at: string; // Date
    ends_at: string; // Date
    description_short: string;
    description_html: string;
    ad_partner_percent: number;
    locale: 'ru' | string; // TODO: enum
    location: LocationResponse;
    organization: OrganizationResponse;
    tickets_limit: number;
    ticket_types: TicketTypeResponse[];
    personal_links: string[]; // requires view_private_events
    questions: QuestionResponse[];
    age_limit: 0 | 6 | 12 | 16 | 18;
    properties: string[]; // TODO
    access_status: AccessStatus;
    registration_data: RegistrationDataResponse;
    is_sending_free_tickets: boolean;
    widgets: {
        button: WidgetResponse,
        custom: WidgetResponse
    };
    personal_link_title: boolean; // requires view_private_events
}

type EventResponseOptionalFields = keyof EventResponseOptional;

type EventsEventResponse<T extends keyof EventResponseOptional> = {
    id: number;
    starts_at: string; // Date
    name: string;
    url: string;
    poster_image: ImageResponse;
    categories: CategoryResponse[];
    moderation_status: ModerationStatus;
} & Partial<Pick<EventResponseOptional, T>>;

export type EventsResponse<T extends keyof EventResponseOptional = never> = {
    total: number;
    values: EventsEventResponse<T>[]
};

export type EventResponse = {
    id: number;
    starts_at: string; // Date
    name: string;
    url: string;
    poster_image: ImageResponse;
    categories: CategoryResponse[];
    moderation_status: ModerationStatus;
} & Partial<EventResponseOptional>;
