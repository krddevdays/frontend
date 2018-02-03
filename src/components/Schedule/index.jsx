import React from "react";
import _sortBy from "lodash/sortBy";
import speakers, {lectureDuration} from "../../speakers";
import styles from "./index.css";
import Timeline from "./Timeline";

const timeline = _sortBy(speakers.map(speaker => ({
    time: speaker.time.clone(),
    title: speaker.lecture,
    subtitle: speaker.name,
})), "time");

timeline.splice(0, 0, {
        time: timeline[0].time.clone().subtract("40", "m"),
        title: "Регистрация"
    },
    {
        time: timeline[0].time.clone().subtract("20", "m"),
        title: "Открытие"
    });

let countOfCoffeeBreaks = 2;
let coffeeBreakDuration = [15, "m"];
let lecturesBetweenCoffeeBreaks = 3;

for (let i = 1; i <= countOfCoffeeBreaks; i++) {
    let index = i * lecturesBetweenCoffeeBreaks + 2 + i - 1;
    timeline.splice(index, 0, {
        time: timeline[index].time.clone(),
        title: "Перерыв"
    });

    timeline.slice(index + 1).forEach(item => item.time.add(...coffeeBreakDuration))
}

timeline.push(
    {
        time: timeline[timeline.length - 1].time.clone().add(...lectureDuration),
        title: "Закрытие"
    }
);

export default class Schedule extends React.Component {
    render() {
        return (
            <section className={styles.container}>
                <h3 className={styles.title}>Расписание</h3>
                <Timeline items={timeline}/>
            </section>
        )
    }
}