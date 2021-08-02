import * as React from 'react';
import styles from './index.module.css';

export default function FormGroup(props: { children: React.ReactNode }) {
    return <div className={styles.formGroup}>{props.children}</div>;
}
