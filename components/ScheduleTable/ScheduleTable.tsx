import * as React from 'react';
import classNames from 'classnames';

import { TalkCardProps } from '../TalkCard/TalkCard';
import './ScheduleTable.css';
import Author from '../Author/Author';

type BaseActivityProps = {
    zone: string;
    finish_date: string;
    start_date: string;
};

export type TalkActivityProps = BaseActivityProps & {
    type: 'TALK';
    thing: TalkCardProps | null;
};

export type DiscussionActivityProps = BaseActivityProps & {
    type: 'DISCUSSION';
    thing: {
        title: string;
    } | null;
};

export type ActivityProps =
    | BaseActivityProps & { type: 'WELCOME' | 'COFFEE' | 'LUNCH'; thing: { title: string } }
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
        <table className={classNames('schedule-table', props.className)}>
            {zones.length > 1 && (
                <thead>
                    <tr>
                        <td />
                        {zones.map((zone, index) => (
                            <th className="schedule-table__zone" key={index}>
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
                            <tr className="schedule-table__row">
                                <td className="schedule-table__time" rowSpan={hasActivities ? 2 : 1}>
                                    {time}
                                </td>
                            </tr>
                            {hasActivities && (
                                <tr className="schedule-table__row">
                                    {zones.map((zone, index) => (
                                        <td className="schedule-table__activity-cell" key={index}>
                                            {props.activitiesByZoneAndTime[zone][time] && (
                                                <div className="schedule-table__activity-cell-content">
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
        <div className="schedule-activity">
            <div className="schedule-activity__title">{title}</div>
            {props.type === 'TALK' && props.thing && (
                <div className="schedule-activity__author">
                    <Author {...props.thing.speaker} small />
                </div>
            )}
            {props.type === 'DISCUSSION' && props.thing && (
                <div className="schedule-activity__author">Круглый стол</div>
            )}
        </div>
    );
}

export default ScheduleTable;
