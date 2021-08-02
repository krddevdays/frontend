import * as React from 'react';
import classNames from 'classnames';

import styles from './Container.module.css';

type ContainerProps = {
    children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

export default function Container(props: ContainerProps) {
    const { className, ...restProps } = props;
    return (
        <div className={classNames(styles.container, className)} {...restProps}>
            {props.children}
        </div>
    );
}
