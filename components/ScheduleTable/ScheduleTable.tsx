import * as React from 'react';
import classNames from 'classnames';

import './ScheduleTable.css';

type BaseActivityProps = {
    zone: string;
    finish_date: string;
    start_date: string;
};

type TalkActivityProps = BaseActivityProps & {
    type: 'TALK';
    thing?: {
        description: string;
        speaker: {
            first_name: string;
            last_name: string;
            avatar: string | null;
            work: string | null;
            position: string | null;
        };
        title: string;
    };
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
                {times.map((time, timeIndex) => (
                    <tr key={timeIndex} className="schedule-table__row">
                        <td className="schedule-table__time">{time}</td>
                        {zones.map((zone, index) => (
                            <td className="schedule-table__activity-cell" key={index}>
                                {props.activitiesByZoneAndTime[zone][time] &&
                                    props.activitiesByZoneAndTime[zone][time].map((activity, index) => (
                                        <div className="schedule-table__activity" key={index}>
                                            <div className="schedule-table__activity-title">
                                                {activity.thing
                                                    ? activity.thing.title
                                                    : activity.type === 'TALK' && 'Доклад'}
                                            </div>
                                            {activity.type === 'TALK' && activity.thing && (
                                                <div className="schedule-table__activity-author">
                                                    {[
                                                        activity.thing.speaker.first_name,
                                                        activity.thing.speaker.last_name
                                                    ].join(' ')}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ScheduleTable;
