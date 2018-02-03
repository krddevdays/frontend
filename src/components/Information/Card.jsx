import React from "react";

import styles from "./card.css";

export default class Card extends React.Component {
    render() {
        return (
            <div className={`${styles.container}${this.props.className ? " " + this.props.className : ""}`}>
                <div className={styles.title}>{this.props.title}</div>
                <div className={styles.subtitle}>{this.props.subtitle}</div>
            </div>
        )
    }
}