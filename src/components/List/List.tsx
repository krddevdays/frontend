import * as React from 'react';
import styles from './List.module.css';

type ListProps = {
    children: React.ReactNode;
};

export default function List(props: ListProps) {
    return <div className={styles.list}>{props.children}</div>;
}
