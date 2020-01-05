import * as React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import classNames from 'classnames';

import Logo from '../Logo/Logo';
import Container from '../Container/Container';
import './Header.css';

function Header() {
    const [menuOpened, setMenuOpened] = React.useState(false);

    const handleToggleClick = React.useCallback(
        event => {
            event.preventDefault();
            setMenuOpened(opened => !opened);
        },
        [setMenuOpened]
    );

    const handleRouteChangeComplete = React.useCallback(() => {
        setMenuOpened(false);
    }, [setMenuOpened]);

    React.useEffect(() => {
        Router.events.on('routeChangeComplete', handleRouteChangeComplete);

        return () => Router.events.off('routeChangeComplete', handleRouteChangeComplete);
    }, [handleRouteChangeComplete]);

    return (
        <header className="header-background">
            <Container className="header">
                <nav
                    role="navigation"
                    className={classNames('header__nav', {
                        header__nav_opened: menuOpened
                    })}
                >
                    <ul className="header-menu">
                        <li className="header-menu__item">
                            <Link href="/events">
                                <a className="header-menu__link">Все мероприятия</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Link href="/">
                    <a className="header__logo" aria-label="Главная">
                        <Logo />
                    </a>
                </Link>
                <div
                    className={classNames('header__nav-toggler', {
                        'header__nav-toggler_opened': menuOpened
                    })}
                >
                    <button className="header-toggler" type="button" onClick={handleToggleClick}>
                        <svg
                            className="header-toggler__icon"
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="#262626"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 11C0 11.5523 0.447715 12 1 12H17C17.5523 12 18 11.5523 18 11C18 10.4477 17.5523 10 17 10H1C0.447716 10 0 10.4477 0 11ZM0 6C0 6.55228 0.447715 7 1 7H9C9.55228 7 10 6.55228 10 6C10 5.44772 9.55229 5 9 5H1C0.447715 5 0 5.44772 0 6ZM1 0C0.447716 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H17C17.5523 2 18 1.55228 18 1C18 0.447715 17.5523 0 17 0H1Z" />
                        </svg>
                    </button>
                </div>
                <div className="header__profile">
                    <Link href="/profile">
                        <a className="header-profile">
                            <span className="header-profile__icon" />
                            <span className="header-profile__text">Профиль</span>
                        </a>
                    </Link>
                </div>
            </Container>
        </header>
    );
}

export default Header;
