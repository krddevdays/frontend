import * as React from 'react';
import { FormattedNumber } from 'react-intl';

export type TicketType = {
    price: number;
    isActive: boolean;
    requirePromocode: boolean;
};

function EventPriceContainer(props: { children: React.ReactNode }) {
    return <small className="badge badge-success">{props.children}</small>;
}

type EventPriceProps = {
    ticketTypes: TicketType[];
};

export default function EventPrice(props: EventPriceProps) {
    let minPrice = +Infinity;
    let maxPrice = -Infinity;

    props.ticketTypes.forEach(ticketType => {
        if (ticketType.isActive === false || ticketType.requirePromocode === true) {
            return;
        }

        if (ticketType.price < minPrice) {
            minPrice = ticketType.price;
        }

        if (ticketType.price > maxPrice) {
            maxPrice = ticketType.price;
        }
    });

    const isPaid = isFinite(minPrice) && maxPrice !== 0;

    if (isPaid === false) {
        return <EventPriceContainer>бесплатно</EventPriceContainer>;
    }

    if (minPrice === maxPrice) {
        return (
            <EventPriceContainer>
                <FormattedNumber value={minPrice} currency="RUB" style="currency" minimumFractionDigits={0} />
            </EventPriceContainer>
        );
    }

    return (
        <EventPriceContainer>
            <FormattedNumber value={minPrice} minimumFractionDigits={0} />
            {' - '}
            <FormattedNumber value={maxPrice} currency="RUB" style="currency" minimumFractionDigits={0} />
        </EventPriceContainer>
    );
}
