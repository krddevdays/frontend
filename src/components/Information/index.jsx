import React from "react";
import Card from "./Card";
import styles from "./index.css";
import speakers, {startMoment} from "../../speakers";

export default class Information extends React.Component {
    render() {
        return (
            <section className={styles.container}>
                <div className={styles.cards}>
                    <Card className={styles.card}
                          title="100"
                          subtitle="мест"/>
                    <Card className={styles.card}
                          title={speakers.length}
                          subtitle="докладов"/>
                    <Card className={styles.card}
                          title={startMoment.format("D")}
                          subtitle={startMoment.format("D MMMM").split(" ")[1]}/>
                </div>
            </section>
        )
    }
}