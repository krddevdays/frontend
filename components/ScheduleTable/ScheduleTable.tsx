import * as React from 'react';
import classNames from 'classnames';

import styles from './ScheduleTable.module.css';
import Author, { AuthorProps } from '../Author/Author';

type BaseActivityProps = {
    zone: string;
    finish_date: string;
    start_date: string;
};

type Talk = {
    description: string | null;
    speaker: AuthorProps;
    title: string;
    poster_image?: string;
}

export type TalkActivityProps = BaseActivityProps & {
    type: 'TALK';
    thing: Talk | null;
};

export type DiscussionActivityProps = BaseActivityProps & {
    type: 'DISCUSSION';
    thing: {
        title: string;
    } | null;
};

export type ActivityProps =
    | (BaseActivityProps & { type: 'WELCOME' | 'COFFEE' | 'LUNCH'; thing: { title: string } })
    | TalkActivityProps
    | DiscussionActivityProps;

type ScheduleTableProps = {
    className?: string;
    activitiesByZoneAndTime: {
        [key: string]: {
            [key: string]: ActivityProps[];
        };
    };
};

function ScheduleTable(props: ScheduleTableProps) {
    const zones = React.useMemo(() => Object.keys(props.activitiesByZoneAndTime).sort(), [
        props.activitiesByZoneAndTime
    ]);
    const times = React.useMemo(
        () =>
            Array.from(
                zones.reduce((times, zone) => {
                    Object.keys(props.activitiesByZoneAndTime[zone]).forEach(item => times.add(item));

                    return times;
                }, new Set<string>())
            ).sort(),
        [zones, props.activitiesByZoneAndTime]
    );

    return (
        <table className={classNames(styles.scheduleTable, props.className)}>
            {zones.length > 1 && (
                <thead>
                    <tr>
                        <td />
                        {zones.map((zone, index) => (
                            <th className={styles.scheduleTable__zone} key={index}>
                                {zone}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {times.map((time, timeIndex) => {
                    const hasActivities = zones.some(
                        zone => typeof props.activitiesByZoneAndTime[zone][time] !== 'undefined'
                    );

                    return (
                        <React.Fragment key={timeIndex}>
                            <tr className={styles.scheduleTable__row}>
                                <td className={styles.scheduleTable__time} rowSpan={hasActivities ? 2 : 1}>
                                    {time}
                                </td>
                            </tr>
                            {hasActivities && (
                                <tr className={styles.scheduleTable__row}>
                                    {zones.map((zone, index) => (
                                        <td className={styles.scheduleTable__activityCell} key={index}>
                                            {props.activitiesByZoneAndTime[zone][time] && (
                                                <div className={styles.scheduleTable__activityCellContent}>
                                                    {props.activitiesByZoneAndTime[zone][time].map(
                                                        (activity, index) => (
                                                            <Activity {...activity} key={index} />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            )}
                        </React.Fragment>
                    );
                })}
            </tbody>
        </table>
    );
}

function Activity(props: ActivityProps) {
    let title = props.thing && props.thing.title;

    if (!title) {
        switch (props.type) {
            case 'TALK':
                title = 'Доклад';
                break;
        }
    }

    return (
        <div className={styles.scheduleActivity}>
            <div className={styles.scheduleActivity__title}>{title}</div>
            {props.type === 'TALK' && props.thing && (
                <div className={styles.scheduleActivity__author}>
                    <Author {...props.thing.speaker} small />
                </div>
            )}
            {props.type === 'DISCUSSION' && props.thing && (
                <div className={styles.scheduleActivity__author}>Круглый стол</div>
            )}
        </div>
    );
}

export default ScheduleTable;
