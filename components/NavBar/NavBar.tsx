import * as React from 'react';
import './NavBar.css';
import NavLink from '../NavLink/NavLink';

export default function NavBar() {
    return (
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <NavLink href="/" className="navbar-brand col col-sm-4 col-md-3 col-xl-2 mr-0" activeClassName="active">
                Krasnodar Dev Days
            </NavLink>
        </nav>
    );
}
