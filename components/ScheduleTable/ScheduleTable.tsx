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
    thing?: TalkCardProps;
};

export type ActivityProps =
    | BaseActivityProps & { type: 'WELCOME' | 'COFFEE' | 'LUNCH'; thing: { title: string } }
    | TalkActivityProps;

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
                    let activitiesRows = zones.reduce(
                        (activites, zone, zoneIndex) => {
                            if (!props.activitiesByZoneAndTime[zone][time]) {
                                return activites;
                            }

                            props.activitiesByZoneAndTime[zone][time].forEach((activity, index) => {
                                if (!activites[index]) {
                                    activites[index] = new Array(zones.length).fill(undefined);
                                }

                                activites[index][zoneIndex] = activity;
                            });

                            return activites;
                        },
                        [] as Array<ActivityProps[]>
                    );

                    return (
                        <React.Fragment key={timeIndex}>
                            <tr className="schedule-table__row">
                                <td className="schedule-table__time" rowSpan={activitiesRows.length}>
                                    {time}
                                </td>
                                {activitiesRows[0] &&
                                    activitiesRows[0].map((activity, index) => (
                                        <td className="schedule-table__activity-cell">
                                            {activity && <Activity key={index} {...activity} />}
                                        </td>
                                    ))}
                            </tr>
                            {activitiesRows.slice(1).map((activityRow, index) => (
                                <tr key={index} className="schedule-table__row">
                                    {activityRow.map((activity, index) => (
                                        <td className="schedule-table__activity-cell">
                                            {activity && <Activity key={index} {...activity} />}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    );
                })}
            </tbody>
        </table>
    );
}

function Activity(props: ActivityProps) {
    return (
        <div className="schedule-activity">
            <div className="schedule-activity__title">
                {props.thing ? props.thing.title : props.type === 'TALK' && 'Доклад'}
            </div>
            {props.type === 'TALK' && props.thing && (
                <div className="schedule-activity__author">
                    <Author {...props.thing.speaker} small />
                </div>
            )}
        </div>
    );
}

export default ScheduleTable;
