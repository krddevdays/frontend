import * as React from 'react';
import './NavBar.css';
import NavLink from '../NavLink/NavLink';
import { Calendar } from 'react-feather';
import classNames from 'classnames';

export default function NavBar() {

    const [menuState, changeMenuState] = React.useState(false);

    function handleClickMenu(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        changeMenuState(!menuState);
    }

    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-md-0 shadow">
            <NavLink href="/" className="navbar-brand col-auto col-md-3 col-xl-2 mr-0" activeClassName="active">
                Krasnodar Dev Days
            </NavLink>
            <div className="col-auto">
                <button className="navbar-toggler d-block d-md-none" type="button" onClick={handleClickMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div
                className={classNames('collapse', 'navbar-collapse', 'col-xl-12', {
                    'show': menuState,
                })}
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
