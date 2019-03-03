import * as React from 'react';
import { Calendar } from 'react-feather';

const MenuProvider = React.createContext({
    menu: [
        {
            title: 'События',
            icon: <Calendar className="feather" />,
            href: '/events'
        }
    ]
});

export default MenuProvider;
