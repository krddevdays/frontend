import * as React from 'react';
import Link from 'next/link';

import Logo from '../Logo/Logo';
import Container from '../Container/Container';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-background">
            <Container className="footer">
                <Link href="/">
                    <a className="footer__logo" aria-label="Главная">
                        <Logo />
                    </a>
                </Link>
                <ul className="footer-menu">
                    <li className="footer-menu__item">
                        <a
                            href="https://vk.com/krddevdays"
                            target="_blank"
                            rel="noopener nofollow"
                            className="footer-menu__link"
                        >
                            vk
                        </a>
                    </li>
                    <li className="footer-menu__item">
                        <a
                            href="https://facebook.com/krddevdays"
                            target="_blank"
                            rel="noopener nofollow"
                            className="footer-menu__link"
                        >
                            fb
                        </a>
                    </li>
                    <li className="footer-menu__item">
                        <a
                            href="https://twitter.com/krddevdays"
                            target="_blank"
                            rel="noopener nofollow"
                            className="footer-menu__link"
                        >
                            twitter
                        </a>
                    </li>
                    <li className="footer-menu__item">
                        <a
                            href="https://instagram.com/krddevdays"
                            target="_blank"
                            rel="noopener nofollow"
                            className="footer-menu__link"
                        >
                            instagram
                        </a>
                    </li>
                    <li className="footer-menu__item">
                        <a
                            href="https://t.me/krddevdays"
                            target="_blank"
                            rel="noopener nofollow"
                            className="footer-menu__link"
                        >
                            telegram
                        </a>
                    </li>
                </ul>
            </Container>
        </footer>
    );
}
