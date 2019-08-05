import * as React from 'react';
import './index.css';

type ListProps = {
    children: React.ReactNode;
};

export default function List(props: ListProps) {
    return <div className="list">{props.children}</div>;
}
