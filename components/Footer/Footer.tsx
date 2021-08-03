import * as React from 'react';
import Link from 'next/link';

import Logo from '../Logo/Logo';
import Container from '../Container/Container';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footerBackground}>
            <Container className={styles.footer}>
                <Link href="/">
                    <a className={styles.footer__logo} aria-label="Главная">
                        <Logo />
                    </a>
                </Link>
                <ul className={styles.footerMenu}>
                    <li className={styles.footerMenu__item}>
                        <a
                            href="https://vk.com/krddevdays"
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            className={styles.footerMenu__link}
                        >
                            vk
                        </a>
                    </li>
                    <li className={styles.footerMenu__item}>
                        <a
                            href="https://facebook.com/krddevdays"
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            className={styles.footerMenu__link}
                        >
                            fb
                        </a>
                    </li>
                    <li className={styles.footerMenu__item}>
                        <a
                            href="https://twitter.com/krddevdays"
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            className={styles.footerMenu__link}
                        >
                            twitter
                        </a>
                    </li>
                    <li className={styles.footerMenu__item}>
                        <a
                            href="https://instagram.com/krddevdays"
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            className={styles.footerMenu__link}
                        >
                            instagram
                        </a>
                    </li>
                    <li className={styles.footerMenu__item}>
                        <a
                            href="https://t.me/krddevdays"
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            className={styles.footerMenu__link}
                        >
                            telegram
                        </a>
                    </li>
                    <li className={styles.footerMenu__item}>
                        <a
                            href="https://www.youtube.com/c/krddevdays"
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            className={styles.footerMenu__link}
                        >
                            youtube
                        </a>
                    </li>
                    <li className={styles.footerMenu__item}>
                        <a
                            href="https://github.com/krddevdays"
                            target="_blank"
                            rel="noreferrer noopener nofollow"
                            className={styles.footerMenu__link}
                        >
                            github
                        </a>
                    </li>
                </ul>
            </Container>
        </footer>
    );
}
