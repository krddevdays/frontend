import * as React from 'react';
import './NavBar.css';
import NavLink from '../NavLink/NavLink';
import { Calendar } from 'react-feather';

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark flex-md-nowrap p-md-0 shadow">
            <NavLink href="/" className="navbar-brand col col-auto col-sm-4 col-md-3 col-xl-2 mr-0" activeClassName="active">
                Krasnodar Dev Days
            </NavLink>
            <div className="col-auto">
                <button className="navbar-toggler d-block d-md-none" id="navbarToggler" type="button" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse col-xl-12" id="navbarMenu">
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

    function toggleMenu() {
        let navbarMenu = document.getElementById('navbarMenu');
        if(navbarMenu !== null) { navbarMenu.classList.toggle('show') }
    }
}
