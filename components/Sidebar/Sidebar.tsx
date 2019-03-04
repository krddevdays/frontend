import * as React from 'react';
import './Sidebar.css';
import MenuProvider from '../Menu';
import NavLink from '../NavLink/NavLink';

export default function Sidebar() {
    const { menu } = React.useContext(MenuProvider);
    return (
        <nav className="col-md-3 col-xl-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                {menu.map(item => (
                    <ul key={item.href} className="nav flex-column">
                        <li className="nav-item">
                            <NavLink href={item.href} className="nav-link" activeClassName="active">
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
