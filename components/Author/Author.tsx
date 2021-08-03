import * as React from 'react';
import classNames from 'classnames';
import avatarSvg from './DefaultAvatar.svg';

import styles from './Author.module.css';

export type AuthorProps = {
    small?: boolean;
    first_name: string;
    last_name: string;
    avatar: string | null;
    work: string | null;
    position: string | null;
};

export default function Author(props: AuthorProps) {
    const fullName = [props.first_name, props.last_name].join(' ');

    return (
        <div
            className={classNames(styles.author, {
                [styles.author_small]: props.small
            })}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.author__avatar} alt={fullName} src={props.avatar || avatarSvg.src} />
            <div className={styles.author__details}>
                <div className={styles.author__name}>{fullName}</div>
                <div className={styles.author__position}>
                    {props.position && `${props.position}, `}
                    {props.work}
                </div>
            </div>
        </div>
    );
}
