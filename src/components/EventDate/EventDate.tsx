import * as React from 'react';
import { FormattedDate, useIntl } from 'react-intl';

function convertTZ(date: Date | string | number, tzString: string) {
    return new Date((date instanceof Date ? date : new Date(date)).toLocaleString('en-US', { timeZone: tzString }));
}

export function EventDate(props: { startAt: Date; finishAt: Date; compact?: boolean }) {
    const { startAndFinishSameDay, inCurrentYear } = useEventDateHelper(props.startAt, props.finishAt);

    if (startAndFinishSameDay) {
        if (props.compact) {
            return (
                <span>
                    <FormattedDate
                        value={props.startAt}
                        month="long"
                        day="numeric"
                        year={!inCurrentYear ? 'numeric' : undefined}
                    />
                </span>
            );
        }

        return (
            <div>
                <FormattedDate
                    value={props.startAt}
                    month="long"
                    day="numeric"
                    year={!inCurrentYear ? 'numeric' : undefined}
                />
                <br />
                с <FormattedDate value={props.startAt} hour="numeric" minute="numeric" /> до{' '}
                <FormattedDate value={props.finishAt} hour="numeric" minute="numeric" />
            </div>
        );
    }

    if (props.compact) {
        return (
            <span>
                <FormattedDate value={props.startAt} day="numeric" />
                -
                <FormattedDate
                    value={props.finishAt}
                    month="long"
                    day="numeric"
                    year={!inCurrentYear ? 'numeric' : undefined}
                />
            </span>
        );
    }

    return (
        <div>
            <FormattedDate value={props.startAt} day="numeric" />
            -
            <FormattedDate
                value={props.finishAt}
                month="long"
                day="numeric"
                year={!inCurrentYear ? 'numeric' : undefined}
            />
            <br />
            с <FormattedDate value={props.startAt} hour="numeric" minute="numeric" /> до{' '}
            <FormattedDate value={props.finishAt} hour="numeric" minute="numeric" />
        </div>
    );
}

export function useEventDateHelper(startAt: Date, finishAt: Date) {
    const intl = useIntl();

    const currentDate = intl.timeZone ? convertTZ(new Date(), intl.timeZone) : new Date();
    const convertedStartAt = intl.timeZone ? convertTZ(startAt, intl.timeZone) : startAt;
    const convertedFinishAt = intl.timeZone ? convertTZ(finishAt, intl.timeZone) : finishAt;

    const inCurrentYear =
        currentDate.getFullYear() === convertedStartAt.getFullYear() &&
        currentDate.getFullYear() === convertedFinishAt.getFullYear();

    const startAndFinishSameDay =
        convertedStartAt.getFullYear() === convertedFinishAt.getFullYear() &&
        convertedStartAt.getMonth() === convertedFinishAt.getMonth() &&
        convertedStartAt.getDate() === convertedFinishAt.getDate();

    return {
        inCurrentYear,
        startAndFinishSameDay,
    };
}
