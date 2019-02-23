import * as React from 'react';
import { Calendar } from 'react-feather';
import './Sidebar.css';
import NavLink from '../NavLink/NavLink';

export default function Sidebar() {
    return (
        <nav className="col-md-3 col-xl-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
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
