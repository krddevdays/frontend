import * as React from 'react';
import './Logo.css';

export default function Logo() {
    return (
        <span className="logo">
            <img src="/static/Logo.svg" title="Krasnodar Dev Days" alt="Krasnodar Dev Days" className="logo__image" />
            <span className="logo__text">IT-сообщество</span>
        </span>
    );
}
