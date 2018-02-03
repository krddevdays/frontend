import React from "react";
import moment from "moment";
import styles from "./timeline.css";

export default class Timeline extends React.Component {
    render() {
        return (
            <div className={styles.timeline}>
                {this.props.items.map((item, i) =>
                    <div className={styles.item} key={i}>
                        {item.time ? <div className={styles.itemTime} title={moment(item.time).format("LLLL (Z)")}>{moment(item.time).format("HH:mm")}</div> : null}
                        <div className={styles.itemTitle} dangerouslySetInnerHTML={{__html: item.title}}></div>
                        {item.subtitle ? <div className={styles.itemSubtitle} dangerouslySetInnerHTML={{__html: item.subtitle}}></div> : null}
                    </div>
                )}
            </div>
        )
    }
}