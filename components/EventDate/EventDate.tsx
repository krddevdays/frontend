import * as React from 'react';
import { FormattedDate } from 'react-intl';

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
    const currentDate = new Date();
    const inCurrentYear =
        currentDate.getFullYear() === startAt.getFullYear() && currentDate.getFullYear() === finishAt.getFullYear();

    const startAndFinishSameDay =
        startAt.getFullYear() === finishAt.getFullYear() &&
        startAt.getMonth() === finishAt.getMonth() &&
        startAt.getDate() === finishAt.getDate();

    return {
        inCurrentYear,
        startAndFinishSameDay,
    };
}
