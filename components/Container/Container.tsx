import * as React from 'react';
import './Container.css';

type ContainerProps = {
    children: React.ReactNode;
};

export default function Container(props: ContainerProps) {
    return <div className="container">{props.children}</div>;
}
