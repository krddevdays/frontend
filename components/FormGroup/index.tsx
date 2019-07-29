import * as React from 'react';
import './index.css';

export default function FormGroup(props: { children: React.ReactNode }) {
    return <div className="form-group">{props.children}</div>;
}
