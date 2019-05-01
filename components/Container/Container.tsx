import * as React from 'react';
import classNames from 'classnames';

import './Container.css';

type ContainerProps = {
    children: React.ReactNode;
    className?: string;
};

export default function Container(props: ContainerProps) {
    return <div className={classNames('container', props.className)}>{props.children}</div>;
}
