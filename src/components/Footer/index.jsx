import React from "react";
import styles from "./index.css";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className={styles.container}>
                <a href="https://krddevdays.timepad.ru/event/392666/"
                   className={[styles.button, styles.buttonGreen].join(" ")}>Стать участником</a>
                <div className={styles.copyright}>© 2016 Krasnodar Dev Days</div>
                <div className={styles.designBy}>
                    Designed by <a href="http://belashov.tk" target="_blank">Roman Belashov</a>
                </div>
            </footer>
        )
    }
}