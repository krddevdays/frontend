import React from "react";
import classNames from "classnames";
import footerStyles from "../Footer/index.css";
import styles from "./index.css";
import {startMoment} from "../../speakers";

export default class Header extends React.Component {
    render() {
        return (
            <header className={styles.container}>
                <h1 className={styles.title}>
                    <img className={styles.logo}
                         src={require("./logo.png")}
                         srcSet={`${require("./logo@2x.png")} 2x, ${require("./logo@3x.png")} 3x`}
                         alt="Krasnodar Dev Days"
                         title="Krasnodar Dev Days"/>
                </h1>
                <div className={styles.subtitle}>
                    Конференция разработчиков<br />
                    <span className={styles.highlight} title={startMoment.format("LLLL (Z)")}>{startMoment.format("D MMMM")}</span>, Красноармейская 55/1
                </div>
                <ol className={styles.typeList}>
                    <li className={styles.typeListItem}>Front-end</li>
                    <li className={styles.typeListItem}>Back-end</li>
                    <li className={styles.typeListItem}>Mobile</li>
                </ol>
                <a href="https://krddevdays.timepad.ru/event/392666/"
                   className={classNames(styles.button, footerStyles.button, footerStyles.buttonGreen)}>
                    Стать участником
                </a>
                <div className={styles.social}>
                    <a className={styles.socialLink}
                       href="https://www.facebook.com/krddevdays/"
                       target="_blank">
                        <img src={require("./fb.png")}
                             srcSet={`${require("./fb@2x.png")} 2x, ${require("./fb@3x.png")} 3x`}
                             title="Facebook"
                             height="28px"
                             width="15px"/>
                    </a>

                    <a className={styles.socialLink}
                       href="https://vk.com/krddevdays"
                       target="_blank">
                        <img src={require("./vk.png")}
                             srcSet={`${require("./vk@2x.png")} 2x, ${require("./vk@3x.png")} 3x`}
                             title="VK"
                             height="18px"
                             width="32px"/>
                    </a>
                </div>
            </header>
        )
    }
}