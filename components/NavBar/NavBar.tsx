import * as React from 'react';
import NavLink from '../NavLink/NavLink';
import MenuProvider from '../Menu';
import classNames from 'classnames';

import './NavBar.css';

export default function NavBar() {
    const [isMenuOpen, changeMenuOpen] = React.useState(false);
    const { menu } = React.useContext(MenuProvider);

    function handleClickMenu() {
        changeMenuOpen(!isMenuOpen);
    }

    return (
        <nav className="navbar navbar-dark fixed-top bg-dark p-md-0 shadow">
            <NavLink href="/" className="navbar-brand col col-md-3 col-xl-2 mr-0" activeClassName="active">
                Krasnodar Dev Days
            </NavLink>
            <div className="col-auto">
                <button
                    className="navbar-toggler d-md-none"
                    type="button"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobileMenu"
                    aria-label="Меню"
                    onClick={handleClickMenu}
                >
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
            <div
                className={classNames('collapse', 'navbar-collapse', 'd-md-none', 'col', {
                    show: isMenuOpen
                })}
                id="mobileMenu"
            >
                {menu.map(item => (
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                href={item.href}
                                onClick={handleClickMenu}
                                className="nav-link"
                                activeClassName="active"
                            >
                                {item.icon}
                                {item.title}
                            </NavLink>
                        </li>
                    </ul>
                ))}
            </div>
        </nav>
    );
}
