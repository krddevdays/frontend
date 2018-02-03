import React from "react";
import speakers from "../../speakers.js";
import Card from "../Card";
import styles from "./index.css";

export default class Speakers extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            speakers
        }
    }

    render() {
        return (
            <section className={styles.container}>
                <h3 className={styles.title}>Спикеры</h3>
                <div className={styles.cards}>
                    {this.state.speakers.map((speaker, i) => <Card key={i}
                                                                   className={styles.card}
                                                                   {...speaker}/>)}
                </div>
            </section>
        )
    }
}