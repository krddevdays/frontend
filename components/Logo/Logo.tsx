import * as React from 'react';
import styles from './Logo.module.css';
import logoSvg from './Logo.svg';
import Image from 'next/image';

export default function Logo() {
    return (
        <span className={styles.logo}>
            <Image src={logoSvg} title='Krasnodar Dev Days' alt='Krasnodar Dev Days' className={styles.logo__image} />
            <span className={styles.logo__text}>IT-сообщество</span>
        </span>
    );
}
