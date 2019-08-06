import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import classNames from 'classnames';

import './TalkCard.css';
import Author, { AuthorProps } from '../Author/Author';

export type TalkCardProps = {
    description: string | null;
    speaker: AuthorProps;
    title: string;
    poster_image?: boolean;
};

export default function TalkCard(props: TalkCardProps) {
    return (
        <article
            className={classNames('talk-card', {
                'talk-card__modern': props.poster_image
            })}
        >
            <img
                className="talk-card__image"
                src="https://pp.userapi.com/c852220/v852220709/183874/hlqb9GsgClg.jpg"
                alt=""
            />
            <div className="talk-card__body">
                <h1 className="talk-card__title">{props.title}</h1>
                <div className="talk-card__description">
                    <Markdown options={{ forceBlock: true }}>{props.description}</Markdown>
                </div>
            </div>
            <div className="talk-card__footer">
                <Author {...props.speaker} />
            </div>
        </article>
    );
}
