import * as React from 'react';
import classNames from 'classnames';

import './Author.css';

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
            className={classNames('author', {
                author_small: props.small
            })}
        >
            <img className="author__avatar" alt={fullName} src={props.avatar || '/static/defaultAvatar.svg'} />
            <div className="author__details">
                <div className="author__name">{fullName}</div>
                <div className="author__position">
                    {props.position && `${props.position}, `}
                    {props.work}
                </div>
            </div>
        </div>
    );
}
