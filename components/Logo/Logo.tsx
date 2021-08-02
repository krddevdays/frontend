import * as React from 'react';
import styles from './Logo.module.css';

export default function Logo() {
    return (
        <span className={styles.logo}>
            <img
                src="/static/Logo.svg"
                title="Krasnodar Dev Days"
                alt="Krasnodar Dev Days"
                className={styles.logo__image}
            />
            <span className={styles.logo__text}>IT-сообщество</span>
        </span>
    );
}
