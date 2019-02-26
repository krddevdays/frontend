import * as React from 'react';
import './NavBar.css';
import NavLink from '../NavLink/NavLink';
import { Calendar } from 'react-feather';
import classNames from 'classnames';

export default function NavBar() {
    const [isMenuOpen, changeMenuOpen] = React.useState(false);

    function handleClickMenu(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
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
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink href="/events" className="nav-link" activeClassName="active">
                            <Calendar className="feather" />
                            События
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
