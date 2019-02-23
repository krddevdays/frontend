import * as React from 'react';
import { FormattedDate as IntlFormattedDate } from 'react-intl';

export default function FormattedDate({ value }: { value: Date }) {
    const currentDate = new Date();

    if (value.getFullYear() === currentDate.getFullYear()) {
        return <IntlFormattedDate value={value} month="long" day="numeric" hour="numeric" minute="numeric" />;
    }

    return (
        <IntlFormattedDate value={value} year="numeric" month="long" day="numeric" hour="numeric" minute="numeric" />
    );
}
