import * as React from 'react';
import clsx from 'clsx';

import styles from './Container.module.css';

type ContainerProps = {
    children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

export default function Container(props: ContainerProps) {
    const { className, ...restProps } = props;
    return (
        <div className={clsx(styles.container, className)} {...restProps}>
            {props.children}
        </div>
    );
}
