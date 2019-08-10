import * as React from 'react';
import classNames from 'classnames';

import './Container.css';

type ContainerProps = {
    children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

export default function Container(props: ContainerProps) {
    const { className, ...restProps } = props;
    return (
        <div className={classNames('container', className)} {...restProps}>
            {props.children}
        </div>
    );
}
