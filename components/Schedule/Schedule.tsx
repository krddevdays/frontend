import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import './Schedule.css';

type BaseActivityProps = {
    zone: string;
    finish_date: string;
    start_date: string;
};

type TalkActivityProps = BaseActivityProps & {
    type: 'TALK';
    thing: {
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

type ScheduleProps = {
    activities: ActivityProps[];
} & InjectedIntlProps;

function Schedule(props: ScheduleProps) {
    const activityByDateTimeAndZone = React.useMemo(
        () =>
            props.activities.reduce(
                (result, activity) => {
                    const date = props.intl.formatDate(activity.start_date, {
                        day: '2-digit',
                        month: '2-digit'
                    });

                    if (!result[date]) {
                        result[date] = {};
                    }

                    const time = props.intl.formatDate(activity.start_date, {
                        hour: '2-digit',
                        minute: '2-digit'
                    });

                    if (!result[date][activity.zone]) {
                        result[date][activity.zone] = {};
                    }

                    if (!result[date][activity.zone][time]) {
                        result[date][activity.zone][time] = [];
                    }

                    result[date][activity.zone][time].push(activity);

                    result[date][activity.zone][time].sort((a, b) => a.thing.title.length - b.thing.title.length);

                    return result;
                },
                {} as { [key: string]: { [key: string]: { [key: string]: ActivityProps[] } } }
            ),
        [props.activities, props.intl]
    );

    const dates = React.useMemo(() => Object.keys(activityByDateTimeAndZone), [activityByDateTimeAndZone]).sort();
    const [date] = React.useState(dates[0]);

    const zones = Object.keys(activityByDateTimeAndZone[date]).sort();
    const times = Array.from(
        zones.reduce((times, zone) => {
            Object.keys(activityByDateTimeAndZone[date][zone]).forEach(item => times.add(item));

            return times;
        }, new Set<string>())
    ).sort();

    return (
        <table className="schedule">
            {zones.length > 1 && (
                <thead>
                    <tr>
                        <td />
                        {zones.map((zone, index) => (
                            <th className="schedule__zone" key={index}>
                                {zone}
                            </th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {times.map((time, timeIndex) => (
                    <tr key={timeIndex} className="schedule__row">
                        <td className="schedule__time">{time}</td>
                        {zones.map((zone, index) => (
                            <td className="schedule__activity-cell" key={index}>
                                {activityByDateTimeAndZone[date][zone][time] &&
                                    activityByDateTimeAndZone[date][zone][time].map((activity, index) => (
                                        <div className="schedule__activity" key={index}>
                                            <div className="schedule__activity-title">{activity.thing.title}</div>
                                            {activity.type === 'TALK' && (
                                                <div className="schedule__activity-author">
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

export default injectIntl(Schedule);
